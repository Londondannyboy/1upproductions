import { drawViewfinderCorners, drawBroadcastChrome } from './shared';

export function drawCrowdCam(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
  // Dark background
  ctx.fillStyle = '#04040a';
  ctx.fillRect(0, 0, w, h);
  
  // Distant stage glow
  const sg = ctx.createRadialGradient(w / 2, 0, 0, w / 2, 0, w * 0.45);
  sg.addColorStop(0, 'rgba(255, 45, 32, 0.45)');
  sg.addColorStop(0.5, 'rgba(255, 45, 32, 0.08)');
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = sg;
  ctx.fillRect(0, 0, w, h * 0.6);
  
  // Phone lights (sea of mobile screens)
  for (let i = 0; i < 240; i++) {
    const seed = i * 7919;
    const lx = seed % w;
    const ly = h * 0.25 + ((seed * 13) % (h * 0.65 | 0));
    const sp = 0.5 + ((seed % 100) / 100);
    const f = 0.4 + Math.sin(t * sp + i) * 0.45;
    
    if (f > 0.3) {
      const r = 2 + (i % 4);
      
      // Bright phone screen
      ctx.fillStyle = `rgba(255, 250, 220, ${f * 0.9})`;
      ctx.beginPath();
      ctx.arc(lx, ly, r, 0, Math.PI * 2);
      ctx.fill();
      
      // Phone screen glow
      ctx.fillStyle = `rgba(255, 250, 220, ${f * 0.18})`;
      ctx.beginPath();
      ctx.arc(lx, ly, r * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Crowd horizon (silhouettes)
  ctx.fillStyle = '#020204';
  for (let x = 0; x < w; x += 8) {
    const headH = h * 0.8 + ((x * 13) % 6);
    
    // Head
    ctx.beginPath();
    ctx.arc(x + 4, headH, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Body/shoulders
    ctx.fillRect(x, headH, 8, h - headH);
  }
  
  drawViewfinderCorners(ctx, w, h);
  drawBroadcastChrome(ctx, t, w, h, 'CAM 03 / CROWD', 'FOH · FRONT-OF-HOUSE');
}