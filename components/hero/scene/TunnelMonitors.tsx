import * as THREE from 'three';

export function TunnelMonitors({ backstageFeedTexture }: { backstageFeedTexture?: THREE.Texture }) {
  // Create a dense array of monitors for immersive video corridor
  const monitorPositions: Array<[number, number, number, 'right' | 'left']> = [];
  
  // Generate monitors along tunnel length with multiple heights
  for (let z = -44; z <= -6; z += 4) {
    // Higher monitors
    monitorPositions.push([-3.45, 3.2, z, 'right'], [3.45, 3.2, z, 'left']);
    // Mid-level monitors (original height)
    monitorPositions.push([-3.45, 2.0, z, 'right'], [3.45, 2.0, z, 'left']);
    // Lower monitors
    monitorPositions.push([-3.45, 0.8, z, 'right'], [3.45, 0.8, z, 'left']);
  }
  
  // Add some staggered monitors for variety
  for (let z = -42; z <= -8; z += 6) {
    monitorPositions.push([-3.45, 1.4, z, 'right'], [3.45, 1.4, z, 'left']);
    monitorPositions.push([-3.45, 2.6, z, 'right'], [3.45, 2.6, z, 'left']);
  }

  return (
    <group>
      {monitorPositions.map(([x, y, z, dir], i) => (
        <group key={i}>
          {/* Monitor frame */}
          <mesh 
            position={[x, y, z]} 
            rotation={[0, dir === 'right' ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <boxGeometry args={[2.4, 1.4, 0.12]} />
            <meshStandardMaterial color={0x05050a} metalness={0.7} roughness={0.4} />
          </mesh>

          {/* Monitor screen */}
          <mesh 
            position={[
              x + (dir === 'right' ? 0.07 : -0.07), 
              y, 
              z
            ]} 
            rotation={[0, dir === 'right' ? Math.PI / 2 : -Math.PI / 2, 0]}
          >
            <planeGeometry args={[2.2, 1.2]} />
            <meshBasicMaterial 
              map={backstageFeedTexture}
              color={backstageFeedTexture ? 0xffffff : 0x333333}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}