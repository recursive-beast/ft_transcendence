import { redirect } from "@/common";
import ms from "ms";
import { NextRequest } from "next/server";

export function tokenFetcher(tokenUrl) {
  return async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.toString();

    try {
      const data = await fetch(`${tokenUrl}?${query}`).then((res) =>
        res.json(),
      );
      const otp = data.otp;

      if (!otp) return redirect("/");

      const isOTP = otp.enabled && !otp.verified;
      const res = redirect(isOTP ? "/auth/otp" : "/home");

      res.cookies.set("authorization", data.token, {
        httpOnly: true,
        maxAge: ms("999years"),
      });

      return res;
    } catch (error) {
      return redirect("/");
    }
  };
}
