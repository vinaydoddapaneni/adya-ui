# AdyaUI Core — Demo Instructions

This file explains how to run the local demo for the `@adyaui/core` package (the interactive `index.html` you see in `packages/core`).

Prerequisites
- Node.js >= 18
- pnpm >= 8 (the repository uses pnpm workspaces)

Quick start (root)
```bash
pnpm install
pnpm dev
```
- `pnpm dev` runs `vite` in the packages (filters configured in the root `package.json`).
- After the dev server starts, open the URL printed by Vite (usually `http://localhost:5173`) and navigate to the `packages/core` demo.

Run only the core demo
```bash
pnpm --filter @adyaui/core dev
```

Build core for production
```bash
pnpm --filter @adyaui/core build
pnpm --filter @adyaui/core preview
```

What I changed for the demo
- Added multiple demo sections to `packages/core/index.html` showcasing the implemented components (UI-only examples).
- Added a small demo initialization script to `packages/core/index.html` that populates `aui-autocomplete`, `aui-datagrid`, and `aui-treeview` with example data and wires simple event logging.

Notes and next steps
- Some demos use example assets (e.g., `/src/assets/avatar-1.png`, `/src/assets/icon-heart.svg`). If you don't have those assets, replace the `src` attributes or add files under `packages/core/src/assets`.
- I did not modify any `adyaai/*` files — all changes are limited to `packages/core` and the top-level `COMPONENTS_REPORT.md` and `adyaai/data/components.json` (manifest enrichment earlier).
- If you want, I can:
  - Add missing example assets and polish demo visuals.
  - Extract live metadata from components and render a dynamic components list.
  - Create a small script to deploy the demo to GitHub Pages.

If you'd like one of the follow-ups, tell me which and I'll implement it.
