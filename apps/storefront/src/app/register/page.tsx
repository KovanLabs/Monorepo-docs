"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@repo/ui/auth-form";
import { AuthLayout } from "@repo/ui/auth-layout";
import { Alert, Snackbar, type AlertColor } from "@mui/material";

const API = process.env.NEXT_PUBLIC_API_URL || "https://turborepo-api-six.vercel.app";

function setTokenCookie(token: string): void {
  document.cookie = `auth_token=${token}; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

export default function RegisterPage() {
  const router = useRouter();
  const redirectTimer = useRef<number | null>(null);
  const [toast, setToast] = useState<{ message: string; severity: AlertColor; open: boolean }>({
    message: "",
    severity: "success",
    open: false,
  });

  useEffect(() => {
    return () => {
      if (redirectTimer.current) {
        window.clearTimeout(redirectTimer.current);
      }
    };
  }, []);

  const handleRegister = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Registration failed");
      }

      const { token } = await res.json();
      localStorage.setItem("auth_token", token);
      setTokenCookie(token);
      setToast({ message: "Account created successfully", severity: "success", open: true });
      redirectTimer.current = window.setTimeout(() => {
        router.push("/");
      }, 1200);
    } catch (error) {
      setToast({
        message: error instanceof Error ? error.message : "Registration failed",
        severity: "error",
        open: true,
      });
    }
  };

  return (
    <>
      <AuthLayout>
        <AuthForm mode="register" onSubmit={handleRegister} />
      </AuthLayout>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((current) => ({ ...current, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToast((current) => ({ ...current, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
