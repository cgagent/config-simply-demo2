# Configure Simply

A React single-page application built with Vite, TypeScript, shadcn/ui, and Tailwind CSS.
The production image is served by Nginx and published to the GitHub Container Registry (GHCR).

## Getting Started

Prerequisites: Node.js 20+ and npm.

```sh
npm ci          # install dependencies
npm run dev     # start the dev server
```

Other useful scripts:

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run build:dev` | Development build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |
| `npm run test:coverage` | Run tests with coverage |

## CI/CD Workflows

All workflows run on GitHub Actions and use GitHub-native services (GHCR for container images, `GITHUB_TOKEN` for authentication). Workflow files live in `.github/workflows/`.

### 1. Code Quality (`code-quality.yml`)

**Trigger:** every push to `main` and every pull request.

Runs static analysis to catch issues before they reach production:

- **ESLint** -- enforces code style and catches common JavaScript/TypeScript mistakes.
- **TypeScript type check** (`tsc --noEmit`) -- validates type correctness across the codebase without emitting build output.

This workflow does not require any container registry access; it only needs the source code and Node.js 20.

### 2. Build and Push Docker Image (`docker-push.yml`)

**Trigger:** every push to `main`.

Builds a production Docker image and publishes it to GHCR:

1. Checks out the repository.
2. Authenticates with `ghcr.io` using the built-in `GITHUB_TOKEN`.
3. Builds the multi-stage Docker image (Node 20 build stage, Nginx production stage).
4. Pushes the image as `ghcr.io/<owner>/<repo>:latest`.

The workflow requires `packages: write` permission to push to the container registry.

### 3. Smoke Test (`smoke-test.yml`)

**Trigger:** automatically runs after the *Build and Push Docker Image* workflow completes successfully on `main`.

Validates that the newly published container image actually works:

1. Pulls the `latest` image from GHCR.
2. Starts the container on port 8080.
3. **HTTP health check** -- verifies the app responds with HTTP 200.
4. **Security headers check** -- confirms the Nginx configuration includes required headers:
   - `X-Content-Type-Options`
   - `X-Frame-Options`
   - `X-XSS-Protection`
   - `Referrer-Policy`
5. Tears down the container (runs even if earlier steps fail).

### Workflow Pipeline

```
push to main
  ├── Code Quality ──────────────── lint + type check
  └── Build and Push Docker Image ─ build & push to GHCR
          └── Smoke Test ────────── pull, run, verify
```

Code Quality and Build run in parallel on every push to `main`.
The Smoke Test is chained to the Build workflow via `workflow_run` and only executes when the build succeeds.

## Docker

The `Dockerfile` uses a two-stage build:

| Stage | Base Image | Purpose |
|-------|-----------|---------|
| **build** | `node:20-alpine` | Install dependencies and run `vite build` |
| **production** | `nginx:alpine` | Serve the static assets with custom `nginx.conf` |

Build and run locally:

```sh
docker build -t configure-simply .
docker run -p 8080:80 configure-simply
```

The app will be available at `http://localhost:8080`.

## Tech Stack

- [Vite](https://vitejs.dev/) -- build tooling
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/) -- UI components and styling
- [Vitest](https://vitest.dev/) -- testing
- [Nginx](https://nginx.org/) -- production server
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) -- container image hosting
