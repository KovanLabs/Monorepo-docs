import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export function middleware(_request: NextRequest) {
  return;
}

export const config = {
  matcher: [],
};
