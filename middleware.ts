import { NextRequest, NextResponse } from "next/server";
export function middleware(request:NextRequest) {
  const headers=new Headers(request.headers);
  headers.set("x-promomerch-locale",request.nextUrl.pathname.startsWith("/fr") ? "fr" : "en");
  const response=NextResponse.next({request:{headers}});
  response.headers.set("X-Content-Type-Options","nosniff");
  response.headers.set("Referrer-Policy","strict-origin-when-cross-origin");
  return response;
}
export const config = {matcher:["/((?!_next|api|images|brand|favicon|icon-|apple-touch).*)"]};

