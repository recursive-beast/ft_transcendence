import { NextRequest, NextResponse } from "next/server";

/**
 * @param {NextRequest} request
 * @param {string} pathname
 * @returns {NextResponse}
 */
export function redirect(request, pathname) {
  const url = new URL(pathname, request.nextUrl.origin);

  return NextResponse.redirect(url);
}
