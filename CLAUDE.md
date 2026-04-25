# 1UP Productions — Cinematic Portfolio Site

## What this is

A redesigned portfolio site for **1Up Productions** (1upproductions.com) — a UK-based broadcast production company whose work spans LEC Finals, LoL Worlds, VCT Champions, Top Gear, Ant & Dec's Saturday Night Takeaway, A$AP Rocky at Coachella, UFC, David Blaine specials, and more.

The hero is a **scroll-driven 3D experience** built in `three.js` that puts the visitor on stage at an esports final — walking through a backstage tunnel (with wall-mounted monitors playing real video footage), emerging into the arena (with floor LED panels playing video), arriving at a circular stage where broadcast cameras swing to track them, and culminating in the moment they "go live" worldwide on the LED wall behind. After that, the cinematic intro hands off to a "Roll VT" transition card and then the showreel video, then the portfolio grid.

The site is dark editorial / cinematic — Instrument Serif italic for display, JetBrains Mono for broadcast credit chrome, Inter Tight for body. Tally-red broadcast accent (`#ff2d20`).

## Stack (intentional, do not deviate)

- **Next.js 15** App Router, TypeScript strict mode
- **Tailwind CSS** + **shadcn/ui** for non-3D UI
- **react-three-fiber** + **@react-three/drei** for the 3D scene
- **Framer Motion** for scroll-driven overlay text
- **Vercel** for deploy
- **No CMS yet** — content is hardcoded in `content/` files; we'll wire to Sanity or Directus later if 1Up wants editor access

This matches the pattern from fractional.quest: Next.js + Neon + Tailwind + shadcn/ui + Vercel. **No Astro.** No Payload.

## Scene architecture

The three.js scene is built procedurally — there are no `.glb` models. The geometry is:

- **Tunnel** — inverted box you walk down, ceiling strip lights, red broadcast-cable wall accents, six wall-mounted monitors (real `THREE.VideoTexture` with CCTV-style colour grade composited on top)
- **Arena floor** — large dark plane with two LED floor panels flanking the walk to stage (real `THREE.VideoTexture`)
- **Stage** — circular platform with glowing red LED edge ring, pulsing 1UP brand canvas texture on the floor
- **LED wall** — curved plane behind the stage, runs a `CanvasTexture` that flips from SMPTE colour bars to a viewfinder framing the visitor at the broadcast moment
- **Truss + lamps** above stage, with volumetric light cones (additive-blended cone geometries)
- **Crowd** — 480 instanced `BoxGeometry` silhouettes on tiered seating in a 1.2π arc behind the stage, with 60 additive glow-stick spheres
- **Four broadcast cameras** around the stage perimeter — each with body, lens, glass, tally light, tripod. Tally lights brighten and the cameras physically `slerp` toward the visitor as they cross the threshold.

## Scroll timeline (5 phases over ~5vh of scroll)

| Scroll % | Scene | Camera path | Overlay |
|---|---|---|---|
| 0.00–0.32 | Tunnel walk | Z: -45 → -8 | "In three." |
| 0.06–0.20 | Countdown | (during tunnel) | 3 → 2 → 1 (full screen) |
| 0.32–0.45 | Threshold | Z: -8 → -2, Y rises | "Stage right. Eyes up." |
| 0.45–0.65 | Walking onto stage | Z: -2 → 7.5 | "And we're live." |
| 0.65–0.82 | On stage / broadcast | Slow drift, swivel toward LED wall | "Worldwide. In one take." |
| 0.82–1.00 | Pull back / fade | Dolly back, scene fades | "Now playing the reel." |

Tally flash (red full-screen 0.07s) at threshold (~0.40) and broadcast climax (~0.66).

Broadcast UI (LIVE pill, network ID, timecode, scrolling chyron) fades in 0.42–0.86.

## Hotspots (clickable in-scene markers)

5 hotspots projected from 3D world-space to screen-space each frame:

- **Backstage** (tunnel-only, 0.05–0.42) — opens BACKSTAGE feed
- **World feed** on LED wall — opens WORLD feed
- **Cam 01 / Wide** — opens CAM 01 feed
- **Cam 02 / Tight** — opens CAM 02 feed
- **Crowd** — opens CROWD feed

Clicking opens a fullscreen `FeedViewer` modal with a 5-up cam selector strip at the bottom (live thumbnails, click to switch). Escape or × closes.

## Feed canvases

Each feed has a canvas-painted animation at 768×432 that becomes a `THREE.CanvasTexture`. They are deliberately stylised but read as broadcast feeds:

- **WORLD** — viewfinder framing the talent (head + torso silhouette), crosshairs, REC pulse, timecode
- **BACKSTAGE** — composites real video + CCTV green tint + scanlines + interference line + REC chrome
- **CAM 01 / WIDE** — animated stage with LED ring, moving stage lights, crowd horizon, truss lights
- **CAM 02 / TIGHT** — close-up silhouette with rim light + bokeh out-of-focus background
- **CAM 03 / CROWD** — sea of phone lights with crowd horizon and distant stage glow

When real footage arrives, each `draw*` function becomes a `<video>` element with `THREE.VideoTexture`.

## Real video URLs (placeholder)

