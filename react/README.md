# u1-react

Client-only React SPA template (Vite + React 19 + TanStack Router + TanStack Query), with Entra ID auth via MSAL wired in as a reference pattern.

See `CLAUDE.md` for architecture, conventions, and how the pieces fit together.

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in your own Entra ID app registration
pnpm dev
```

## Scripts

```bash
pnpm dev       # dev server on port 3000
pnpm build     # production build
pnpm preview   # preview a production build
pnpm test      # run tests with Vitest
pnpm lint      # eslint
pnpm format    # prettier --write + eslint --fix
pnpm check     # prettier --check
```
