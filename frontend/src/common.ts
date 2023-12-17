import { NextRequest, NextResponse } from "next/server";

/**
 * @param {NextRequest} request
 * @param {string} pathname
 * @returns {NextResponse}
 */
export function redirect(pathname) {
  const url = new URL(pathname, process.env.NEXT_PUBLIC_FRONTEND_URL);

  return NextResponse.redirect(url);
}
