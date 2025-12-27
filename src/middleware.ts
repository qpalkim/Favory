import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "");

  const isFavoryDetailRoute =
    pathname.startsWith("/favories/") && pathname !== "/favories";

  if (!isFavoryDetailRoute) return NextResponse.next();

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const isLoggedIn = Boolean(accessToken || refreshToken);

  if (!isLoggedIn) {
    const url = new URL("/login", request.url);
    url.searchParams.set("reason", "auth");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/favories/:path*"],
};
