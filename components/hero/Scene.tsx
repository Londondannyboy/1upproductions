import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import { Tunnel } from './scene/Tunnel';
import { Stage } from './scene/Stage';
import { LedWall } from './scene/LedWall';
import { Truss } from './scene/Truss';
import { LightCones } from './scene/LightCones';
import { Crowd } from './scene/Crowd';
import { BroadcastCameras } from './scene/BroadcastCameras';
import { TunnelMonitors } from './scene/TunnelMonitors';
import { FloorPanels } from './scene/FloorPanels';

import { VIDEO_SOURCES, makeVideoEl } from '@/lib/videoSources';
import { drawBackstageFeed } from '@/components/feeds/feedCanvases/drawBackstageFeed';
import { smoothstep } from '@/lib/smoothstep';

export function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // Video elements and textures
  const [backstageVideo, setBackstageVideo] = useState<HTMLVideoElement | null>(null);
  const [floorVideo, setFloorVideo] = useState<HTMLVideoElement | null>(null);
  
  const [backstageTexture, setBackstageTexture] = useState<THREE.Texture | null>(null);
  const [floorVideoTexture, setFloorVideoTexture] = useState<THREE.Texture | null>(null);
  
  // Backstage feed canvas for CCTV overlay
  const [backstageCanvas] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 432;
    return canvas;
  });
  
  const [backstageFeedTexture] = useState(() => {
    const texture = new THREE.CanvasTexture(backstageCanvas);
    texture.minFilter = THREE.LinearFilter;
    return texture;
  });
  
  // Initialize video elements
  useEffect(() => {
    const backstageVid = makeVideoEl(VIDEO_SOURCES.backstage);
    const floorVid = makeVideoEl(VIDEO_SOURCES.floor);
    
    setBackstageVideo(backstageVid);
    setFloorVideo(floorVid);
    
    // Create video textures
    const backstageTex = new THREE.VideoTexture(backstageVid);
    backstageTex.minFilter = THREE.LinearFilter;
    backstageTex.magFilter = THREE.LinearFilter;
    backstageTex.format = THREE.RGBAFormat;
    setBackstageTexture(backstageTex);
    
    const floorTex = new THREE.VideoTexture(floorVid);
    floorTex.minFilter = THREE.LinearFilter;
    floorTex.magFilter = THREE.LinearFilter;
    floorTex.format = THREE.RGBAFormat;
    setFloorVideoTexture(floorTex);
    
    return () => {
      if (backstageVid.parentNode) {
        backstageVid.parentNode.removeChild(backstageVid);
      }
      if (floorVid.parentNode) {
        floorVid.parentNode.removeChild(floorVid);
      }
    };
  }, []);

  // Lighting setup
  const lights = useMemo(() => {
    return (
      <>
        <ambientLight color={0x14141a} intensity={0.6} />
        
        <spotLight
          color={0xff2d20}
          position={[-8, 14, 8]}
          target-position={[0, 1, 8]}
          angle={Math.PI / 5}
          penumbra={0.4}
          decay={1}
          distance={60}
        />
        
        <spotLight
          color={0x6affae}
          position={[8, 14, 8]}
          target-position={[0, 1, 8]}
          angle={Math.PI / 5}
          penumbra={0.4}
          decay={1}
          distance={60}
        />
        
        <pointLight
          color={0xffffff}
          position={[0, 10, 12]}
          intensity={0.4}
          distance={60}
        />
      </>
    );
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const stageIntensity = smoothstep(0.45, 0.75, scrollProgress);
    
    // Update backstage feed canvas with CCTV overlay
    const ctx = backstageCanvas.getContext('2d');
    if (ctx) {
      drawBackstageFeed(ctx, t, backstageCanvas.width, backstageCanvas.height, backstageVideo || undefined);
      backstageFeedTexture.needsUpdate = true;
    }
    
    // Update lighting intensities based on scroll progress
    const spotLights = groupRef.current?.parent?.children.filter(
      (child) => child instanceof THREE.SpotLight
    ) as THREE.SpotLight[];
    
    if (spotLights) {
      spotLights.forEach((light, i) => {
        if (i === 0) { // Key light (red)
          light.intensity = stageIntensity * (1.2 + Math.sin(t * 2.4 + 0.8) * 0.3);
        } else if (i === 1) { // Fill light (phosphor)
          light.intensity = stageIntensity * (1.3 + Math.sin(t * 2.1 + 1.2) * 0.3);
        }
      });
    }
    
    const pointLights = groupRef.current?.parent?.children.filter(
      (child) => child instanceof THREE.PointLight
    ) as THREE.PointLight[];
    
    if (pointLights) {
      pointLights.forEach((light) => {
        light.intensity = 0.2 + stageIntensity * 0.4;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {lights}
      
      <fog attach="fog" args={[0x000000, 0.035]} />
      
      <Tunnel />
      <Stage />
      <LedWall scrollProgress={scrollProgress} />
      <Truss />
      <LightCones scrollProgress={scrollProgress} />
      <Crowd />
      <BroadcastCameras 
        scrollProgress={scrollProgress} 
        cameraPosition={camera.position}
      />
      <TunnelMonitors backstageFeedTexture={backstageFeedTexture} />
      <FloorPanels floorVideoTexture={floorVideoTexture || undefined} />
    </group>
  );
}