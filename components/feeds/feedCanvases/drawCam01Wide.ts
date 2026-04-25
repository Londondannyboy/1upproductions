import { drawViewfinderCorners, drawBroadcastChrome } from './shared';

export function drawCam01Wide(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
  // Dark background
  ctx.fillStyle = '#06060a';
  ctx.fillRect(0, 0, w, h);
  
  // Floor gradient
  const fg = ctx.createLinearGradient(0, h * 0.6, 0, h);
  fg.addColorStop(0, '#0a0a14');
  fg.addColorStop(1, '#04040a');
  ctx.fillStyle = fg;
  ctx.fillRect(0, h * 0.6, w, h * 0.4);
  
  // Moving stage lights (red)
  const lx1 = w * 0.3 + Math.sin(t * 0.8) * w * 0.15;
  const g1 = ctx.createRadialGradient(lx1, h * 0.55, 0, lx1, h * 0.55, w * 0.4);
  g1.addColorStop(0, 'rgba(255, 45, 32, 0.55)');
  g1.addColorStop(0.5, 'rgba(255, 45, 32, 0.10)');
  g1.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g1;
  ctx.fillRect(0, 0, w, h);
  
  // Moving stage lights (phosphor)
  const lx2 = w * 0.7 + Math.cos(t * 0.6) * w * 0.15;
  const g2 = ctx.createRadialGradient(lx2, h * 0.55, 0, lx2, h * 0.55, w * 0.4);
  g2.addColorStop(0, 'rgba(106, 255, 174, 0.45)');
  g2.addColorStop(0.5, 'rgba(106, 255, 174, 0.08)');
  g2.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 0, w, h);
  
  // Stage LED ring
  ctx.strokeStyle = 'rgba(255, 45, 32, 0.8)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(w / 2, h * 0.7, w * 0.32, h * 0.06, 0, 0, Math.PI * 2);
  ctx.stroke();
  
  // Talent on stage
  const cx = w / 2;
  const cy = h * 0.58;
  ctx.fillStyle = '#08080a';
  
  // Head
  ctx.beginPath();
  ctx.ellipse(cx, cy - h * 0.04, h * 0.025, h * 0.03, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Body
  ctx.fillRect(cx - h * 0.04, cy - h * 0.005, h * 0.08, h * 0.14);
  
  // Crowd silhouettes at bottom
  ctx.fillStyle = '#06060a';
  for (let i = 0; i < 32; i++) {
    const cxi = (i / 32) * w + ((i * 7919) % 4);
    const sz = 12 + (i % 3) * 4;
    ctx.fillRect(cxi - sz / 2, h - sz - 8, sz, sz);
    ctx.beginPath();
    ctx.arc(cxi, h - sz - 8, sz / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Truss lights
  for (let i = 0; i < 8; i++) {
    const tx = ((i + 0.5) / 8) * w;
    const f = 0.6 + Math.sin(t * 4 + i) * 0.4;
    ctx.fillStyle = `rgba(255, 200, 150, ${f * 0.5})`;
    ctx.fillRect(tx - 4, 28, 8, 18);
  }
  
  drawViewfinderCorners(ctx, w, h);
  drawBroadcastChrome(ctx, t, w, h, 'CAM 01 / WIDE', 'OB POSITION 7 · JIB');
}