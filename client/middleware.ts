import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard"];        
const AUTH_PAGES = ["/login", "/signup"];
const COOKIE_NAME = "accessToken";    

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get(COOKIE_NAME)?.value;

  console.log(url.pathname, token)

  const isProtected = PROTECTED.some((p) => url.pathname.startsWith(p));
  const isAuthPage = AUTH_PAGES.includes(url.pathname);

  if (isProtected && !token) {
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname); 
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};
