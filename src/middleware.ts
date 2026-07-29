import { NextRequest, NextResponse } from "next/server";

/**
 * Africa's Talking sandbox sometimes posts to the domain root even when a
 * full callback path is configured. Rewrite those USSD callbacks.
 */
export function middleware(request: NextRequest) {
  if (request.method === "POST" && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/integrations/africastalking/ussd";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
