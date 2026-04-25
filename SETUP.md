# Setting up the 1UP Productions project locally

Three files in this bundle:

- `oneup-multicam.html` — the working vanilla three.js prototype. The source of truth.
- `CLAUDE.md` — persistent project context. Sits in repo root so Claude Code reads it on every session.
- `CLAUDE_CODE_PROMPT.md` — the scaffolding brief. You paste this into Claude Code as your first message.

## On your local machine

```bash
# 1. Make a project folder wherever you keep your work
mkdir -p ~/projects/oneup-productions
cd ~/projects/oneup-productions

# 2. Drop the three files I gave you into this folder
#    (oneup-multicam.html, CLAUDE.md, CLAUDE_CODE_PROMPT.md)

# 3. Initialise git
git init
git add .
git commit -m "initial: prototype + claude context"

# 4. Open Claude Code in this folder
claude
```

## In Claude Code

Once Claude Code is running in the folder:

1. Open `CLAUDE_CODE_PROMPT.md` and copy its entire contents.
2. Paste as your first prompt to Claude Code.
3. It will read `CLAUDE.md` and `oneup-multicam.html`, confirm what it sees, and wait for go-ahead before scaffolding.

After scaffolding, work through the port one component at a time using the order in Step 5 of the prompt. Type `/clear` between major phases if the context gets long.

## When real assets arrive from 1Up

Three swap points, all clearly commented in the code:

- **Hero scene videos** (tunnel monitors + floor panels) — edit `lib/videoSources.ts`. The two URL fallback lists at the top.
- **Showreel** — edit the `<video>` element in `components/reel/Reel.tsx`. Currently runs a canvas placeholder.
- **Portfolio thumbnails** — edit `content/projects.ts`. Each entry has a `thumbnail` field that's currently a gradient string but will become an image path.

## Optional: GitHub + Vercel

```bash
gh repo create dan-keegan/oneup-productions --private --source=. --remote=origin --push
vercel link
vercel --prod
```

That gets you a live preview URL inside about 90 seconds of pushing. Subsequent pushes auto-deploy.
