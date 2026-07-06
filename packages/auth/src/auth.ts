import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface JwtPayload {
  sub: string;
  role: string;
  [key: string]: unknown;
}

const getSecret = (): string => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  return secret;
};

const SALT_ROUNDS = 10;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, getSecret()) as JwtPayload;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
