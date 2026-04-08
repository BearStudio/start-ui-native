# CLAUDE.md — Start UI Native

This file provides project-specific guidance for Claude Code when working on this codebase.

## Project Overview

Start UI Native is a React Native starter kit built with Expo. It provides a production-ready foundation with authentication, typed routing, i18n, theming, and API integration.

**Why it exists**: accelerate new React Native project bootstrapping by providing pre-wired, opinionated patterns for the concerns that are always needed but always painful to set up (auth, forms, API client, i18n, theming).

## Requirements

- [Node.js](https://nodejs.org) >= 22
- [pnpm](https://pnpm.io/)

## Tech Stack

| Concern | Library |
| --- | --- |
| Framework | React 19 + React Native 0.83 + Expo 55 |
| Routing | Expo Router v55 (file-based, typed routes) |
| Styling | Tailwind CSS 4 via UniWind 1.5 + CVA + `cn()` |
| State (server) | TanStack React Query 5 |
| State (client) | Zustand 5 with AsyncStorage persistence |
| Forms | TanStack Form + Zod 4 |
| API client | Hey API (generated from OpenAPI schema) |
| Auth | Better Auth + `@better-auth/expo` (email OTP) |
| i18n | i18next + react-i18next + expo-localization |
| Lists | @shopify/flash-list |
| Animations | react-native-reanimated 4 |
| Icons | Lucide React Native + custom SVG via SVGR |
| Toasts | Sonner Native |
| Storage | AsyncStorage (state) + expo-secure-store (auth tokens) |
| E2E tests | Maestro (YAML flows) |

## Project Structure

```txt
src/
  app/                   # Expo Router file-based routes
    (public)/            # Unauthenticated routes (sign-in, otp-verification)
    (logged)/            # Authenticated routes
      (tabs)/            # Tab navigation (home, books, account)
      books/[id].tsx     # Dynamic book detail
    storybook/           # Storybook-specific route
  components/
    ui/                  # Core UI primitives (Button, Card, Input, Text…)
    form/                # TanStack Form field components (FieldText, FieldOtp)
    icons/               # Icon components (generated + lucide)
  features/              # Feature modules (auth, home, books, account…)
  layout/                # Shared layout wrappers (ViewTabContent, ViewSafeContent…)
  lib/
    hey-api/             # API client + generated React Query hooks
    i18n/                # i18next setup
    tanstack-form/       # Form config
    tailwind/            # cn() utility
  hooks/                 # Custom React hooks
  locales/               # Translation files (en/, fr/)
  constants/
  types/
.maestro/
  flows/                 # E2E test flows
  utils/                 # Reusable Maestro utilities
```

## Key Conventions

### File Naming

- Kebab-case for all files: `view-books.tsx`, `use-disclosure.ts`
- Exceptions: Icon components (`IconHome.tsx`), Logo components
- Screen/view components: prefix with `view-`: `view-books.tsx`, `view-home.tsx`

### Feature Module Structure

Each feature folder contains only what is specific to that feature:

```txt
features/books/
  view-books.tsx       # List screen (route entry point)
  view-book.tsx        # Detail screen
  book-cover.tsx       # Sub-component used only within this feature
```

### UI Component Conventions

UI primitives in `src/components/ui/` follow these rules:

- Named exports only (no default export): `export { Badge }`, `export type { BadgeProps }`
- Props type = native RN props extended with variants: `type BadgeProps = ViewProps & VariantProps<typeof badgeVariants>`
- Variants via `cva()`, class merging via `cn()`
- Support `asChild` via `@rn-primitives/slot` when the component wraps a pressable

Real example: [src/components/ui/badge.tsx](src/components/ui/badge.tsx)

### Imports — Path Alias

Always use `@/` alias instead of relative paths for imports outside the current feature:

```ts
import { api } from '@/lib/hey-api/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/tailwind/utils';
```

### Styling with Tailwind + UniWind

- Apply Tailwind classes directly to React Native components
- Use `cn()` from `@/lib/tailwind/utils` to merge classes
- Use `cva()` for component variants (see `button.tsx` as reference)
- Platform-specific styles via `Platform.select({ web: '...' })`
- Dark mode is handled by the UniWind theme system — do NOT use `dark:` Tailwind classes

Real example: [src/components/ui/badge.tsx](src/components/ui/badge.tsx)

### UI State Pattern (`@bearstudio/ui-state`)

The project uses `getUiState` for type-safe conditional rendering. Always end the chain with `.exhaustive()` to enforce all states are handled.

Real example: [src/features/books/view-books.tsx](src/features/books/view-books.tsx)

### API Usage (Hey API + React Query)

Generated hooks live in `src/lib/hey-api/generated/` — never edit these files. Import via the `api` namespace from `@/lib/hey-api/api`. Three patterns: `useQuery(api.*Options())`, `useInfiniteQuery({ ...api.*InfiniteOptions(), getNextPageParam, initialPageParam })`, `useMutation(api.*MutationOptions())`.

Real examples: [src/features/books/view-books.tsx](src/features/books/view-books.tsx), [src/features/books/view-book.tsx](src/features/books/view-book.tsx)

Regenerate the client after OpenAPI schema changes: `pnpm gen:api`

### Authentication

- Auth client: `authClient` from `@/features/auth/client`
- Session hook: `authClient.useSession()`
- Protected routes use `Stack.Protected` with a `guard` prop
- Auth is email OTP — no passwords

### Forms (TanStack Form + Zod)

Use `useAppForm` from `@/lib/tanstack-form` with a Zod `onSubmit` validator. Wrap fields in `form.AppForm` > `form.AppField` > `FieldText` / `FieldOtp` components from `@/components/form/`.

Setup: [src/lib/tanstack-form/](src/lib/tanstack-form/) — Real example: [src/features/auth/view-sign-in.tsx](src/features/auth/view-sign-in.tsx)

### i18n

- Always use translation keys, never hardcode user-facing strings
- Use namespaces matching the feature: `useTranslation(['books'])`
- Key format: `t('books:list.empty')`
- Add keys to both `src/locales/en/[namespace].json` and `src/locales/fr/[namespace].json`

### Navigation (Expo Router)

- Typed routes are enabled — use the typed `href` format

Real examples: [src/features/books/view-books.tsx](src/features/books/view-books.tsx) (Link with params), [src/app/(logged)/_layout.tsx](src/app/(logged)/_layout.tsx) (programmatic navigation)

### Lists

- Use `FlashList` from `@shopify/flash-list` instead of `FlatList` for performance

### Icons

- Use Lucide icons: `import { BookOpen } from 'lucide-react-native'`
- Custom SVGs: add to `src/components/icons/svg-sources/` with `icon-` prefix, run `pnpm gen:icons`

### TypeScript

- Strict mode is on: `noUncheckedIndexAccess`, `noImplicitAny`, `strictNullChecks`
- Never use `any`
- See the file `src/types/utilities.d.ts` for more informations

## Available Scripts

```bash
pnpm dev               # Start Expo Go (fastest for iteration)
pnpm ios               # Run on iOS simulator
pnpm android           # Run on Android emulator
pnpm lint              # Run ESLint + TypeScript check in parallel
pnpm lint:eslint       # ESLint with --fix
pnpm lint:ts           # TypeScript check (no emit)
pnpm pretty            # Prettier format all files
pnpm gen:api           # Regenerate API client from OpenAPI schema
pnpm gen:icons         # Regenerate icon components from SVGs
pnpm dev:storybook     # Start Storybook (port 8083)
pnpm test:e2e          # Run all Maestro E2E flows
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `EXPO_PUBLIC_BASE_URL` | Yes | Base API server URL |
| `EXPO_PUBLIC_AUTH_URL` | No | Better Auth endpoint (default: `${BASE_URL}/api/auth`) |
| `EXPO_PUBLIC_OPENAPI_URL` | No | OpenAPI schema URL (default: `${BASE_URL}/api/openapi/app/schema`) |

Copy `.env.example` to `.env` to get started.

## E2E Tests (Maestro)

Flows live in `.maestro/flows/`, reusable utilities in `.maestro/utils/`.

## Code Quality

Git hooks (via Lefthook) run automatically:

- **pre-commit**: Prettier formats staged files
- **pre-push**: ESLint + TypeScript check

ESLint enforces kebab-case filenames, import order, no unused variables (prefix `_var` to suppress), and Sonar cognitive complexity. It runs automatically on pre-push — do not skip hooks.

## Storybook

Run in a separate Expo instance with `APP_ENV=storybook pnpm dev:storybook`.
Stories live alongside components.

## Do Not

- Hardcode user-facing strings — always use i18n keys
- Use `FlatList` — use `FlashList` instead
- Use relative imports across feature boundaries — use `@/` alias
- Use `dark:` Tailwind modifier — use UniWind theme system
- Modify files in `src/lib/hey-api/generated/` — they are auto-generated
- Use `any` TypeScript type
- Add `console.log` statements in committed code
