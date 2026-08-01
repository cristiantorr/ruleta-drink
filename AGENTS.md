# AGENTS.md

## Project

Drinking roulette game ("Ruleta Ebrios"). React + TypeScript + Vite SPA. Spanish UI. No backend.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc -b && vite build (typecheck required before build)
npm run lint     # oxlint (NOT eslint)
npm run preview  # vite preview
```

**No test script exists.** There is no test framework installed.

## Linter

Oxlint, not ESLint. Config at `.oxlintrc.json`. Rules: `react/rules-of-hooks` (error), `react/only-export-components` (warn).

## TypeScript

Two configs:
- `tsconfig.app.json` — app code under `src/` (noEmit, react-jsx, target es2023)
- `tsconfig.node.json` — Vite/node tooling

Strict: `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`. Build fails on unused imports.

## Styling

Tailwind CSS v4 — uses `@import "tailwindcss"` in CSS (not `@tailwind` directives). Custom neon theme colors defined in `src/index.css` via `@theme` block.

## State & Persistence

- Central state lives in `src/hooks/useGameState.ts`
- Game state auto-persists to `localStorage` key `ruleta-game-state` while game is active
- Rules hide preference at `ruleta-hide-rules`
- Reset resets scores/history but keeps players/options; "Reset All" clears localStorage

## Sound

Web Audio API synthesis (no audio files). `AudioContext` is created on first game start via `sound.initAudio()` — browser requires user gesture before audio plays.

## Key Architecture

- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`
- `App.tsx` orchestrates: setup screen → game screen via `AnimatePresence`
- `useGameState` hook returns `spinRoulette()` as a Promise resolved by `handleSpinEnd` via `resolveSpinRef`
- Drunk milestones: 10 shots (drunk), 15 (no more), 20 (vomit) — tracked in `achievedMilestones` Set in App.tsx
- Framer Motion for all transitions

## Conventions

- All components are named exports (not default exports)
- Types in `src/types/game.ts`
- Constants (default roulette options) in `src/constants/defaultOptions.ts`
- Utility functions are pure (no side effects) in `src/utils/`
