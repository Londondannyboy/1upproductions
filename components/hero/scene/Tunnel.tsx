import { useRef } from 'react';
import * as THREE from 'three';

export function Tunnel() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      {/* Main tunnel walls (inverted box) */}
      <mesh position={[0, 2.25, -28]}>
        <boxGeometry args={[7, 4.5, 56]} />
        <meshStandardMaterial 
          color={0x141418} 
          roughness={0.95} 
          side={THREE.BackSide} 
        />
      </mesh>

      {/* Tunnel floor */}
      <mesh position={[0, 0.001, -28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 56]} />
        <meshStandardMaterial 
          color={0x0c0c10} 
          roughness={0.6} 
          metalness={0.3} 
        />
      </mesh>

      {/* Ceiling light strips */}
      {Array.from({ length: Math.floor((52 - 4) / 3) + 1 }, (_, i) => {
        const z = -52 + i * 3;
        return (
          <group key={`strip-${i}`}>
            {/* Light strip */}
            <mesh position={[0, 4.45, z]}>
              <boxGeometry args={[2.4, 0.05, 0.25]} />
              <meshBasicMaterial color={0xfffaf0} />
            </mesh>

            {/* Light strip glow */}
            <mesh position={[0, 4.25, z]} rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[2.6, 0.4]} />
              <meshBasicMaterial 
                color={0xfff0e0} 
                transparent 
                opacity={0.18} 
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </group>
        );
      })}

      {/* Red cable accents on walls */}
      {Array.from({ length: Math.floor((52 - 4) / 1.5) + 1 }, (_, i) => {
        const z = -52 + i * 1.5;
        return (
          <group key={`cables-${i}`}>
            {/* Left wall cable */}
            <mesh position={[-3.49, 1.2, z]}>
              <boxGeometry args={[0.04, 0.04, 0.8]} />
              <meshBasicMaterial color={0xff2d20} />
            </mesh>

            {/* Right wall cable */}
            <mesh position={[3.49, 1.2, z]}>
              <boxGeometry args={[0.04, 0.04, 0.8]} />
              <meshBasicMaterial color={0xff2d20} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}