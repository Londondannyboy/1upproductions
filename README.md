# 1UP Productions — Enhanced Esports Portfolio Site

A redesigned portfolio site for **1Up Productions** featuring an immersive scroll-driven 3D experience that showcases their esports broadcast production capabilities.

## 🎯 Enhanced Features

### Enhanced Esports Stadium Environment
- **Stadium Architecture**: Complete 3D esports stadium with tiered seating (8 tiers, 24 seats per tier)
- **Video Integration**: 8 different video sources showcasing 1UP's esports production work
- **Interactive Elements**: Clickable hotspots throughout the stadium for exploring production footage
- **Extended Experience**: 7-phase camera journey including stadium exploration (700vh scroll track)

### "Three Two One UP" Experience
- **Branded Countdown**: Enhanced countdown sequence ending with the "UP" finale
- **Dynamic Camera Path**: Seamless transition from tunnel walk to stadium exploration
- **Video Showcase**: Multiple screens displaying LEC Finals, LoL Worlds, VCT Champions footage

### Video System
- **Multiple Sources**: 8 video categories including esports events, competition filming, crowd dynamics
- **CORS-Safe Fallbacks**: Robust video loading system with multiple fallback URLs
- **Stadium Integration**: Videos displayed on screens positioned throughout the stadium environment

## 🏗️ Architecture

### Core Components
- `EsportsStadium.tsx` - 3D stadium environment with video screens and seating
- `StadiumHotspots.tsx` - Interactive elements for exploring production footage
- Enhanced `SceneOverlays.tsx` - "3-2-1-UP" countdown sequence
- Extended `HeroCanvas.tsx` - 7-phase camera path including stadium exploration

### Video Sources
```typescript
VIDEO_SOURCES = {
  esports1-4: // LEC Finals, LoL Worlds, VCT Champions, etc.
  competition1-2: // Close-up filming views
  mainstage: // Full-scale broadcast production
  crowdfilming: // Audience dynamics capture
}
```

### Camera Phases
1. **Tunnel Walk** (0-32%) - Through backstage corridor
2. **Threshold** (32-45%) - Approaching the stage
3. **Stage Entry** (45-65%) - Walking onto the main stage
4. **Broadcast Moment** (65-78%) - Live worldwide transmission
5. **Stadium Transition** (78-85%) - Moving toward stadium view
6. **Stadium Exploration** (85-95%) - Sweeping around esports venue
7. **Final Pullback** (95-100%) - Concluding the experience

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000 (or next available port)
```

## 🎮 Experience Navigation

1. **Scroll** to progress through the 3D experience
2. **Stadium Phase** (85-95% scroll) - Camera sweeps around stadium focusing on video screens
3. **Interactive Hotspots** - Click on glowing markers to explore production footage
4. **Video Integration** - Multiple screens show 1UP's esports broadcast work

## 📁 Project Structure

```
components/
  hero/
    scene/
      EsportsStadium.tsx     # Stadium environment
      BroadcastCameras.tsx   # Camera tracking system
      LedWall.tsx           # Main display screen
      [other scene components]
    StadiumHotspots.tsx      # Interactive elements
    SceneOverlays.tsx        # "3-2-1-UP" sequence
    HeroCanvas.tsx           # Extended camera path
lib/
  videoSources.ts            # 8 video source categories
  scrollProgress.ts          # Extended scroll tracking (700vh)
```

## 🎥 Video Implementation

Currently using placeholder videos with CORS-safe fallbacks. Ready for integration with real 1UP Productions footage:

- **Esports Events**: LEC Finals, LoL Worlds, VCT Champions
- **Production Footage**: Behind-the-scenes filming
- **Competition Coverage**: Close-up team communications
- **Crowd Dynamics**: Audience engagement capture

## 🎨 Design Tokens

- **Primary**: Tally red (`#ff2d20`) for broadcast elements
- **Secondary**: Phosphor green (`#6affae`) for stadium accents
- **Typography**: Instrument Serif (italic), JetBrains Mono, Inter Tight
- **Theme**: Ultra-dark with cinematic lighting

## 🔧 Technical Features

- **Next.js 15** App Router with TypeScript
- **react-three-fiber** for 3D scene management
- **Framer Motion** for scroll-driven animations
- **Dynamic Imports** for SSR handling
- **Responsive Design** with mobile optimization

## 📺 Broadcast Production Showcase

The experience demonstrates 1UP Productions' capabilities in:
- **Multi-camera setups** with tracking systems
- **Live broadcast production** for global audiences
- **Esports event coverage** including major tournaments
- **Technical excellence** in competitive gaming broadcasts

---

Built with ❤️ for 1UP Productions' esports broadcast portfolio