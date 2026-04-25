import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { Scene } from './Scene';
import { useScrollProgress } from '@/lib/scrollProgress';
import { smoothstep } from '@/lib/smoothstep';

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgress;
    
    let posZ: number, posY: number, lookZ: number, lookY: number, lookX = 0;
    const bob = Math.sin(t * 4.5) * 0.05;

    // Camera path based on scroll progress (7 phases including stadium)
    if (p < 0.32) {
      // Phase 1: Tunnel walk (0-32%)
      const s = p / 0.32;
      posZ = THREE.MathUtils.lerp(-45, -8, s);
      posY = 1.7 + bob;
      lookZ = posZ + 12;
      lookY = 1.7;
    } else if (p < 0.45) {
      // Phase 2: Threshold (32-45%)
      const s = (p - 0.32) / 0.13;
      posZ = THREE.MathUtils.lerp(-8, -2, s);
      posY = 1.7 + bob * (1 - s);
      lookZ = posZ + 12;
      lookY = THREE.MathUtils.lerp(1.7, 3.2, s);
    } else if (p < 0.65) {
      // Phase 3: Walking onto stage (45-65%)
      const s = (p - 0.45) / 0.20;
      posZ = THREE.MathUtils.lerp(-2, 7.5, s);
      posY = THREE.MathUtils.lerp(1.7, 2.3, s);
      lookZ = THREE.MathUtils.lerp(10, 16, s);
      lookY = THREE.MathUtils.lerp(3.2, 5.5, s);
    } else if (p < 0.75) {
      // Phase 4: On stage / broadcast (65-75%)
      posZ = 7.8 + Math.sin(t * 0.6) * 0.15;
      posY = 2.3 + Math.sin(t * 0.4) * 0.05;
      lookZ = 16;
      lookY = 5.8;
      lookX = Math.sin(t * 0.5) * 0.5;
    } else if (p < 0.95) {
      // Phase 5: Stadium exploration (75-95%) - immersive esports stadium experience
      const s = (p - 0.75) / 0.20;
      const angle = s * Math.PI * 0.8 - Math.PI * 0.4; // Sweep around stadium
      const radius = 20;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius + 25;
      
      camera.position.set(x, 10 + Math.sin(s * Math.PI * 2) * 2, z);
      
      // Look at different video screens as we move
      const targetScreens = [
        [-18, 12, 25], // Left main screen
        [0, 15, 35],   // Center main screen
        [18, 12, 25],  // Right main screen
      ];
      const screenIndex = Math.floor(s * targetScreens.length) % targetScreens.length;
      const targetScreen = targetScreens[screenIndex];
      
      camera.lookAt(targetScreen[0], targetScreen[1], targetScreen[2]);
      return null; // Skip the normal camera positioning below
    } else {
      // Phase 7: Final pullback (95-100%)
      const s = (p - 0.95) / 0.05;
      posZ = THREE.MathUtils.lerp(15, 5, s);
      posY = THREE.MathUtils.lerp(8, 12, s);
      lookZ = THREE.MathUtils.lerp(25, 20, s);
      lookY = THREE.MathUtils.lerp(6, 8, s);
    }

    // Apply camera position with subtle breathing motion
    camera.position.set(
      0 + Math.sin(t * 1.2) * 0.04,
      posY,
      posZ
    );
    
    camera.lookAt(lookX, lookY, lookZ);
  });

  return null;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed inset-0 z-0 bg-black transition-opacity duration-700 ease-out">
      <Canvas
        ref={canvasRef}
        camera={{
          fov: 72,
          near: 0.1,
          far: 200,
          position: [0, 1.7, -45]
        }}
        gl={{
          antialias: true,
          alpha: false,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05
        }}
        dpr={Math.min(window.devicePixelRatio || 1, 2)}
        className="block w-full h-full"
      >
        <CameraController scrollProgress={scrollProgress} />
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}