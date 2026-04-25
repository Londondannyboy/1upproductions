import { drawViewfinderCorners, drawBroadcastChrome } from './shared';

export function drawCam02Tight(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
  // Dark background
  ctx.fillStyle = '#0a0a0e';
  ctx.fillRect(0, 0, w, h);
  
  // Bokeh out-of-focus background
  for (let i = 0; i < 18; i++) {
    const bx = ((i * 73 + t * 15) % (w + 80)) - 40;
    const by = h * 0.2 + (i % 5) * h * 0.18;
    const r = 30 + (i % 3) * 20;
    const og = ctx.createRadialGradient(bx, by, 0, bx, by, r);
    
    const col = i % 3 === 0 ? 'rgba(255, 45, 32, 0.4)'
               : i % 3 === 1 ? 'rgba(255, 200, 150, 0.3)'
               : 'rgba(106, 255, 174, 0.25)';
    
    og.addColorStop(0, col);
    og.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = og;
    ctx.fillRect(bx - r, by - r, r * 2, r * 2);
  }
  
  // Rim light
  const rim = ctx.createLinearGradient(0, 0, w, 0);
  rim.addColorStop(0, 'rgba(255, 45, 32, 0.18)');
  rim.addColorStop(0.5, 'rgba(0,0,0,0)');
  rim.addColorStop(1, 'rgba(106, 255, 174, 0.12)');
  ctx.fillStyle = rim;
  ctx.fillRect(0, 0, w, h);
  
  // Big talent close-up silhouette
  const cx = w * 0.5;
  const cy = h * 0.55;
  const breathe = 1 + Math.sin(t * 1.4) * 0.008;
  
  ctx.fillStyle = '#06060a';
  
  // Head (large ellipse for close-up)
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.05, h * 0.22 * breathe, h * 0.26 * breathe, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Body/shoulders (large rectangle)
  ctx.fillRect(cx - h * 0.32 * breathe, cy + h * 0.18, h * 0.64 * breathe, h * 0.5);
  
  // Subtle highlight on face
  ctx.fillStyle = 'rgba(255, 200, 150, 0.15)';
  ctx.beginPath();
  ctx.ellipse(cx + h * 0.12, cy - h * 0.18, h * 0.1, h * 0.12, 0, 0, Math.PI * 2);
  ctx.fill();
  
  drawViewfinderCorners(ctx, w, h);
  drawBroadcastChrome(ctx, t, w, h, 'CAM 02 / TIGHT', 'HANDHELD · STEDICAM');
}