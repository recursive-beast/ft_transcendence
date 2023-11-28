import { NextRequest, NextResponse } from "next/server";

/** @param {NextRequest} request  */
function redirect(request, pathname) {
  const url = request.nextUrl.clone();

  url.pathname = pathname;
  return NextResponse.redirect(url);
}

/** @param {NextRequest} request  */
export async function middleware(request) {
  const cookie = request.cookies.get("authorization");

  if (!cookie) return redirect(request, "/auth/login");

  const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    headers: {
      authorization: `bearer ${cookie.value}`,
    },
  });

  if (!res.ok) return redirect(request, "/auth/login");

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/chat/:path*", "/game/:path*"],
};
