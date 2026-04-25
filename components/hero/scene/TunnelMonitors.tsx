import * as THREE from 'three';

export function TunnelMonitors({ backstageFeedTexture }: { backstageFeedTexture?: THREE.Texture }) {
  const monitorPositions: Array<[number, number, number, 'right' | 'left']> = [
    [-3.45, 2.0, -42, 'right'], [3.45, 2.0, -42, 'left'],
    [-3.45, 2.0, -28, 'right'], [3.45, 2.0, -28, 'left'],
    [-3.45, 2.0, -14, 'right'], [3.45, 2.0, -14, 'left'],
  ];

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