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

/**
 *
 * @param {RequestInfo} resource
 * @param {RequestInit} [init]
 */
export async function fetcher(resource, init) {
  const url = new URL(resource, process.env.NEXT_PUBLIC_BACKEND_URL);
  const res = await fetch(url, {
    mode: "cors",
    credentials: "include",
    ...init,
  });
  const data = await res.json();

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.data = data;
    error.status = res.status;
    throw error;
  }

  return data;
}
