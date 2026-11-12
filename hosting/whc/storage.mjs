import { DatabaseSync } from "node:sqlite";
import { mkdirSync, chmodSync, existsSync } from "node:fs";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { isAbsolute, join, dirname } from "node:path";

// Small compatibility adapter for the D1 prepared-statement operations used by
// Drizzle and quote intake. SQLite retains the same schema and atomic SQL rules.
export function sqliteBinding(database) {
  function prepare(sql, values = []) {
    // node:sqlite uses positional parameters; D1 SQL also uses numbered ?N.
    // Repeated numbered placeholders must repeat the corresponding bound value.
    const numbered = /\?(\d+)/.test(sql);
    const indexes = [];
    const query = sql.replace(/\?(\d+)/g, (_, n) => { indexes.push(Number(n) - 1); return "?"; });
    const args = () => numbered ? indexes.map(i => values[i]) : values;
    return {
      bind(...params) { return prepare(sql, params); },
      async first(column) {
        const row = database.prepare(query).get(...args());
        return row ? (column ? row[column] : row) : null;
      },
      async all() { return { success: true, results: database.prepare(query).all(...args()) }; },
      async raw() {
        const statement = database.prepare(query);
        statement.setReturnArrays(true);
        return statement.all(...args());
      },
      async run() {
        const result = database.prepare(query).run(...args());
        return { success: true, results: [], meta: { changes: Number(result.changes), last_row_id: Number(result.lastInsertRowid) } };
      },
    };
  }
  return { prepare };
}

export function privateBucket(root) {
  const filePath = key => {
    if (!/^quarantine\/quotes\/[0-9a-f-]{36}\/artwork\.(pdf|png|jpg)$/.test(key)) throw new Error("Invalid artwork key");
    return join(root, key);
  };
  return {
    async put(key, bytes) {
      const path = filePath(key);
      await mkdir(dirname(path), { recursive: true, mode: 0o700 });
      await writeFile(path, bytes, { mode: 0o600, flag: "wx" });
    },
    async delete(key) { await unlink(filePath(key)).catch(error => { if (error.code !== "ENOENT") throw error; }); },
  };
}

let bindings;
function getBindings() {
  if (bindings) return bindings;
  const directory = process.env.PROMOMERCH_DATA_DIR;
  if (!directory || !isAbsolute(directory)) throw new Error("PROMOMERCH_DATA_DIR must be an absolute private directory");
  const path = join(directory, "quotes.sqlite");
  // Schema setup is an explicit deployment step, never a request side effect.
  if (!existsSync(path)) throw new Error("Quote database must be initialized before startup");
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  chmodSync(directory, 0o700);
  chmodSync(path, 0o600);
  const database = new DatabaseSync(path);
  database.exec("PRAGMA busy_timeout = 5000; PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;");
  bindings = { DB: sqliteBinding(database), BUCKET: privateBucket(directory) };
  return bindings;
}

export const env = {
  get DB() { return getBindings().DB; },
  get BUCKET() { return getBindings().BUCKET; },
  get FORMSPREE_ENDPOINT() { return process.env.FORMSPREE_ENDPOINT; },
};
