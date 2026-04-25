import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothstep } from '@/lib/smoothstep';

interface LightConeProps {
  color: number;
  from: [number, number, number];
  to: [number, number, number];
  opacity?: number;
}

function LightCone({ color, from, to, opacity = 0.07 }: LightConeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [fx, fy, fz] = from;
  const [tx, ty, tz] = to;
  const dir = new THREE.Vector3(tx - fx, ty - fy, tz - fz);
  const len = dir.length();
  
  return (
    <mesh ref={meshRef} position={from}>
      <coneGeometry args={[2.2, len, 28, 1, true]} />
      <meshBasicMaterial 
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export function LightCones({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      const stageIntensity = smoothstep(0.45, 0.75, scrollProgress);
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = (i < 2 ? 0.08 : 0.05) * stageIntensity;
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      <LightCone color={0xff2d20} from={[-8, 11.2, 10]} to={[-2, 1, 8]} />
      <LightCone color={0x6affae} from={[8, 11.2, 10]} to={[2, 1, 8]} />
      <LightCone color={0xffc080} from={[0, 11.2, 10]} to={[0, 1, 8]} />
    </group>
  );
}