import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function drawStageFloor(ctx: CanvasRenderingContext2D, t: number, w: number, h: number) {
  ctx.fillStyle = '#06060a';
  ctx.fillRect(0, 0, w, h);
  
  const pulse = 0.5 + Math.sin(t * 2) * 0.2;
  const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.5);
  grad.addColorStop(0, `rgba(255, 45, 32, ${pulse * 0.55})`);
  grad.addColorStop(0.5, `rgba(255, 45, 32, ${pulse * 0.15})`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  
  // 1UP brand text
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 200px sans-serif';
  ctx.fillText('1', w / 2 - 50, h / 2 + 10);
  ctx.font = 'italic 200px serif';
  ctx.fillText('UP', w / 2 + 60, h / 2 + 10);
}

export function Stage() {
  const groupRef = useRef<THREE.Group>(null);
  const stageEdgeRef = useRef<THREE.Mesh>(null);
  
  // Stage floor LED texture
  const [canvas] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    return canvas;
  });
  
  const [texture] = useState(() => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Update stage floor animation
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawStageFloor(ctx, t, canvas.width, canvas.height);
      texture.needsUpdate = true;
    }
    
    // Animate stage edge color
    if (stageEdgeRef.current) {
      const material = stageEdgeRef.current.material as THREE.MeshBasicMaterial;
      const hue = 0; // Red
      const saturation = 0.9;
      const lightness = 0.35 + Math.sin(t * 6) * 0.15;
      material.color.setHSL(hue, saturation, lightness);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Arena floor */}
      <mesh position={[0, 0, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial 
          color={0x07070a} 
          roughness={0.4} 
          metalness={0.6} 
        />
      </mesh>

      {/* Stage platform */}
      <mesh position={[0, 0.3, 8]}>
        <cylinderGeometry args={[4.5, 4.8, 0.6, 48]} />
        <meshStandardMaterial 
          color={0x18181c} 
          roughness={0.4} 
          metalness={0.4} 
        />
      </mesh>

      {/* Stage LED edge ring */}
      <mesh 
        ref={stageEdgeRef}
        position={[0, 0.6, 8]} 
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[4.5, 0.05, 6, 64]} />
        <meshBasicMaterial color={0xff2d20} />
      </mesh>

      {/* Stage floor LED (1UP brand) */}
      <mesh position={[0, 0.61, 8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.3, 48]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          opacity={0.85} 
        />
      </mesh>
    </group>
  );
}