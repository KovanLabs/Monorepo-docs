# Nx — Monorepo Build Tool Notes

## What is Nx?

Nx is a build system and monorepo management tool used to manage multiple applications and packages within a single version-controlled directory. It provides caching, task orchestration, and dependency-graph awareness across projects.

---

## Setup

### 1. Add Nx to an existing repository

```bash
npx nx@latest init
```

### 2. Create a brand-new Nx workspace

```bash
npx create-nx-workspace@latest
```

This runs an interactive CLI where you can:
- Choose a preset (React, Angular, Node, etc.) to scaffold a complete project structure, **or**
- Choose an empty preset to start with a bare Nx monorepo and add apps/packages later.

---

## Adding an Application

### Step 1 — Install the relevant plugin

```bash
npx nx add @nx/angular
```

> ⚠️ Use `npx`, not `npm`. `nx add` both installs the plugin package **and** runs its `init` generator automatically.

### Step 2 — Generate the app scaffold

```bash
npx nx g @nx/angular:app my-app --directory=apps/my-app
```

- `my-app` → the project name
- `--directory=apps/my-app` → where the app is physically placed

> 💡 Passing a path directly as the app name (e.g. `apps/my-app`) is legacy/unreliable behavior in current Nx versions — it can cause the app to be generated at the workspace root instead of inside `apps/`. Always use the explicit `--directory` flag.

### Same pattern for other frameworks

```bash
npx nx g @nx/react:app my-app --directory=apps/my-app
npx nx g @nx/node:app my-api --directory=apps/my-api
npx nx g @nx/nest:app my-service --directory=apps/my-service
```

---

## Plugins (frameworks)

Nx has an official plugin registry covering most frameworks:

| Plugin | Use case |
|---|---|
| `@nx/react` | React apps |
| `@nx/angular` | Angular apps |
| `@nx/next` | Next.js apps |
| `@nx/node` | Node.js apps |
| `@nx/nest` | NestJS apps |
| `@nx/express` | Express apps |

Community plugins also exist for other stacks. General flow:

1. Check the Nx plugin registry for your framework
2. Install with `npx nx add <plugin>`
3. Generate the app/library with the plugin's generator

---

## Use cases tested

### Issue 1 — `@nx/angular` doesn't support existing TypeScript setup

Error encountered when running `nx add @nx/angular` on a repo with TypeScript project references:

```
NX   The "@nx/angular" plugin doesn't support the existing TypeScript setup

The Angular framework doesn't support a TypeScript setup with project references.
See https://github.com/angular/angular/issues/37276 for more details.
You can ignore this error, at your own risk, by setting the
"NX_IGNORE_UNSUPPORTED_TS_SETUP" environment variable to "true".

NX   Failed to initialize @nx/angular
- Command failed: npx nx g @nx/angular:init --keepExistingVersions
```

**Root cause:** Angular's tooling doesn't yet support a `tsconfig.json` that uses TypeScript **project references** (the `"references": [...]` array).

**Fix — one of the following:**
1. Open `tsconfig.json` and remove/comment out the `"references"` array, **or**
2. Move the relevant compiler options into `tsconfig.base.json` instead of relying on project references.

### Issue 2 — Git submodules / subtrees inside the monorepo

When pulling in existing repos as **git submodules** or **git subtrees**:

- Always double check each pulled repo's `package.json` for correct build and deployment scripts before wiring it into the monorepo's task pipeline.
- Submodules behave as independent repos — commits/pushes must be run from inside that submodule's directory, not from the monorepo root (see the Turborepo notes for the same caveat).

---

## Quick Reference

| Task | Command |
|---|---|
| Add Nx to existing repo | `npx nx@latest init` |
| Create new workspace | `npx create-nx-workspace@latest` |
| Install a plugin | `npx nx add <plugin>` |
| Generate an app | `npx nx g <plugin>:app <name> --directory=apps/<name>` |
| Generate a library | `npx nx g <plugin>:lib <name> --directory=packages/<name>` |
| Bypass TS project-references error (risky) | `NX_IGNORE_UNSUPPORTED_TS_SETUP=true` |