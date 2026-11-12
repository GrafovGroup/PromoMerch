// Passenger loads a CommonJS startup file; the application remains ESM.
// LiteSpeed's Unix socket must retain its normal web-server permissions.
// Data/file permissions are set explicitly by the storage adapter instead.
require("node:module").syncBuiltinESMExports();
process.env.NODE_ENV = "production";
process.env.VINEXT_TRUST_PROXY = "1";
(async () => {
  const { join } = require("node:path");
  const { startProdServer } = await import("vinext/server/prod-server");
  const { wrapIngress } = await import("./ingress.mjs");
  const { server } = await startProdServer({
    port: Number(process.env.PORT || 3000), host: "127.0.0.1", outDir: join(__dirname, "dist"),
  });
  // LiteSpeed prepends its own request/connection setup listener.
  // Preserve that listener and wrap only Vinext's application handler.
  const handler = server.listeners("request").at(-1);
  server.removeListener("request", handler);
  server.on("request", wrapIngress(handler, process.env.PROMOMERCH_ORIGIN || "https://promomerch.ca", Boolean(global.LsNode)));
  server.requestTimeout = 35000;
  server.headersTimeout = 15000;
})().catch(error => { console.error("PromoMerch startup failed", error); process.exit(1); });
