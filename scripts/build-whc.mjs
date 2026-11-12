import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync } from "node:fs";
const result = spawnSync(process.execPath, ["scripts/run-framework.mjs", "build"], {
  stdio: "inherit", env: { ...process.env, PROMOMERCH_HOSTING: "whc" },
});
if (result.status !== 0) process.exit(result.status ?? 1);
mkdirSync("dist/standalone/operations", { recursive: true });
for (const file of ["app.cjs", "ingress.mjs"]) copyFileSync("hosting/whc/" + file, "dist/standalone/" + file);
copyFileSync("hosting/whc/init-db.mjs", "dist/standalone/operations/init-db.mjs");
copyFileSync("hosting/whc/web.htaccess", "dist/standalone/operations/web.htaccess");
copyFileSync("drizzle/0000_tired_weapon_omega.sql", "dist/standalone/operations/0000_tired_weapon_omega.sql");
