import * as THREE from 'three';

export function FloorPanels({ floorVideoTexture }: { floorVideoTexture?: THREE.Texture }) {
  return (
    <group>
      {/* Left floor panel */}
      <group>
        <mesh position={[-4.2, 0.015, 3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.8, 6.5]} />
          <meshBasicMaterial 
            map={floorVideoTexture}
            color={floorVideoTexture ? 0xffffff : 0x333333}
          />
        </mesh>
        
        {/* LED edge glow */}
        <mesh position={[-4.2, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.0, 6.7]} />
          <meshBasicMaterial 
            color={0xff2d20}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Right floor panel */}
      <group>
        <mesh position={[4.2, 0.015, 3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.8, 6.5]} />
          <meshBasicMaterial 
            map={floorVideoTexture}
            color={floorVideoTexture ? 0xffffff : 0x333333}
          />
        </mesh>
        
        {/* LED edge glow */}
        <mesh position={[4.2, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.0, 6.7]} />
          <meshBasicMaterial 
            color={0xff2d20}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}