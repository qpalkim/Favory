import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProfilePage = pathname.startsWith("/profile");

  if (!isProfilePage) return NextResponse.next();

  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("reason", "auth");
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
