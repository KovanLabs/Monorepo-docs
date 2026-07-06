# Turborepo — Monorepo Build Tool Notes

## What is Turborepo?

Turborepo is a build tool that manages multiple applications within a single version-controlled repository. It's lightweight and fast (written in Rust), and focused primarily on **task running + caching** rather than the deeper project-graph tooling Nx offers.

## Core Features

- **Caching:** Skips rebuilding/re-running unchanged code. If a monorepo has 4 apps and only one file changes in App 1, only App 1 rebuilds — Apps 2, 3, and 4 are pulled instantly from cache.
- **DAG (Directed Acyclic Graph):** Tracks dependencies between apps and packages so Turborepo knows exactly what needs to rebuild and what can be safely skipped.

---

## Setup — Fresh Project

```bash
# npm
npx create-turbo@latest

# pnpm
pnpm dlx create-turbo@latest
```

Supports: **pnpm, npm, yarn, and bun**.

### Global installation

```bash
# pnpm
pnpm add turbo --global

# npm
npm install turbo --global
```

Once installed globally, you can run Turbo commands from anywhere:
```bash
turbo build
turbo run dev
```

📖 Read the docs on repo structuring:
https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository

---

## Setup — Add to an Existing Repo

Follow the manual steps in the official docs:
https://turborepo.dev/docs/getting-started/add-to-existing-repository

---

## Generating Code

### Add an empty package

```bash
pnpm turbo gen workspace
```

(Use the equivalent command for your package manager if Turbo isn't installed globally.)

This creates a new app inside `apps/<name>` (the name given when prompted), scaffolded with just `package.json` and `README.md`.

### Copy an existing package

```bash
turbo gen workspace --copy
```

Or copy directly from a specific source, e.g.:

```bash
turbo gen workspace --copy https://github.com/vercel/turborepo/tree/main/examples/with-tailwind/packages/tailwind-config
```

---

## Using Git Submodules to Add Applications

```bash
git submodule add <github_url> <path>
```

- `<github_url>` → the repo to clone
- `<path>` → the directory to clone it into

> ⚠️ **Important:** A submodule works as an independent repo. Commits/pushes made from the monorepo root will **not** propagate into the submodule — you must `cd` into the submodule's own directory and commit/push from there.

---

## Deployment

### Vercel Deployment

1. Deploy each application inside `apps/` as a **separate Vercel project**.
2. Configure the correct **Root Directory**, **Build Command**, and **Output Settings** per app, based on its tech stack.
3. Pick one application (typically the primary/web app) to act as the **gateway/host**.
4. In the host app, add a `vercel.json` with **rewrites** to proxy requests to the other (remote) apps.
5. If the monorepo is imported directly from GitHub, Vercel automatically detects the monorepo structure and aligns directories correctly.

### Host and Remote Architecture

- One app acts as the **host (gateway)** and exposes the single public domain.
- The rest are **remote apps**, each deployed independently.
- The host uses Vercel rewrites to route incoming paths to the correct remote app, so the actual (separate) deployment URLs stay hidden behind the gateway domain.

**Example setup — 4 apps:**
- `admin` (Vite) → **host**
- `blog` (Remix) → remote
- `storefront` (Next.js) → remote
- `api` (Express) → remote

`vercel.json` in the host (`admin`) app:

```json
{
  "rewrites": [
    {
      "source": "/store",
      "destination": "https://turborepo-monorepo-storefront.vercel.app/store"
    },
    {
      "source": "/blog/:path*",
      "destination": "https://turborepo-monorepo-blog.vercel.app/blog/:path*"
    },
    {
      "source": "/store/:path*",
      "destination": "https://turborepo-monorepo-storefront.vercel.app/store/:path*"
    }
  ]
}
```

**Local dev ports:**
- `admin` → `localhost:3001`
- `blog` → `localhost:3002`
- `storefront` → `localhost:3003`
- `api` → `localhost:5001`

After the rewrite config, all apps are reachable through the host's port/domain:
- `localhost:3001` → admin
- `localhost:3001/blog` → blog
- `localhost:3001/store` → storefront

Same pattern in production:
- `https://turborepo-monorepo.vercel.app/` → admin
- `https://turborepo-monorepo.vercel.app/blog` → blog
- `https://turborepo-monorepo.vercel.app/store` → storefront

---

## Use Cases

### Shared `packages/auth`

Keep all authentication logic (Auth.js config, middleware, roles, permissions, session helpers) in `packages/auth`, and have every app (`web`, `blog`, `storefront`, `admin`) import it. Gives you one auth implementation and supports Single Sign-On (SSO) across apps.

### Shared `packages/db`

Keep the Prisma schema, migrations, and Prisma client in `packages/db`. All apps import the same client (e.g. `@repo/db`), giving one schema, one migration history, and consistent DB access everywhere.

### Why one shared database instead of per-app databases?

Since all apps belong to the same product, a shared database avoids duplicate user data, enables shared auth, simplifies relationships between data, reduces maintenance, and gives a single source of truth. Separate databases make more sense for genuinely independent services with different teams, scaling needs, or ownership.

---

## Git Submodules — Recap Concern

Submodules let you pull in projects easily, but:
- Pushes/commits **must** be made from within the submodule's own working directory.
- You **cannot** push submodule changes from the monorepo root.

---

## Quick Reference

| Task | Command |
|---|---|
| New project (npm) | `npx create-turbo@latest` |
| New project (pnpm) | `pnpm dlx create-turbo@latest` |
| Install globally (pnpm) | `pnpm add turbo --global` |
| Install globally (npm) | `npm install turbo --global` |
| Add empty package | `pnpm turbo gen workspace` |
| Copy existing package | `turbo gen workspace --copy` |
| Add submodule | `git submodule add <url> <path>` |