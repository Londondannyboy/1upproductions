import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CROWD_COUNT = 480;
const GLOW_COUNT = 60;

export function Crowd() {
  const crowdRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.Group>(null);
  
  const { crowdData, glowPositions } = useMemo(() => {
    const crowdData: Array<{x: number, y: number, z: number, angle: number}> = [];
    const glowPositions: Array<{x: number, y: number, z: number, color: number}> = [];
    
    for (let i = 0; i < CROWD_COUNT; i++) {
      const tier = Math.floor(i / 120);
      const angle = (i % 120) / 120 * 1.2 * Math.PI - 0.6 * Math.PI;
      const radius = 18 + tier * 3.5 + (Math.random() - 0.5) * 2;
      const x = Math.sin(angle) * radius;
      const z = 8 + Math.cos(angle) * radius;
      const y = 0.55 + tier * 0.55 + 0.8;
      crowdData.push({ x, y, z, angle });
    }
    
    for (let i = 0; i < GLOW_COUNT; i++) {
      const randomCrowd = crowdData[Math.floor(Math.random() * CROWD_COUNT)];
      glowPositions.push({
        x: randomCrowd.x,
        y: randomCrowd.y + 0.4,
        z: randomCrowd.z,
        color: Math.random() > 0.5 ? 0xff2d20 : 0x6affae
      });
    }
    
    return { crowdData, glowPositions };
  }, []);
  
  useFrame(({ clock }) => {
    if (crowdRef.current) {
      const t = clock.getElapsedTime();
      const dummy = new THREE.Object3D();
      
      crowdData.forEach((person, i) => {
        const sway = Math.sin(t * 0.5 + person.angle) * 0.02;
        dummy.position.set(
          person.x + sway,
          person.y,
          person.z
        );
        dummy.rotation.y = person.angle + Math.PI;
        dummy.updateMatrix();
        crowdRef.current!.setMatrixAt(i, dummy.matrix);
      });
      
      crowdRef.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <group>
      {/* Crowd silhouettes */}
      <instancedMesh ref={crowdRef} args={[undefined, undefined, CROWD_COUNT]}>
        <boxGeometry args={[0.28, 1.1, 0.28]} />
        <meshStandardMaterial color={0x1a1a20} roughness={0.95} />
      </instancedMesh>
      
      {/* Glow sticks */}
      <group ref={glowRef}>
        {glowPositions.map((glow, i) => (
          <mesh key={i} position={[glow.x, glow.y, glow.z]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshBasicMaterial 
              color={glow.color}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}