# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forge is a task management / roadmap UI built with React 18, TypeScript, and Vite. It uses mock data (no backend) and DeployRamp SDK for feature flags.

## Commands

```bash
npm run dev          # Dev server on port 8080
npm run build        # Production build
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest (watch mode)
```

Run a single test file: `npx vitest run src/test/example.test.ts`

## Architecture

**Routing:** React Router v6 — two routes: `/` (Index) and `*` (404).

**State management:**
- Feature flags via DeployRamp SDK (`useFlags()` hook from `src/lib/feature-flags.tsx`)
- React Query provider is wired up but not actively used (no API layer yet)
- All task/project data comes from `src/lib/mock-data.ts`

**UI layer:** shadcn-ui components (Radix primitives + Tailwind) live in `src/components/ui/`. Custom app components are in `src/components/forge/`.

**Styling:** Tailwind CSS with custom color tokens (`forge-urgent`, `forge-high`, etc.) defined in `tailwind.config.ts`. Animations use Framer Motion.

**Path alias:** `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

## Key Conventions

- Feature-flagged components check `useFlags()` and conditionally render (AiSummary, PriorityMatrix, TimelineView, BulkActions)
- TypeScript config is relaxed: `strict: false`, `noImplicitAny: false`
- Forms use React Hook Form + Zod for validation
