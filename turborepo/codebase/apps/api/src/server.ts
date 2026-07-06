import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { hashPassword, verifyPassword, signToken } from "@repo/auth";
import { authenticate } from "@repo/auth/express";
import { store } from "@repo/db";

const allowedOrigins = new Set(
  [
    process.env.CORS_ORIGIN,
    process.env.FRONTEND_URL,
    "https://turborepo-monorepo.vercel.app",
    "https://turborepo-monorepo-storefront.vercel.app",
    "https://turborepo-monorepo-blog.vercel.app",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:5173",
  ].filter((origin): origin is string => Boolean(origin))
);

const isAllowedOrigin = (origin: string | undefined) => {
  if (!origin) {
    return true;
  }

  return allowedOrigins.has(origin) || origin.endsWith(".vercel.app");
};

const corsOptions = {
  origin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors(corsOptions));

  app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (isAllowedOrigin(origin)) {
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
      }
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  // public auth routes
  app.post("/auth/register", async (req, res) => {
    try {
      const { email, username, password } = req.body;
      if (!email || !username || !password) {
        res.status(400).json({ error: "Email, username, and password required" });
        return;
      }

      const existing = await store.findByEmail(email);
      if (existing) {
        res.status(409).json({ error: "Email already registered" });
        return;
      }

      const passwordHash = await hashPassword(password);
      const user = await store.createUser({
        email,
        username,
        passwordHash,
        role: "user",
      });

      const token = signToken({ sub: user.id, email: user.email, role: user.role });
      res.status(201).json({ token, user });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ error: "Email and password required" });
        return;
      }

      const user = await store.findByEmail(email);
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const valid = await verifyPassword(password, user.passwordHash);
      if (!valid) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      const token = signToken({ sub: user.id, email: user.email, role: user.role });
      const { passwordHash: _, ...publicUser } = user;
      res.json({ token, user: publicUser });
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // all routes below are protected
  app.use("/api", authenticate);

  app.get("/api/me", (req, res) => {
    res.json({ user: req.user });
  });

  app.get("/api/message/:name", (req, res) => {
    return res.json({ message: `hello ${req.params.name}`, user: req.user });
  });

  app.get("/api/admin", authenticate, (_, res) => {
    return res.json({ secret: "admin data" });
  });

  // health check (public)
  app.get("/status", (_, res) => {
    return res.json({ ok: true });
  });

  return app;
};

export default createServer();
