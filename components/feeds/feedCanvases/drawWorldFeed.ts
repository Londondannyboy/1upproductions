import { drawViewfinderCorners, drawBroadcastChrome } from './shared';

export function drawWorldFeed(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
  // Dark background with red gradient
  ctx.fillStyle = '#070710';
  ctx.fillRect(0, 0, w, h);
  
  const grad = ctx.createRadialGradient(w * 0.5, h * 0.55, 50, w * 0.5, h * 0.55, w * 0.6);
  grad.addColorStop(0, 'rgba(255, 45, 32, 0.25)');
  grad.addColorStop(0.5, 'rgba(255, 45, 32, 0.05)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  
  const cx = w / 2;
  const cy = h * 0.65;
  const breathe = 1 + Math.sin(t * 1.5) * 0.01;
  
  // Talent silhouette (head + torso)
  ctx.fillStyle = '#0e0e14';
  
  // Head (ellipse)
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.18, h * 0.06 * breathe, h * 0.07 * breathe, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Torso (rectangle)
  ctx.fillRect(cx - h * 0.09 * breathe, cy - h * 0.08, h * 0.18 * breathe, h * 0.22);
  
  // Crosshair targeting
  ctx.strokeStyle = 'rgba(255, 45, 32, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  // Horizontal crosshair lines
  ctx.moveTo(cx - 60, cy - h * 0.18);
  ctx.lineTo(cx - 24, cy - h * 0.18);
  ctx.moveTo(cx + 24, cy - h * 0.18);
  ctx.lineTo(cx + 60, cy - h * 0.18);
  
  // Vertical crosshair lines
  ctx.moveTo(cx, cy - h * 0.18 - 36);
  ctx.lineTo(cx, cy - h * 0.18 - 12);
  ctx.moveTo(cx, cy - h * 0.18 + 12);
  ctx.lineTo(cx, cy - h * 0.18 + 36);
  
  ctx.stroke();
  
  // Viewfinder corners and broadcast chrome
  drawViewfinderCorners(ctx, w, h);
  drawBroadcastChrome(ctx, t, w, h, 'WORLD FEED', 'CAM 04 · OB 7');
}