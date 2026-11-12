import { DatabaseSync } from "node:sqlite";
import { mkdirSync, chmodSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
const root = process.env.PROMOMERCH_DATA_DIR;
if (!root || !isAbsolute(root)) throw new Error("Set an absolute PROMOMERCH_DATA_DIR outside the public web root");
process.umask(0o077);
mkdirSync(root, { recursive: true, mode: 0o700 });
chmodSync(root, 0o700);
const file = join(root, "quotes.sqlite");
const db = new DatabaseSync(file);
db.exec("PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON;");
db.exec("CREATE TABLE IF NOT EXISTS _promomerch_migrations (name TEXT PRIMARY KEY NOT NULL, applied_at TEXT NOT NULL)");
const migration = "0000_tired_weapon_omega.sql";
if (!db.prepare("SELECT name FROM _promomerch_migrations WHERE name = ?").get(migration)) {
  db.exec("BEGIN IMMEDIATE");
  try {
    db.exec(readFileSync(new URL("./" + migration, import.meta.url), "utf8"));
    db.prepare("INSERT INTO _promomerch_migrations VALUES (?, ?)").run(migration, new Date().toISOString());
    db.exec("COMMIT");
  } catch (error) { db.exec("ROLLBACK"); throw error; }
}
db.close();
chmodSync(file, 0o600);
console.log("PromoMerch quote schema ready");
