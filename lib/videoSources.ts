export const VIDEO_SOURCES = {
  // ▼ ▼ ▼  SWAP THESE FOR YOUR REAL FOOTAGE  ▼ ▼ ▼
  // Each entry is an ORDERED FALLBACK LIST — the video element tries
  // them in turn until one plays successfully.
  backstage: [
    'https://threejs.org/examples/textures/sintel.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ],
  floor: [
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  
  // Arena video content - varied sources for collage effect
  arena_main: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  arena_side: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ],
  arena_upper: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  
  // Esports stadium seating videos - 1UP filming competitions
  esports1: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  esports2: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ],
  esports3: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  esports4: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ],
  
  // Competition footage - close-up filming views
  competition1: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  competition2: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ],
  
  // Main stage footage - broadcast production
  mainstage: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://threejs.org/examples/textures/sintel.mp4',
  ],
  
  // Crowd filming footage
  crowdfilming: [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  ],
};

export function makeVideoEl(urlList: string[] | string): HTMLVideoElement {
  const v = document.createElement('video');
  v.crossOrigin = 'anonymous';
  v.loop = true;
  v.muted = true;
  v.playsInline = true;
  v.setAttribute('playsinline', '');
  v.setAttribute('webkit-playsinline', '');
  v.autoplay = true;
  v.preload = 'auto';
  
  // Offscreen, but NOT display:none (Safari refuses to play undisplayed videos)
  v.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:4px;height:4px;opacity:0;pointer-events:none;z-index:-1;';
  document.body.appendChild(v);
  
  const urls = Array.isArray(urlList) ? urlList.slice() : [urlList];
  let tried = 0;
  
  const tryNext = () => {
    if (tried >= urls.length) {
      console.warn('[1UP] all video sources failed — monitors will show canvas fallback');
      return;
    }
    const url = urls[tried++];
    console.log('[1UP] loading video (attempt ' + tried + '):', url.split('/').pop());
    v.src = url;
    v.load();
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        setTimeout(tryNext, 500);
      });
    }
  };
  
  v.addEventListener('canplaythrough', () => {
    console.log('[1UP] video ready:', v.src.split('/').pop());
  }, { once: true });
  
  v.addEventListener('error', () => {
    console.warn('[1UP] video error:', v.src.split('/').pop());
    setTimeout(tryNext, 500);
  });
  
  // Enhanced user gesture detection for autoplay - more aggressive for mobile
  let gestureDetected = false;
  const onGesture = () => {
    if (gestureDetected) return;
    gestureDetected = true;
    
    if (v.paused) {
      v.play()?.catch(() => {
        console.warn('[1UP] video play failed after gesture:', v.src.split('/').pop());
      });
    }
    
    document.removeEventListener('click', onGesture);
    document.removeEventListener('scroll', onGesture);
    document.removeEventListener('touchstart', onGesture);
    document.removeEventListener('keydown', onGesture);
  };
  
  document.addEventListener('click', onGesture, { passive: true });
  document.addEventListener('scroll', onGesture, { passive: true });
  document.addEventListener('touchstart', onGesture, { passive: true });
  document.addEventListener('keydown', onGesture, { passive: true });
  
  tryNext();
  return v;
}