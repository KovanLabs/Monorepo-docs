"use client";

import { useState, type FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: {
    email: string;
    password: string;
    username?: string;
  }) => Promise<void>;
  error?: string | null;
}

export function AuthForm({ mode, onSubmit, error }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    onSubmit(
      mode === "register" ? { email, username, password } : { email, password }
    ).finally(() => setSubmitting(false));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5, width: "100%" }}
    >
      <Typography variant="h5" fontWeight={700} textAlign="center">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </Typography>

      <Typography variant="body2" color="text.secondary" textAlign="center">
        {mode === "login"
          ? "Enter your credentials to sign in"
          : "Fill in the details to get started"}
      </Typography>

      <TextField
        label="Email"
        type="email"
        required
        fullWidth
        size="medium"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
      />

      {mode === "register" && (
        <TextField
          label="Username"
          type="text"
          required
          fullWidth
          size="medium"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
        />
      )}

      <TextField
        label="Password"
        type="password"
        required
        fullWidth
        size="medium"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        inputProps={{ minLength: 6 }}
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 0 } }}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={submitting}
        sx={{
          textTransform: "none",
          fontWeight: 600,
          py: 1.5,
          borderRadius: 0,
          background: "linear-gradient(135deg, #ff6d00, #d50000)",
          "&:hover": {
            background: "linear-gradient(135deg, #e65100, #b71c1c)",
          },
        }}
      >
        {submitting ? (
          <CircularProgress size={22} color="inherit" />
        ) : mode === "login" ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </Button>
    </Box>
  );
}
