import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VIDEO_SOURCES, makeVideoEl } from '@/lib/videoSources';

export function EsportsStadium({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Video elements for seating areas
  const [esportsVideos, setEsportsVideos] = useState<{
    esports1: HTMLVideoElement | null;
    esports2: HTMLVideoElement | null;
    esports3: HTMLVideoElement | null;
    esports4: HTMLVideoElement | null;
    competition1: HTMLVideoElement | null;
    competition2: HTMLVideoElement | null;
    mainstage: HTMLVideoElement | null;
    crowdfilming: HTMLVideoElement | null;
  }>({
    esports1: null,
    esports2: null,
    esports3: null,
    esports4: null,
    competition1: null,
    competition2: null,
    mainstage: null,
    crowdfilming: null,
  });

  const [videoTextures, setVideoTextures] = useState<{
    esports1: THREE.VideoTexture | null;
    esports2: THREE.VideoTexture | null;
    esports3: THREE.VideoTexture | null;
    esports4: THREE.VideoTexture | null;
    competition1: THREE.VideoTexture | null;
    competition2: THREE.VideoTexture | null;
    mainstage: THREE.VideoTexture | null;
    crowdfilming: THREE.VideoTexture | null;
  }>({
    esports1: null,
    esports2: null,
    esports3: null,
    esports4: null,
    competition1: null,
    competition2: null,
    mainstage: null,
    crowdfilming: null,
  });

  // Initialize all video elements and textures
  useEffect(() => {
    const videos = {
      esports1: makeVideoEl(VIDEO_SOURCES.esports1),
      esports2: makeVideoEl(VIDEO_SOURCES.esports2),
      esports3: makeVideoEl(VIDEO_SOURCES.esports3),
      esports4: makeVideoEl(VIDEO_SOURCES.esports4),
      competition1: makeVideoEl(VIDEO_SOURCES.competition1),
      competition2: makeVideoEl(VIDEO_SOURCES.competition2),
      mainstage: makeVideoEl(VIDEO_SOURCES.mainstage),
      crowdfilming: makeVideoEl(VIDEO_SOURCES.crowdfilming),
    };

    setEsportsVideos(videos);

    // Create video textures
    const textures: any = {};
    Object.entries(videos).forEach(([key, video]) => {
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBAFormat;
      textures[key] = texture;
    });

    setVideoTextures(textures);

    return () => {
      Object.values(videos).forEach((video) => {
        if (video.parentNode) {
          video.parentNode.removeChild(video);
        }
      });
    };
  }, []);

  // Stadium seating geometry - tiered rows in a horseshoe around the stage
  const stadiumSeating = useMemo(() => {
    const seats = [];
    const radius = 25;
    const tiers = 8;
    const seatsPerTier = 24;
    
    for (let tier = 0; tier < tiers; tier++) {
      const tierRadius = radius + tier * 3;
      const tierY = tier * 1.8 + 2;
      
      for (let seat = 0; seat < seatsPerTier; seat++) {
        const angle = (seat / seatsPerTier) * Math.PI * 1.4 - Math.PI * 0.7;
        const x = Math.cos(angle) * tierRadius;
        const z = Math.sin(angle) * tierRadius + 8;
        
        seats.push({
          position: [x, tierY, z] as const,
          rotation: [0, -angle + Math.PI, 0] as const,
          tier,
          seat,
        });
      }
    }
    
    return seats;
  }, []);

  // Video screen positions throughout the stadium
  const videoScreens = useMemo(() => {
    return [
      // Main screens on upper tiers - esports footage
      { position: [-18, 12, 25] as const, rotation: [0, -0.3, 0] as const, scale: [8, 4.5, 1] as const, videoKey: 'esports1' },
      { position: [18, 12, 25] as const, rotation: [0, 0.3, 0] as const, scale: [8, 4.5, 1] as const, videoKey: 'esports2' },
      { position: [-25, 8, 18] as const, rotation: [0, -0.8, 0] as const, scale: [6, 3.4, 1] as const, videoKey: 'esports3' },
      { position: [25, 8, 18] as const, rotation: [0, 0.8, 0] as const, scale: [6, 3.4, 1] as const, videoKey: 'esports4' },
      
      // Competition filming screens - mid-tier
      { position: [-12, 6, 30] as const, rotation: [0, 0, 0] as const, scale: [5, 2.8, 1] as const, videoKey: 'competition1' },
      { position: [12, 6, 30] as const, rotation: [0, 0, 0] as const, scale: [5, 2.8, 1] as const, videoKey: 'competition2' },
      
      // Main stage production screen - back of stadium
      { position: [0, 15, 35] as const, rotation: [0, 0, 0] as const, scale: [12, 6.8, 1] as const, videoKey: 'mainstage' },
      
      // Crowd filming screens - lower tiers
      { position: [-30, 4, 12] as const, rotation: [0, -1.2, 0] as const, scale: [4, 2.2, 1] as const, videoKey: 'crowdfilming' },
      { position: [30, 4, 12] as const, rotation: [0, 1.2, 0] as const, scale: [4, 2.2, 1] as const, videoKey: 'crowdfilming' },
    ];
  }, []);

  // Visibility based on scroll progress - stadium appears after main stage experience
  const stadiumOpacity = useMemo(() => {
    // Stadium becomes visible after the main experience (after 85% scroll)
    return Math.max(0, Math.min(1, (scrollProgress - 0.85) / 0.15));
  }, [scrollProgress]);

  useFrame(() => {
    if (groupRef.current) {
      // Subtle rotation for dynamic feel
      groupRef.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.02;
    }
  });

  return (
    <group ref={groupRef} visible={stadiumOpacity > 0.1}>
      {/* Stadium seating structure */}
      {stadiumSeating.map((seatData, i) => (
        <group key={i} position={seatData.position} rotation={seatData.rotation}>
          {/* Seat back */}
          <mesh position={[0, 0.4, -0.2]}>
            <boxGeometry args={[0.8, 0.8, 0.1]} />
            <meshLambertMaterial color="#1a1a20" opacity={stadiumOpacity} transparent />
          </mesh>
          {/* Seat cushion */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.1, 0.6]} />
            <meshLambertMaterial color="#2a2a30" opacity={stadiumOpacity} transparent />
          </mesh>
        </group>
      ))}

      {/* Video screens throughout stadium */}
      {videoScreens.map((screen, i) => (
        <group key={i} position={screen.position} rotation={screen.rotation}>
          {/* Screen frame */}
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[screen.scale[0] + 0.4, screen.scale[1] + 0.4, 0.2]} />
            <meshLambertMaterial color="#0a0a0a" opacity={stadiumOpacity} transparent />
          </mesh>
          
          {/* Video screen */}
          <mesh>
            <planeGeometry args={[screen.scale[0], screen.scale[1]]} />
            <meshBasicMaterial 
              map={videoTextures[screen.videoKey as keyof typeof videoTextures] || null}
              opacity={stadiumOpacity}
              transparent
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Screen glow */}
          <mesh position={[0, 0, 0.1]}>
            <planeGeometry args={[screen.scale[0] + 1, screen.scale[1] + 1]} />
            <meshBasicMaterial 
              color="#ff2d20" 
              opacity={stadiumOpacity * 0.1} 
              transparent 
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Stadium structure - support beams and framework */}
      {/* Vertical support pillars */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 1.4 - Math.PI * 0.7;
        const x = Math.cos(angle) * 35;
        const z = Math.sin(angle) * 35 + 8;
        return (
          <mesh key={i} position={[x, 8, z]}>
            <cylinderGeometry args={[0.3, 0.3, 16]} />
            <meshLambertMaterial color="#333333" opacity={stadiumOpacity} transparent />
          </mesh>
        );
      })}

      {/* Horizontal support beams */}
      {Array.from({ length: 4 }, (_, tier) => (
        <group key={tier}>
          {Array.from({ length: 7 }, (_, beam) => {
            const angle1 = (beam / 7) * Math.PI * 1.4 - Math.PI * 0.7;
            const angle2 = ((beam + 1) / 7) * Math.PI * 1.4 - Math.PI * 0.7;
            const radius = 30 + tier * 3;
            
            const x1 = Math.cos(angle1) * radius;
            const z1 = Math.sin(angle1) * radius + 8;
            const x2 = Math.cos(angle2) * radius;
            const z2 = Math.sin(angle2) * radius + 8;
            
            const midX = (x1 + x2) / 2;
            const midZ = (z1 + z2) / 2;
            const length = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
            const beamAngle = Math.atan2(z2 - z1, x2 - x1);
            
            return (
              <mesh 
                key={beam} 
                position={[midX, tier * 4 + 4, midZ]}
                rotation={[0, beamAngle, 0]}
              >
                <boxGeometry args={[length, 0.3, 0.3]} />
                <meshLambertMaterial color="#444444" opacity={stadiumOpacity} transparent />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Stadium lighting */}
      <pointLight 
        position={[0, 20, 20]} 
        intensity={stadiumOpacity * 0.5} 
        distance={50} 
        color="#ffffff" 
      />
      <pointLight 
        position={[-20, 15, 25]} 
        intensity={stadiumOpacity * 0.3} 
        distance={40} 
        color="#6affae" 
      />
      <pointLight 
        position={[20, 15, 25]} 
        intensity={stadiumOpacity * 0.3} 
        distance={40} 
        color="#ff2d20" 
      />
    </group>
  );
}