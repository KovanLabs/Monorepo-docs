# Monorepo Guide

## What is a Monorepo?

A monorepo is a single, version-controlled repository that contains multiple projects or applications. Instead of maintaining separate repositories and dependency setups for each application, all projects are managed together within one repository. This approach simplifies code sharing, dependency management, and cross-project coordination.


## Popular Monorepo Tools

- **Nx**
- **Rush**
- **Turborepo** (Turbo)

## Quick Notes

- **Nx**: Uses project graph analysis (often based on Abstract Syntax Tree or dependency graphs) to identify changed projects and determine what needs to be rebuilt or tested.
- **Rush**: Commonly used in TypeScript-heavy ecosystems; frequently paired with pnpm for large JavaScript/TypeScript repositories.
- **Turborepo**: A lightweight and fast tool written in Rust, primarily focused on task running and caching.

## Nx Setup Notes

You can add Nx to an existing repository using the Nx CLI or initialize a new workspace from an Nx template.

For existing workspaces, install dependencies and execute Nx commands from the repository root (example: `pnpm install`).

### Supported Package Managers
- npm
- yarn
- pnpm
- bun

## Key Concepts

- **Distributed Caching**: Caches build and test results so that repeated CI or local runs can reuse previous outputs when inputs remain unchanged.
- **Inter-app Routing (Next.js)**: Enables running and navigating multiple applications together, often through a single entry point or port, depending on the composition strategy.

### References
- [Next.js Monorepo Inter-app Routing](https://www.technetexperts.com/nextjs-monorepo-inter-app-routing/)
- [Scaling Frontend Architecture with Nx Monorepo and Next.js](https://medium.com/@cphsuan17/scaling-frontend-architecture-with-nx-monorepo-and-nextjs-part-1-architecture-design-dfc80bcb840a)
- [Nx Workspace with Standalone Angular Host and Remote Applications](https://medium.com/havelsan/creating-an-nx-workspace-with-standalone-angular-host-and-remote-applications-d6f900a6cad2)

## DAG / Project Graph (Nx)

Nx constructs a Directed Acyclic Graph (DAG) of projects and their dependencies. When files change, Nx determines:
- Which projects are affected
- Which tasks (build, test, lint) must run
- What can be safely skipped or served from cache

## Multi-zone / Module Federation

- **Multi-zone**: A Next.js approach for composing multiple Next.js applications.
- **Module Federation**: A micro-frontend pattern commonly used with React or Angular “host/remote” setups.

**Open Question**: How should non-Next.js or plain HTML applications be deployed within a monorepo or micro-frontend architecture?

## Deployment (High-Level)

Applications in a monorepo can be deployed:
- **Independently**: Each application maintains its own CI/CD pipeline.
- **Collectively**: A single pipeline builds and deploys multiple applications.

**Reference**: [Nx Monorepo Setup](https://frontvalue.nl/blog/setup-monorepo)

## Turborepo

Turborepo is a monorepo management tool focused on caching and efficient execution of tasks or scripts across applications.

### Setup Commands
- For a new project: `npx create-turbo@latest`
- For an existing project: Follow the manual steps in the [official documentation](https://turborepo.dev/docs/getting-started/add-to-existing-repository)

### Core Features
Turborepo provides smart caching and parallelism. If a monorepo contains multiple applications and only one file changes in a specific app, only that application rebuilds. Other applications retrieve results from cache. This capability is powered by a Directed Acyclic Graph (DAG) that tracks dependencies between apps and packages.

### Deployment Considerations
When deploying a monorepo with multiple applications (e.g., 10 apps) to platforms such as Vercel or EC2, a code change should trigger a build and deployment process focused on the affected application while leveraging the monorepo structure.

## Use Cases

1. **Shared Authentication Package (`packages/auth`)**  
   Yes. Keep all authentication logic (Auth.js configuration, middleware, roles, permissions, session helpers) in `packages/auth`. Every application (web, blog, storefront, admin) can import it. This ensures a single authentication implementation and supports Single Sign-On (SSO).

2. **Shared Database Package (`packages/db`)**  
   Yes. Create a shared `packages/db` package containing the Prisma schema, migrations, and Prisma client. All applications import the same database client (`@repo/db`), providing one schema, one migration history, and consistent access across the monorepo.

3. **Shared Database vs. Separate Databases**  
   For applications that form part of the same product, a single shared database is preferable. It avoids duplicate user data, enables shared authentication, simplifies data relationships, reduces maintenance overhead, and establishes a single source of truth. Separate databases are more suitable for completely independent services managed by different teams with distinct scaling needs or ownership models.

## Additional Notes

Projects can be managed via Git submodules for easier independent work. Changes require navigating to the specific application directory to commit and push. Pushing directly from the monorepo root may not be supported for submodule-based setups.