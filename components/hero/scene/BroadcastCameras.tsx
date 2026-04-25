import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { smoothstep } from '@/lib/smoothstep';

function BroadcastCam({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const tallyRef = useRef<THREE.Mesh>(null);
  
  return (
    <group ref={groupRef} position={position}>
      {/* Tripod */}
      <mesh position={[0, -position[1] / 2, 0]}>
        <cylinderGeometry args={[0.05, 0.08, position[1], 8]} />
        <meshStandardMaterial color={0x202024} metalness={0.7} />
      </mesh>
      
      {/* Camera body */}
      <mesh>
        <boxGeometry args={[0.65, 0.42, 0.85]} />
        <meshStandardMaterial color={0x07070a} metalness={0.55} roughness={0.4} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.5]} />
        <meshStandardMaterial color={0x0a0a0c} metalness={0.7} />
      </mesh>
      
      {/* Lens */}
      <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.24, 0.55, 20]} />
        <meshStandardMaterial color={0x0a0a0c} metalness={0.85} roughness={0.3} />
      </mesh>
      
      {/* Lens glass */}
      <mesh position={[0, 0, 0.93]}>
        <circleGeometry args={[0.18, 20]} />
        <meshBasicMaterial color={0x152025} />
      </mesh>
      
      {/* Tally light */}
      <mesh ref={tallyRef} position={[0, 0.28, 0.4]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshBasicMaterial color={0xff2d20} />
      </mesh>
    </group>
  );
}

export function BroadcastCameras({ scrollProgress, cameraPosition }: { 
  scrollProgress: number;
  cameraPosition: THREE.Vector3;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraPositions: Array<[number, number, number]> = [
    [-7.5, 1.7, 4],
    [7.5, 1.7, 4],
    [-9, 3.2, 12],
    [9, 3.2, 12]
  ];
  
  useFrame(() => {
    if (groupRef.current) {
      const swing = smoothstep(0.45, 0.62, scrollProgress);
      const target = new THREE.Vector3(cameraPosition.x, 1.9, cameraPosition.z);
      
      groupRef.current.children.forEach((cam, i) => {
        const group = cam as THREE.Group;
        const currentRot = group.rotation.y;
        const targetRot = Math.atan2(target.x - cameraPositions[i][0], target.z - cameraPositions[i][2]);
        group.rotation.y = THREE.MathUtils.lerp(currentRot, targetRot, swing * 0.02);
        
        // Tally light intensity
        const tally = group.children.find(child => 
          (child as THREE.Mesh).geometry?.type === 'SphereGeometry' &&
          child.position.y > 0.2
        ) as THREE.Mesh;
        
        if (tally) {
          const material = tally.material as THREE.MeshBasicMaterial;
          const intensity = 0.3 + swing * 0.7;
          material.opacity = intensity;
        }
      });
    }
  });
  
  return (
    <group ref={groupRef}>
      {cameraPositions.map((pos, i) => (
        <BroadcastCam key={i} position={pos} />
      ))}
    </group>
  );
}