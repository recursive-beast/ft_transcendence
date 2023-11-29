import { NextRequest, NextResponse } from "next/server";
import { redirect } from "./common";

/** @param {NextRequest} request  */
export async function middleware(request) {
  const cookie = request.cookies.get("authorization");

  if (!cookie) return redirect(request, "/");

  const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
    headers: {
      authorization: `bearer ${cookie.value}`,
    },
  });

  if (!res.ok) return redirect(request, "/");

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/chat/:path*", "/game/:path*"],
};
