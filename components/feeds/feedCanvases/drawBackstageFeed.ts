import { drawViewfinderCorners, drawBroadcastChrome } from './shared';

export function drawBackstageFeed(
  ctx: CanvasRenderingContext2D, 
  t: number, 
  w: number, 
  h: number, 
  backstageVideo?: HTMLVideoElement
) {
  // 1. Draw the real video frame as the base layer (if loaded)
  if (backstageVideo && backstageVideo.readyState >= 2 && backstageVideo.videoWidth > 0) {
    // Cover-fit the video into the canvas
    const vAspect = backstageVideo.videoWidth / backstageVideo.videoHeight;
    const cAspect = w / h;
    let sx: number, sy: number, sw: number, sh: number;
    
    if (vAspect > cAspect) {
      // Video wider than canvas — crop sides
      sh = backstageVideo.videoHeight;
      sw = sh * cAspect;
      sx = (backstageVideo.videoWidth - sw) / 2;
      sy = 0;
    } else {
      sw = backstageVideo.videoWidth;
      sh = sw / cAspect;
      sx = 0;
      sy = (backstageVideo.videoHeight - sh) / 2;
    }
    
    try {
      ctx.drawImage(backstageVideo, sx, sy, sw, sh, 0, 0, w, h);
    } catch (e) {
      // CORS taint fallback
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, w, h);
    }
  } else {
    // Video not yet ready — dark fallback while it buffers
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, w, h);
    
    // Faint loading indicator
    ctx.fillStyle = 'rgba(136, 200, 168, 0.5)';
    ctx.font = '20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('● BUFFERING FEED…', w / 2, h / 2);
  }
  
  // 2. Desaturate + green CCTV tint
  ctx.fillStyle = 'rgba(20, 60, 50, 0.3)';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, w, h);
  
  // 3. Horizontal scanlines (heavy)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  for (let y = 0; y < h; y += 3) {
    ctx.fillRect(0, y, w, 1);
  }
  
  // 4. Rolling interference bar
  const intY = (t * 120) % h;
  ctx.fillStyle = 'rgba(160, 220, 200, 0.14)';
  ctx.fillRect(0, intY, w, 3);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(0, intY - 1, w, 1);
  
  // 5. Broadcast chrome (REC / TC / corners / bottom bar)
  drawViewfinderCorners(ctx, w, h, '#88c8a8');
  drawBroadcastChrome(ctx, t, w, h, 'BACKSTAGE', 'CAM 12 · LIVE · GREEN ROOM', '#88c8a8');
}