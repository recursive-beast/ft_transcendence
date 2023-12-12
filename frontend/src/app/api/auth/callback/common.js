import { redirect } from "@/common";
import ms from "ms";
import { NextRequest } from "next/server";

export function tokenFetcher(tokenUrl) {
  /** @param {NextRequest} request  */
  return async function GET(request) {
    const query = request.nextUrl.searchParams.toString();
    const data = await fetch(`${tokenUrl}?${query}`).then((res) => res.json());
    const isOTP = data.otp.enabled && !data.otp.verified;
    const res = redirect(isOTP ? "/auth/otp" : "/home");

    res.cookies.set("authorization", data.token, {
      httpOnly: true,
      maxAge: ms("999years"),
    });

    return res;
  };
}
