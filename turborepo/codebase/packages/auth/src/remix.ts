import { redirect } from "@remix-run/node";
import { decodeToken, signToken, type JwtPayload } from "./auth";

const STORAGE_KEY = "auth_session";

function getCookieString(cookies: string | null, name: string): string | null {
  if (!cookies) return null;
  for (const c of cookies.split(";")) {
    const [key, ...rest] = c.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

function encodeSession(token: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET environment variable is not set");
  const payload = JSON.stringify({
    token,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });
  return Buffer.from(payload).toString("base64");
}

function decodeSession(value: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(value, "base64").toString());
    if (payload.exp < Date.now()) return null;
    return payload.token;
  } catch {
    return null;
  }
}

export function createSessionCookie(payload: JwtPayload): string {
  const token = signToken(payload);
  const encoded = encodeSession(token);

  return `${STORAGE_KEY}=${encoded}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

export function getUserFromSession(request: Request): JwtPayload | null {
  const cookie = request.headers.get("Cookie");
  const val = getCookieString(cookie, STORAGE_KEY);
  if (!val) return null;
  const token = decodeSession(val);
  if (!token) return null;
  return decodeToken(token);
}

export function createUserSession(
  payload: JwtPayload,
  redirectTo: string
): Response {
  const cookie = createSessionCookie(payload);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": cookie },
  });
}

export function destroySession(): Response {
  const cookie = `${STORAGE_KEY}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  return redirect("/login", {
    headers: { "Set-Cookie": cookie },
  });
}

export function requireAuth(
  request: Request,
  redirectTo?: string
): JwtPayload {
  const user = getUserFromSession(request);
  if (user) return user;

  const url = redirectTo ?? "/login";
  throw redirect(url);
}
