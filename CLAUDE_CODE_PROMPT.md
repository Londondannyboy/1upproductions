# Claude Code scaffolding prompt — 1UP Productions site

**Paste this entire message into Claude Code as your first prompt.**

---

We're scaffolding a new Next.js 15 project that ports an existing vanilla three.js prototype into a clean, maintainable, deployable portfolio site for 1Up Productions.

## Step 1 — Diagnose first

Before writing any code:

1. Read `CLAUDE.md` in the project root in full.
2. Read `oneup-multicam.html` in the project root in full. This is the working vanilla prototype. Every architectural decision about the 3D scene, scroll phases, feeds, hotspots, and overlays must be traceable to it.
3. List the major systems you find in the prototype and confirm the file layout target in `CLAUDE.md` covers them.

Do **not** run any `pnpm` / `npm` commands yet. Just read and confirm.

## Step 2 — Scaffold the Next.js project

Use the existing project root (do not nest a sub-folder). Initialise:

- Next.js 15 App Router, TypeScript strict
- Tailwind CSS
- ESLint
- Use `pnpm` if available, else `npm`

Then install:

```
three @types/three
@react-three/fiber @react-three/drei
framer-motion
clsx
```

Then initialise shadcn/ui:

```
pnpm dlx shadcn@latest init -d
```

Add components: `button`, `dialog` (we'll need `dialog` for the FeedViewer modal).

## Step 3 — Globals + tokens

In `app/globals.css`:

- Tailwind base/components/utilities
- CSS variables for the design tokens listed in `CLAUDE.md` under "Design tokens"
- Selection colour, body font, smooth font rendering
- Film-grain overlay class (port from prototype)

Configure `next/font/google` for Instrument Serif (italic + roman), JetBrains Mono (400/500/700), Inter Tight (300–800). Wire them as CSS variables in `app/layout.tsx`.

Update `tailwind.config.ts` to expose those CSS vars as Tailwind colours and font families.

## Step 4 — File layout

Create the file tree under `components/`, `lib/`, `content/` exactly as specified in `CLAUDE.md` "File layout (target)". Create empty stub files with a one-line `// TODO: port from oneup-multicam.html — <thing>` comment in each, so the structure is explicit before any one file gets fleshed out.

## Step 5 — Port order

After the scaffold and stubs exist, port in this order — one component per turn unless I tell you otherwise:

1. `lib/smoothstep.ts`, `lib/formatTC.ts`, `lib/scrollProgress.ts` (utilities first)
2. `lib/videoSources.ts` (the CORS-safe fallback chain)
3. `components/feeds/feedCanvases/*` (port the 5 `draw*` functions; pure, no deps)
4. `components/hero/scene/*` (each piece of geometry — Tunnel, Stage, LedWall, Truss, Crowd, BroadcastCameras, LightCones, TunnelMonitors, FloorPanels)
5. `components/hero/Scene.tsx` (composes the scene pieces)
6. `components/hero/HeroCanvas.tsx` (the `<Canvas>` wrapper, scroll-driven camera path)
7. `components/hero/SceneOverlays.tsx` and `BroadcastUI.tsx` (Framer Motion text)
8. `components/hero/Hotspots.tsx` (3D-to-screen projection)
9. `components/feeds/FeedViewer.tsx` (the modal with cam selector)
10. `components/hero/HeroExperience.tsx` (top-level wrapper, dynamic-imported in `app/page.tsx`)
11. `components/reel/RollVtTransition.tsx`
12. `components/reel/ReelCanvas.tsx`, `Reel.tsx`
13. `components/portfolio/PortfolioCard.tsx`, `PortfolioGrid.tsx`, `DualCta.tsx`
14. `components/ui/NavBar.tsx`, `SkipButton.tsx`, `GrainOverlay.tsx`, `ScrollProgress.tsx`
15. `app/page.tsx` — the final composition

## Step 6 — Verification at each step

After each component is ported:

- Run `pnpm tsc --noEmit` (or `npm run typecheck`) — must be clean
- Run `pnpm lint` — must be clean
- Open the dev server (`pnpm dev`) and verify the new component renders without console errors

Do not move on to the next component if either typecheck or lint fails on the previous one.

## Step 7 — Deploy readiness

Once everything is ported and the page matches the prototype:

- Confirm the hero works without WebGL (graceful degradation: a static hero image + jump-link to the reel)
- Confirm Lighthouse score ≥ 85 on Performance for the marketing surfaces (the hero canvas is dynamic-imported so the marketing first paint should be fast)
- Add a `vercel.json` if needed
- Add a one-page `README.md` with setup instructions and the "swap placeholder videos for real footage" instructions

## Hard rules during the build

- **Read `CLAUDE.md` and the relevant section of `oneup-multicam.html` before every implementation turn.** Do not write code from memory of what you've already read.
- The prototype HTML file is the source of truth for behaviour. If something in the port disagrees with the prototype, the prototype wins unless I say otherwise.
- TypeScript strict mode must stay on. No `any` unless absolutely unavoidable, and if so, comment why.
- No new dependencies beyond what's listed without asking me first.
- Single-purpose components. If a component file exceeds ~250 lines, split it.

When you're ready, start with Step 1 and confirm what you find before doing anything else.
