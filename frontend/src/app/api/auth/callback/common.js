import ms from "ms";
import { NextRequest, NextResponse } from "next/server";

export function tokenFetcher(tokenUrl) {
  /** @param {NextRequest} request  */
  return async function GET(request) {
    const query = request.nextUrl.searchParams.toString();
    const res = await fetch(`${tokenUrl}?${query}`);
    const data = await res.json();

    const pathname = data.otp.enabled && !data.otp.verified ? "/auth/otp" : "/profile";
    const redirect = NextResponse.redirect(
      `${request.nextUrl.origin}${pathname}`,
    );

    redirect.cookies.set("authorization", data.token, {
      httpOnly: true,
      maxAge: ms("999years"),
    });

    return redirect;
  };
}