Currently using two known-stable CORS-enabled videos with fallback chain:
1. `https://threejs.org/examples/textures/sintel.mp4` (from three.js's own webgl_materials_video example)
2. `https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4` (Mozilla MDN CC0 demo)

These are placeholders. When 1Up sends real footage, swap the URLs in `lib/videoSources.ts`.

## After the 3D — the rest of the page

1. **Roll VT transition** — full-bleed black section with broadcast cue cards: "VT 01 / SDI 04 / Roll VT. The reel · 1UP · 2024 / Duration / Status: ● Standby"
2. **The Reel** — full-bleed video player. Custom controls (play, scrub, mute toggle, fullscreen). Cinematic chrome: corner film-frame markers (red), top-left LIVE/title badge, top-right timecode, broadcast film grain overlay. Autoplays muted on intersection. Currently a canvas-painted placeholder reel (SMPTE colour bars → countdown → 1UP title → 6 animated clip cards → end card). Swap point is clearly marked for real video.
3. **Portfolio grid** — 6 cards in a 3-col tight grid (LEC Finals 2024, LoL Worlds 2023, VCT Champions 2023, Top Gear, A$AP Rocky Coachella, UFC). Cards are gradient-themed by category until real stills arrive.
4. **Dual CTA** — "Commissioning a show?" / "Launching a live event?"
5. **Footer**

## File layout (target)

```
app/
  layout.tsx
  page.tsx                    # imports HeroExperience + sections
  globals.css                 # Tailwind base + CSS vars (--accent, --bg, etc.)
components/
  hero/
    HeroExperience.tsx        # top-level scroll-driven hero (dynamic-imported, ssr:false)
    HeroCanvas.tsx            # the <Canvas> + <Scene>
    Scene.tsx                 # all scene meshes
    SceneOverlays.tsx         # framer-motion text overlays per scroll phase
    BroadcastUI.tsx           # LIVE pill, chyron, timecode, frame markers
    Hotspots.tsx              # 3D-to-screen-projected clickable dots
    scene/
      Tunnel.tsx
      Stage.tsx
      LedWall.tsx
      Truss.tsx
      Crowd.tsx
      BroadcastCameras.tsx
      LightCones.tsx
      TunnelMonitors.tsx      # video texture
      FloorPanels.tsx         # video texture
  reel/
    Reel.tsx                  # the video player section
    ReelCanvas.tsx            # placeholder canvas reel (until real video)
    RollVtTransition.tsx
  portfolio/
    PortfolioGrid.tsx
    PortfolioCard.tsx
    DualCta.tsx
  feeds/
    FeedViewer.tsx            # modal
    feedCanvases/
      drawWorldFeed.ts
      drawBackstageFeed.ts
      drawCam01Wide.ts
      drawCam02Tight.ts
      drawCrowdCam.ts
      shared.ts               # drawViewfinderCorners, drawBroadcastChrome, fmtTC
  ui/
    NavBar.tsx
    SkipButton.tsx
    GrainOverlay.tsx
    ScrollProgress.tsx
content/
  projects.ts                 # 19 portfolio entries with real metadata fields
  scenes.ts                   # the 6 overlay scene definitions (eyebrow, title, sub)
  feeds.ts                    # 5 feed metadata (label, location, draw fn ref)
lib/
  scrollProgress.ts           # useScrollProgress hook
  videoSources.ts             # CORS-safe video URL fallback chain + makeVideoEl
  smoothstep.ts
  formatTC.ts
public/
  fonts/                      # if self-hosting Instrument Serif / JetBrains Mono later
```

## Design tokens

```css
--bg: #08080a;
--bg-2: #0e0e11;
--surface: #131318;
--line: #1d1d23;
--line-2: #2a2a32;
--text: #f4f4f0;
--text-dim: #8b8b94;
--text-faint: #4a4a52;
--accent: #ff2d20;          /* tally red */
--accent-glow: rgba(255, 45, 32, 0.35);
--phosphor: #6affae;        /* CRT phosphor — used very sparingly */
```

Fonts loaded via `next/font/google`:
- Instrument Serif (display, italic)
- JetBrains Mono (broadcast chrome, eyebrows, code)
- Inter Tight (body)

## Hard rules

- **Diagnose before writing code.** Every prompt to Claude Code must start with reading this file + the existing `oneup-multicam.html` reference before touching anything.
- **Single-file source of truth for the scene** is `oneup-multicam.html` in the project root (saved alongside the repo). Don't re-invent geometry — port it.
- **No `display:none` on `<video>` elements** — Safari refuses to play them. Use offscreen positioning instead.
- **Video URLs must be CORS-enabled.** Vimeo direct MP4s are not. Cloudflare Stream / Mux / S3+CloudFront / Vercel Blob all are.
- **Dynamic-import the hero** so the heavy three.js bundle doesn't block initial paint:
  ```tsx
  const HeroExperience = dynamic(() => import('@/components/hero/HeroExperience'), { ssr: false });
  ```
- **No graceful-degradation crutches that change the design.** If WebGL is unsupported, render a static hero image with a "View showreel" link to the reel section. Don't try to fake the 3D in CSS.

## Reference file

`oneup-multicam.html` (next to this file in repo root) — the working vanilla three.js prototype. **Read it first** for any task touching the 3D scene, scroll phases, feed canvases, or scene overlays.

## Scope discipline

This is a **portfolio site**, not an esports product. Don't add:
- User accounts, auth, dashboards
- A CMS yet (hardcode content first; wire CMS only if 1Up asks)
- Analytics beyond Vercel's built-in
- Multi-language
- A blog
