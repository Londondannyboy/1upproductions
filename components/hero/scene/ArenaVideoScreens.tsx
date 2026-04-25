import * as THREE from 'three';

export function ArenaVideoScreens({ 
  arenaMainTexture,
  arenaSideTexture,
  arenaUpperTexture,
  scrollProgress 
}: { 
  arenaMainTexture?: THREE.Texture;
  arenaSideTexture?: THREE.Texture;
  arenaUpperTexture?: THREE.Texture;
  scrollProgress: number;
}) {
  // Arena screens only become visible/active after tunnel exit
  const arenaActive = scrollProgress > 0.45;
  const opacity = arenaActive ? 1 : 0;

  return (
    <group>
      {/* Large curved video screens around the arena perimeter */}
      
      {/* Left side arena screen - Main content */}
      <mesh position={[-12, 6, 20]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial 
          map={arenaMainTexture}
          color={arenaMainTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Right side arena screen - Main content */}
      <mesh position={[12, 6, 20]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial 
          map={arenaMainTexture}
          color={arenaMainTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Left upper tier screen - Upper content */}
      <mesh position={[-18, 12, 25]} rotation={[0, Math.PI / 3, 0]}>
        <planeGeometry args={[12, 7]} />
        <meshBasicMaterial 
          map={arenaUpperTexture}
          color={arenaUpperTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Right upper tier screen - Upper content */}
      <mesh position={[18, 12, 25]} rotation={[0, -Math.PI / 3, 0]}>
        <planeGeometry args={[12, 7]} />
        <meshBasicMaterial 
          map={arenaUpperTexture}
          color={arenaUpperTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Central upper screen (behind stage) - Main content */}
      <mesh position={[0, 15, 35]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 11]} />
        <meshBasicMaterial 
          map={arenaMainTexture}
          color={arenaMainTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Side pillar screens for immersion - Side content */}
      <mesh position={[-8, 4, 12]} rotation={[0, Math.PI / 6, 0]}>
        <planeGeometry args={[6, 10]} />
        <meshBasicMaterial 
          map={arenaSideTexture}
          color={arenaSideTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      <mesh position={[8, 4, 12]} rotation={[0, -Math.PI / 6, 0]}>
        <planeGeometry args={[6, 10]} />
        <meshBasicMaterial 
          map={arenaSideTexture}
          color={arenaSideTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      {/* Lower audience level screens - Side content */}
      <mesh position={[-15, 3, 30]} rotation={[0, Math.PI / 4, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial 
          map={arenaSideTexture}
          color={arenaSideTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
      
      <mesh position={[15, 3, 30]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial 
          map={arenaSideTexture}
          color={arenaSideTexture ? 0xffffff : 0x222222}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}