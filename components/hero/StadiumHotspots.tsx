import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  videoKey: string;
}

interface StadiumHotspotsProps {
  scrollProgress: number;
  onHotspotClick?: (hotspot: Hotspot) => void;
}

export function StadiumHotspots({ scrollProgress, onHotspotClick }: StadiumHotspotsProps) {
  const { camera, raycaster, gl } = useThree();
  const hotspotsRef = useRef<THREE.Group>(null);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  
  // Define interactive hotspots around the stadium
  const hotspots: Hotspot[] = useMemo(() => [
    {
      id: 'esports1',
      position: [-18, 12, 25],
      title: 'LEC Finals Production',
      description: '1UP filming the League of Legends European Championship Finals',
      videoKey: 'esports1'
    },
    {
      id: 'esports2', 
      position: [18, 12, 25],
      title: 'LoL Worlds Coverage',
      description: 'Behind the scenes at League of Legends World Championship',
      videoKey: 'esports2'
    },
    {
      id: 'competition1',
      position: [-12, 6, 30],
      title: 'Comms Competition',
      description: 'Capturing the intensity of professional team communications',
      videoKey: 'competition1'
    },
    {
      id: 'competition2',
      position: [12, 6, 30],
      title: 'VCT Champions',
      description: 'VALORANT Champions Tour production excellence',
      videoKey: 'competition2'
    },
    {
      id: 'mainstage',
      position: [0, 15, 35],
      title: 'Main Stage Production',
      description: 'Full-scale esports event broadcast production',
      videoKey: 'mainstage'
    },
    {
      id: 'crowdfilming1',
      position: [-30, 4, 12],
      title: 'Crowd Dynamics',
      description: 'Capturing the energy and emotion of esports audiences',
      videoKey: 'crowdfilming'
    },
    {
      id: 'crowdfilming2',
      position: [30, 4, 12],
      title: 'Fan Experience',
      description: 'Documenting the passion of competitive gaming fans',
      videoKey: 'crowdfilming'
    }
  ], []);

  // Visibility based on scroll progress - hotspots appear during stadium exploration
  const hotspotsVisible = scrollProgress > 0.85 && scrollProgress < 0.95;

  useFrame(() => {
    if (!hotspotsRef.current || !hotspotsVisible) return;
    
    // Animate hotspot markers with subtle pulse
    hotspotsRef.current.children.forEach((child, index) => {
      if (child instanceof THREE.Group) {
        const time = Date.now() * 0.002;
        const offset = index * 0.5;
        child.scale.setScalar(1 + Math.sin(time + offset) * 0.1);
        
        // Rotate markers to always face camera
        child.lookAt(camera.position);
      }
    });
  });

  const handlePointerMove = (event: any) => {
    if (!hotspotsVisible || !hotspotsRef.current) return;
    
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hotspotsRef.current.children, true);
    
    if (intersects.length > 0) {
      const hotspotId = intersects[0].object.userData.hotspotId;
      setHoveredHotspot(hotspotId);
      gl.domElement.style.cursor = 'pointer';
    } else {
      setHoveredHotspot(null);
      gl.domElement.style.cursor = 'default';
    }
  };

  const handleClick = (event: any) => {
    if (!hotspotsVisible || !hotspotsRef.current) return;
    
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(hotspotsRef.current.children, true);
    
    if (intersects.length > 0) {
      const hotspotId = intersects[0].object.userData.hotspotId;
      const hotspot = hotspots.find(h => h.id === hotspotId);
      if (hotspot && onHotspotClick) {
        onHotspotClick(hotspot);
      }
    }
  };

  return (
    <group 
      ref={hotspotsRef} 
      visible={hotspotsVisible}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      {hotspots.map((hotspot) => (
        <group key={hotspot.id} position={hotspot.position}>
          {/* Hotspot marker - glowing sphere */}
          <mesh userData={{ hotspotId: hotspot.id }}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial 
              color={hoveredHotspot === hotspot.id ? "#6affae" : "#ff2d20"}
              transparent
              opacity={0.8}
            />
          </mesh>
          
          {/* Pulsing outer ring */}
          <mesh userData={{ hotspotId: hotspot.id }}>
            <ringGeometry args={[0.4, 0.6, 16]} />
            <meshBasicMaterial 
              color="#ff2d20" 
              transparent 
              opacity={hoveredHotspot === hotspot.id ? 0.6 : 0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Glow effect */}
          <mesh userData={{ hotspotId: hotspot.id }}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshBasicMaterial 
              color={hoveredHotspot === hotspot.id ? "#6affae" : "#ff2d20"}
              transparent
              opacity={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}