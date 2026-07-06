"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface AuthUser {
  sub: string;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function decodeJwt(token: string): AuthUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch {
    return null;
  }
}

function setTokenCookie(token: string | null): void {
  if (token) {
    document.cookie = `${TOKEN_KEY}=${token}; Path=/; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
  } else {
    document.cookie = `${TOKEN_KEY}=; Path=/; SameSite=Lax; Max-Age=0`;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const decoded = decodeJwt(token);
      if (decoded) {
        setUser(decoded);
        setTokenCookie(token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
        setTokenCookie(null);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setTokenCookie(token);
    const decoded = decodeJwt(token);
    setUser(decoded);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenCookie(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
