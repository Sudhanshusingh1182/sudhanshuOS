"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points } from "three";

function Particles() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(240 * 3);
    for (let i = 0; i < 240; i += 1) {
      values[i * 3] = (Math.random() - 0.5) * 14;
      values[i * 3 + 1] = (Math.random() - 0.5) * 8;
      values[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.025;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#22C55E" transparent opacity={0.55} />
    </points>
  );
}

export function ParticleGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-70" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 70 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
