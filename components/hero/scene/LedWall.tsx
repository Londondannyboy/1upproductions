import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function drawLED(ctx: CanvasRenderingContext2D, p: number, t: number, w: number, h: number) {
  ctx.fillStyle = '#050507';
  ctx.fillRect(0, 0, w, h);
  
  if (p < 0.55) {
    // SMPTE color bars
    const bars = ['#c8c800', '#00c8c8', '#00c800', '#c800c8', '#c80000', '#0000c8', '#080808'];
    const bw = w / bars.length;
    bars.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.35 + Math.sin(t * 1.5 + i) * 0.05;
      ctx.fillRect(i * bw, 0, bw, h);
    });
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 56px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('STANDBY', w / 2, h / 2 - 10);
    ctx.font = '24px monospace';
    ctx.fillStyle = '#ff2d20';
    ctx.fillText('● COMMS HOT — ROLL VT', w / 2, h / 2 + 30);
  } else {
    // Viewfinder framing the talent
    ctx.fillStyle = '#070710';
    ctx.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2 + 30;
    const breathe = 1 + Math.sin(t * 1.5) * 0.01;
    ctx.fillStyle = '#0e0e14';
    ctx.beginPath();
    ctx.ellipse(cx, cy - h * 0.18, h * 0.06 * breathe, h * 0.07 * breathe, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(cx - h * 0.09 * breathe, cy - h * 0.08, h * 0.18 * breathe, h * 0.22);
  }
}

export function LedWall({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [canvas] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 384;
    return canvas;
  });
  
  const [texture] = useState(() => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawLED(ctx, scrollProgress, t, canvas.width, canvas.height);
      texture.needsUpdate = true;
    }
  });

  useFrame(() => {
    // Curve the LED wall geometry
    if (meshRef.current && meshRef.current.geometry.attributes.position) {
      const positions = meshRef.current.geometry.attributes.position;
      const vertex = new THREE.Vector3();
      
      for (let i = 0; i < positions.count; i++) {
        vertex.fromBufferAttribute(positions, i);
        // Apply curvature: push vertices back based on X distance from center
        const curvature = 0.08;
        vertex.z -= Math.abs(vertex.x) * curvature;
        positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      
      positions.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <group>
      {/* LED Wall (curved) */}
      <mesh ref={meshRef} position={[0, 5.5, 16]}>
        <planeGeometry args={[22, 8, 48, 8]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* LED Wall Frame */}
      <mesh position={[0, 5.5, 16.4]}>
        <boxGeometry args={[23, 9, 0.3]} />
        <meshStandardMaterial color={0x06060a} metalness={0.9} roughness={0.4} />
      </mesh>
    </group>
  );
}