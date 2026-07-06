import { decodeToken } from "./auth";

type NextRequestLike = {
  cookies: { get: (name: string) => { value: string } | undefined };
  headers: { get: (name: string) => string | null };
  nextUrl: { pathname: string };
  url: string;
};

type NextResponseLike = {
  cookies: {
    set: (name: string, value: string, opts: Record<string, unknown>) => void;
  };
};

export function getTokenFromRequest(request: NextRequestLike): string | null {
  const cookie = request.cookies.get("auth_token")?.value;
  if (cookie) return cookie;

  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return header.slice(7);
  }

  return null;
}

export function getUserFromRequest(request: NextRequestLike) {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return decodeToken(token);
}

export function requireAuth(
  request: NextRequestLike,
  redirectTo?: string
): Response | null {
  const user = getUserFromRequest(request);
  if (user) return null;

  if (redirectTo) {
    const url = new URL(redirectTo, request.url);
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return Response.redirect(url);
  }

  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function setAuthCookie(
  response: NextResponseLike,
  token: string
): void {
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponseLike): void {
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}
