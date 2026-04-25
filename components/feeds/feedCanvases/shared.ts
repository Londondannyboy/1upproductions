import { fmtTC as formatTimecode } from '@/lib/formatTC';

export function makeFeedCanvas(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function drawViewfinderCorners(ctx: CanvasRenderingContext2D, w: number, h: number, color = '#fff') {
  const m = w * 0.025;
  const sz = w * 0.04;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(m, m + sz);
  ctx.lineTo(m, m);
  ctx.lineTo(m + sz, m);
  ctx.moveTo(w - m - sz, m);
  ctx.lineTo(w - m, m);
  ctx.lineTo(w - m, m + sz);
  ctx.moveTo(m, h - m - sz);
  ctx.lineTo(m, h - m);
  ctx.lineTo(m + sz, h - m);
  ctx.moveTo(w - m - sz, h - m);
  ctx.lineTo(w - m, h - m);
  ctx.lineTo(w - m, h - m - sz);
  ctx.stroke();
}

export function drawBroadcastChrome(
  ctx: CanvasRenderingContext2D,
  t: number,
  w: number,
  h: number,
  camLabel: string,
  locLabel: string,
  accent = '#ff2d20'
) {
  const fs = w * 0.022;
  
  // REC indicator (pulsing)
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.6 + Math.sin(t * 4) * 0.4;
  ctx.beginPath();
  ctx.arc(w * 0.07, h * 0.13, fs * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  // REC text
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${fs}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText('REC', w * 0.09, h * 0.14);
  
  // Timecode
  ctx.font = `bold ${fs}px monospace`;
  ctx.textAlign = 'right';
  ctx.fillStyle = accent;
  ctx.fillText(formatTimecode(t), w * 0.95, h * 0.14);
  
  // Bottom bar background
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, h - h * 0.09, w, h * 0.09);
  
  // Bottom bar accent stripe
  ctx.fillStyle = accent;
  ctx.fillRect(0, h - h * 0.09, w * 0.005, h * 0.09);
  
  // Camera label
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${fs * 1.1}px monospace`;
  ctx.textAlign = 'left';
  ctx.fillText(camLabel, w * 0.025, h - h * 0.03);
  
  // Location and network
  ctx.font = `${fs * 0.9}px monospace`;
  ctx.textAlign = 'right';
  ctx.fillStyle = '#aaa';
  ctx.fillText(locLabel + '  ·  1UP NETWORK', w * 0.975, h - h * 0.03);
}