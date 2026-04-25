'use client';
import { motion } from 'framer-motion';
import { smoothstep } from '@/lib/smoothstep';

interface SceneOverlayData {
  eyebrow: string;
  title: string;
  sub?: string;
  start: number;
  end: number;
}

const scenes: SceneOverlayData[] = [
  {
    eyebrow: 'Scene 01 - Backstage',
    title: 'In three.',
    sub: 'Standby - comms hot - talent walking.',
    start: 0.00,
    end: 0.06
  },
  {
    eyebrow: '',
    title: '3',
    start: 0.06,
    end: 0.10
  },
  {
    eyebrow: '',
    title: '2',
    start: 0.10,
    end: 0.14
  },
  {
    eyebrow: '',
    title: '1',
    start: 0.14,
    end: 0.18
  },
  {
    eyebrow: '',
    title: 'UP',
    start: 0.18,
    end: 0.22
  },
  {
    eyebrow: 'Scene 02 - Threshold',
    title: 'Stage right.\nEyes up.',
    start: 0.22,
    end: 0.36
  },
  {
    eyebrow: 'Scene 03 - On stage',
    title: 'And we are live.',
    sub: 'Cameras tracking - Tally hot - Vision-mixer cut',
    start: 0.42,
    end: 0.60
  },
  {
    eyebrow: 'Scene 04 - Going out',
    title: 'Worldwide.\nIn one take.',
    start: 0.66,
    end: 0.76
  },
  {
    eyebrow: 'Scene 05 - Behind the scenes',
    title: '1UP Productions.\nCapturing esports.',
    sub: 'LEC Finals - LoL Worlds - VCT Champions',
    start: 0.82,
    end: 0.92
  },
  {
    eyebrow: 'Scene 06 - The craft',
    title: 'From comms\nto competition.',
    sub: 'Every angle - Every moment - Every story',
    start: 0.86,
    end: 0.94
  },
  {
    eyebrow: 'Scene 07 - Roll VT',
    title: 'Now playing\nthe reel.',
    sub: 'Scroll on - VT inbound',
    start: 0.96,
    end: 0.99
  }
];

function SceneOverlay({ scene, scrollProgress }: { scene: SceneOverlayData; scrollProgress: number }) {
  const opacity = smoothstep(scene.start, scene.start + 0.04, scrollProgress) - 
                 smoothstep(scene.end - 0.04, scene.end, scrollProgress);
  const isVisible = opacity > 0.1;
  
  if (!isVisible) return null;
  
  const isCountdown = ['3', '2', '1'].includes(scene.title);
  const isUp = scene.title === 'UP';
  
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: Math.max(0, Math.min(1, opacity)) }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="text-center px-8">
        {isCountdown ? (
          <div className="font-sans font-extrabold text-[clamp(180px,26vw,420px)] leading-[0.85] text-text">
            {scene.title}
          </div>
        ) : isUp ? (
          <div className="font-serif italic font-extrabold text-[clamp(180px,26vw,420px)] leading-[0.85] text-accent">
            UP
          </div>
        ) : (
          <>
            {scene.eyebrow && (
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim mb-6 flex items-center justify-center gap-4">
                <div className="w-8 h-px bg-accent" />
                <span>{scene.eyebrow}</span>
              </div>
            )}
            
            <h1 className="font-serif text-[clamp(56px,9vw,144px)] leading-[0.95] tracking-[-0.025em] whitespace-pre-line">
              {scene.title.split('\n').map((line, i) => (
                <div key={i}>
                  {line.split(/\b(\w+\.)\b/).map((part, j) => {
                    if (part.includes('.') && part.length < 10) {
                      return <em key={j} className="text-accent italic">{part}</em>;
                    }
                    if (part === 'Worldwide' || part === 'live') {
                      return <em key={j} className="text-accent italic">{part}</em>;
                    }
                    if (part === 'In one take' || part === 'Eyes up') {
                      return <span key={j} className="text-text-dim italic">{part}</span>;
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </div>
              ))}
            </h1>
            
            {scene.sub && (
              <div className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-text-dim">
                {scene.sub}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export function SceneOverlays({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      {scenes.map((scene, i) => (
        <SceneOverlay key={i} scene={scene} scrollProgress={scrollProgress} />
      ))}
    </>
  );
}