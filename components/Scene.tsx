'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function DataWave() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80; // Grid size
  const sep = 1.2;  // Distance between points
  
  // Precompute positions to save memory
  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * count * 3);
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        positions[i * 3] = ix * sep - (count * sep) / 2;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = iy * sep - (count * sep) / 2;
        i++;
      }
    }
    return [positions];
  }, [count, sep]);

  // Animate the Y-axis using sine waves on every frame
  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        // Complex wave math combining X and Z coordinates
        positions[i * 3 + 1] = Math.sin(x * 0.3 + time) * 1.5 + Math.sin(z * 0.2 + time) * 1.5;
        i++;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3] as any} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#06b6d4" transparent opacity={0.6} sizeAttenuation={true} />
    </points>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 8, 20], fov: 60 }}>
      <color attach="background" args={['#000000']} />
      {/* Fog blends the edges of the grid smoothly into the black background */}
      <fog attach="fog" args={['#000000', 10, 40]} />
      <DataWave />
    </Canvas>
  );
}