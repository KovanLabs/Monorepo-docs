import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import { createServer } from "../server";
import { signToken } from "@repo/auth";

process.env.AUTH_SECRET ||= "test-secret";

describe("Server", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/status")
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true);
      });
  });

  it("message endpoint says hello", async () => {
    const token = signToken({ sub: "user-1", email: "jared@example.com", role: "user" });

    await supertest(createServer())
      .get("/api/message/jared")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: "hello jared",
          user: expect.objectContaining({
            sub: "user-1",
            email: "jared@example.com",
            role: "user",
          }),
        });
      });
  });

  it("responds to CORS preflight for auth routes", async () => {
    await supertest(createServer())
      .options("/auth/register")
      .set("Origin", "https://turborepo-monorepo.vercel.app")
      .set("Access-Control-Request-Method", "POST")
      .expect(200)
      .then((res) => {
        expect(res.headers["access-control-allow-origin"]).toBe("https://turborepo-monorepo.vercel.app");
      });
  });
});
