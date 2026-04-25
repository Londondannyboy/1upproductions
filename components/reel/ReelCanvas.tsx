'use client';
import { useEffect, useRef } from 'react';

export function ReelCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Simple placeholder animation
    let animationFrame: number;
    let startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      
      // Clear canvas
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, W, H);

      // SMPTE color bars
      if (elapsed < 3) {
        const bars = ['#c8c800', '#00c8c8', '#00c800', '#c800c8', '#c80000', '#0000c8', '#080808'];
        const barWidth = W / bars.length;
        
        bars.forEach((color, i) => {
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.35 + Math.sin(elapsed * 1.5 + i) * 0.05;
          ctx.fillRect(i * barWidth, 0, barWidth, H);
        });
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 56px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('1UP REEL', W/2, H/2 - 20);
        ctx.font = '24px monospace';
        ctx.fillStyle = '#ff2d20';
        ctx.fillText('● PLACEHOLDER ● COMING SOON', W/2, H/2 + 40);
      } else {
        // Show project title
        ctx.fillStyle = '#ff2d20';
        ctx.font = 'bold 72px serif';
        ctx.textAlign = 'center';
        ctx.fillText('THE REEL', W/2, H/2);
        ctx.fillStyle = '#8b8b94';
        ctx.font = '24px monospace';
        ctx.fillText('1UP PRODUCTIONS · ESPORTS · BROADCAST', W/2, H/2 + 60);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate(performance.now());

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      className="w-full h-full object-cover"
      aria-label="1UP showreel placeholder"
    />
  );
}