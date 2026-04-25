import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Truss() {
  const lampRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lampRefs.current.forEach((lamp, i) => {
      if (lamp) {
        const f = 0.6 + Math.sin(t * 4 + i) * 0.4;
        const material = lamp.material as THREE.MeshBasicMaterial;
        material.color.setRGB(f, f * 0.8, f * 0.6); // Warm light color
      }
    });
  });

  return (
    <group>
      {/* Main truss beam */}
      <mesh position={[0, 12, 10]}>
        <boxGeometry args={[20, 0.4, 0.4]} />
        <meshStandardMaterial color={0x141418} metalness={0.8} roughness={0.5} />
      </mesh>

      {/* Lamps */}
      {Array.from({ length: 5 }, (_, i) => {
        const x = (i - 2) * 4; // -8, -4, 0, 4, 8
        return (
          <group key={i}>
            {/* Lamp housing */}
            <mesh position={[x, 11.5, 10]}>
              <cylinderGeometry args={[0.3, 0.4, 0.6, 12]} />
              <meshStandardMaterial color={0x06060a} metalness={0.7} />
            </mesh>

            {/* Bulb */}
            <mesh 
              ref={(ref) => (lampRefs.current[i] = ref)}
              position={[x, 11.2, 10]}
            >
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial color={i < 2 ? 0xff2d20 : 0x6affae} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}