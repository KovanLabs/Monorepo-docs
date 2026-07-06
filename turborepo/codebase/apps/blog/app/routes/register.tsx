import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData, Link, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { getUserFromSession, createSessionCookie } from "@repo/auth/remix";

const API = process.env.API_URL || "https://turborepo-api-six.vercel.app";

export function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromSession(request);
  if (user) {
    throw new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const email = body.get("email") as string;
  const username = body.get("username") as string;
  const password = body.get("password") as string;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    return json({ error: err.error || "Registration failed" }, { status: 400 });
  }

  const { user } = await res.json();
  return json(
    {
      success: "Account created successfully",
      redirectTo: "/",
    },
    {
      headers: {
        "Set-Cookie": createSessionCookie({ sub: user.id, email: user.email, role: user.role }),
      },
    }
  );
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const errorMessage = actionData && "error" in actionData ? actionData.error : null;
  const [toast, setToast] = useState<{ message: string; severity: AlertColor; open: boolean }>({
    message: "",
    severity: "success",
    open: false,
  });

  useEffect(() => {
    if (!actionData) return;

    if ("error" in actionData && actionData.error) {
      setToast({ message: actionData.error, severity: "error", open: true });
      return;
    }

    if ("success" in actionData && actionData.success) {
      setToast({ message: actionData.success, severity: "success", open: true });
      const timer = window.setTimeout(() => {
        navigate(actionData.redirectTo || "/");
      }, 1200);

      return () => window.clearTimeout(timer);
    }
  }, [actionData, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: 16,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: 420,
        }}
      >
        <Form method="post" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ margin: 0, textAlign: "center" }}>Create Account</h2>

          <div>
            <label htmlFor="email" style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label htmlFor="username" style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 6,
                border: "1px solid #ccc",
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          {errorMessage && <p style={{ color: "red", margin: 0, fontSize: 14 }}>{errorMessage}</p>}

          <button
            type="submit"
            style={{
              padding: "12px 24px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Create Account
          </button>

          <p style={{ textAlign: "center", margin: 0, fontSize: 14 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#3b82f6" }}>Sign in</Link>
          </p>
        </Form>
      </div>

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
    </div>
  );
}
