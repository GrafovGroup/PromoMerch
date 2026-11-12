import { isIP } from "node:net";

export function wrapIngress(handler, origin, whcIngress = false) {
  const canonical = new URL(origin);
  return function (request, response) {
    const host = request.headers.host?.toLowerCase();
    const allowed = new Set([canonical.host, "www." + canonical.host]);
    if (!allowed.has(host)) { response.writeHead(421); response.end("Unknown host"); return; }
    if (host !== canonical.host) {
      response.writeHead(308, { Location: canonical.origin + (request.url?.startsWith("/") ? request.url : "/") });
      response.end(); return;
    }
    // WHC's lsnode reports loopback on every socket. Our domain .htaccess
    // overwrites this private header from REMOTE_ADDR (verified with spoof tests).
    // Local standalone runs use the real socket instead.
    // LiteSpeed appends its value even for RequestHeader set. The final value
    // is the server-derived address; earlier comma-separated values are untrusted.
    const forwarded = request.headers["x-promomerch-client-ip"];
    const address = whcIngress
      ? (typeof forwarded === "string" ? forwarded.split(",").at(-1)?.trim() : undefined)
      : request.socket.remoteAddress;
    delete request.headers["x-promomerch-client-ip"];
    delete request.headers["cf-connecting-ip"];
    if (typeof address === "string" && isIP(address)) request.headers["cf-connecting-ip"] = address;
    delete request.headers["forwarded"];
    delete request.headers["x-forwarded-for"];
    delete request.headers["x-real-ip"];
    delete request.headers["x-forwarded-host"];
    request.headers["x-forwarded-proto"] = canonical.protocol.slice(0, -1);
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    handler(request, response);
  };
}
