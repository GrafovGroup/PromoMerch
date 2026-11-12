import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, mkdtempSync, statSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sqliteBinding, privateBucket } from "../hosting/whc/storage.mjs";
import { wrapIngress } from "../hosting/whc/ingress.mjs";

test("WHC SQLite preserves atomic counters, numbered bindings and Drizzle row order", async () => {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(readFileSync(new URL("../drizzle/0000_tired_weapon_omega.sql", import.meta.url), "utf8"));
  const db = sqliteBinding(sqlite);
  const query = "INSERT INTO quote_rate_limits VALUES (?1, ?2, 1) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count";
  const results = await Promise.all(Array.from({length: 20}, () => db.prepare(query).bind("source", 100).first()));
  assert.deepEqual(results.map(x=>x.count), Array.from({length:20}, (_,i)=>i+1));
  assert.equal((await db.prepare("SELECT ?2 AS a, ?1 AS b, ?2 AS c").bind("first", "second").first()).c, "second");
  assert.deepEqual(await db.prepare("SELECT key, count FROM quote_rate_limits WHERE key=?").bind("source").raw(), [["source",20]]);
  assert.equal((await db.prepare("DELETE FROM quote_rate_limits WHERE key=?1").bind("source").run()).meta.changes, 1);
  sqlite.close();
});

test("WHC artwork is private, exclusive and rejects path traversal", async () => {
  const root=mkdtempSync(join(tmpdir(), "promomerch-bucket-"));
  try {
    const bucket=privateBucket(root);
    const key="quarantine/quotes/00000000-0000-4000-8000-000000000000/artwork.png";
    await bucket.put(key, new Uint8Array([1,2,3]));
    assert.equal(statSync(join(root,key)).mode & 0o777, 0o600);
    assert.equal(statSync(join(root,"quarantine")).mode & 0o777, 0o700);
    await assert.rejects(()=>bucket.put(key,new Uint8Array([4])));
    await assert.rejects(()=>bucket.put("../../public_html/file.png",new Uint8Array([1])));
    await bucket.delete(key);
    assert.equal(existsSync(join(root,key)),false);
  } finally { rmSync(root,{recursive:true,force:true}); }
});

test("WHC ingress replaces spoofed client identity and enforces canonical host", () => {
  let passed;
  const route=wrapIngress(req=>{passed=req;}, "https://promomerch.ca");
  const response={setHeader(){},writeHead(status,headers){this.status=status;this.headers=headers;},end(){}};
  route({headers:{host:"promomerch.ca","cf-connecting-ip":"spoofed","x-forwarded-for":"spoofed","x-forwarded-proto":"http","x-forwarded-host":"evil.invalid"},socket:{remoteAddress:"203.0.113.2"}},response);
  assert.equal(passed.headers["cf-connecting-ip"],"203.0.113.2");
  assert.equal(passed.headers["x-forwarded-for"],undefined);
  assert.equal(passed.headers["x-forwarded-host"],undefined);
  assert.equal(passed.headers["x-forwarded-proto"],"https");
  route({headers:{host:"evil.invalid"},socket:{}},response);
  assert.equal(response.status,421);
  route({headers:{host:"www.promomerch.ca"},url:"//evil.invalid/path",socket:{}},response);
  assert.equal(response.headers.Location,"https://promomerch.ca//evil.invalid/path");
  const whc=wrapIngress(req=>{passed=req;}, "https://promomerch.ca", true);
  whc({headers:{host:"promomerch.ca","x-promomerch-client-ip":"198.51.100.77, 203.0.113.3","cf-connecting-ip":"spoofed"},socket:{remoteAddress:"127.0.0.1"}},response);
  assert.equal(passed.headers["cf-connecting-ip"],"203.0.113.3");
  assert.equal(passed.headers["x-promomerch-client-ip"],undefined);
  whc({headers:{host:"promomerch.ca"},socket:{remoteAddress:"127.0.0.1"}},response);
  assert.equal(passed.headers["cf-connecting-ip"],undefined);
});
