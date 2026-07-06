import { useState, useEffect } from "react";
import { AuthForm } from "@repo/ui/auth-form";
import { AuthLayout } from "@repo/ui/auth-layout";
import { useAuth } from "@repo/auth/react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Button,
} from "@mui/material";

const API = import.meta.env.VITE_API_URL || "https://turborepo-api-six.vercel.app";

const apps = [
  { name: "Store", path: "/store", color: "#3b82f6", icon: "S" },
  { name: "Blog", path: "/blog", color: "#8b5cf6", icon: "B" },
];

function HomePage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          width: 260,
          minWidth: 260,
          bgcolor: "#1e1e2f",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <Box sx={{ px: 3, py: 3, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography variant="h6" fontWeight={700} sx={{ m: 0, lineHeight: 1.3 }}>
            Admin
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            Kitchen Sink
          </Typography>
        </Box>

        <Box sx={{ flex: 1, py: 1, overflow: "auto" }}>
          <Typography
            variant="caption"
            sx={{
              px: 3,
              py: 1,
              display: "block",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.7rem",
            }}
          >
            Applications
          </Typography>

          <List dense disablePadding>
            <ListItemButton
              component="a"
              href="/"
              sx={{
                px: 3,
                py: 1.5,
                color: "rgba(255,255,255,0.85)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.06)" },
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: 0,
                    bgcolor: "#ff6d00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  D
                </Box>
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                slotProps={{ primary: { fontSize: "0.875rem", fontWeight: 500 } }}
              />
            </ListItemButton>

            {apps.map((app) => (
              <ListItemButton
                key={app.path}
                component="a"
                href={app.path}
                sx={{
                  px: 3,
                  py: 1.5,
                  color: "rgba(255,255,255,0.7)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.06)", color: "#fff" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: 0,
                      bgcolor: app.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {app.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={app.name}
                  slotProps={{ primary: { fontSize: "0.875rem" } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

        <Box sx={{ px: 3, py: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                borderRadius: 0,
                background: "linear-gradient(135deg, #ff6d00, #d50000)",
                fontSize: "0.8125rem",
                fontWeight: 700,
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#fff",
                }}
              >
                {user?.email || "User"}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.6875rem" }}
              >
                {user?.role || "user"}
              </Typography>
            </Box>
          </Box>

          <Button
            fullWidth
            onClick={handleLogout}
            sx={{
              textTransform: "none",
              borderRadius: 0,
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.8125rem",
              py: 0.75,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.08)",
                color: "#fff",
                borderColor: "rgba(255,255,255,0.25)",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ flex: 1, ml: "260px", p: 5, bgcolor: "#f5f5f7", minHeight: "100vh" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#111", mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Welcome back, {user?.email}
          </Typography>
        </Box>

        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#888",
            fontWeight: 600,
            fontSize: "0.75rem",
          }}
        >
          Available Applications
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 3,
          }}
        >
          {apps.map((app) => (
            <Box
              component="a"
              key={app.path}
              href={app.path}
              sx={{
                bgcolor: "#fff",
                border: "1px solid #e5e7eb",
                p: 3,
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                transition: "box-shadow 0.2s, transform 0.2s",
                display: "block",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 0,
                  bgcolor: app.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "#fff",
                  mb: 2,
                }}
              >
                {app.icon}
              </Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5, color: "#111" }}>
                {app.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "#888", fontSize: "0.8125rem" }}>
                View and manage the {app.name.toLowerCase()} application
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function getRedirectParam(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get("redirect");
}

export default function App() {
  const { isAuthenticated, loading, login } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    setRedirectTo(getRedirectParam());
  }, []);

  if (loading) {
    return (
      <AuthLayout>
        <p style={{ textAlign: "center" }}>Loading...</p>
      </AuthLayout>
    );
  }

  if (isAuthenticated) {
    return <HomePage />;
  }

  const handleSubmit = async (data: {
    email: string;
    password: string;
    username?: string;
  }) => {
    setError(null);
    const endpoint = mode === "login" ? `${API}/auth/login` : `${API}/auth/register`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Authentication failed");
      return;
    }

    const { token } = await res.json();
    login(token);
    window.location.href = redirectTo || "/";
  };

  return (
    <AuthLayout>
      <AuthForm mode={mode} onSubmit={handleSubmit} error={error} />
      <p style={{ textAlign: "center", marginTop: 16 }}>
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setMode("register")}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
                fontSize: 14,
              }}
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => setMode("login")}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                textDecoration: "underline",
                padding: 0,
                fontSize: 14,
              }}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </AuthLayout>
  );
}
