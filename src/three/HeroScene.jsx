"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hero centerpiece: a slowly-breathing wireframe icosahedron with a
 * molten core, wrapped in an ember particle field. The whole rig
 * leans gently toward the cursor. Deliberately lightweight — no
 * textures, no post-processing, capped DPR.
 */

function EmberCore({ mouse }) {
  const group = useRef(null);
  const outer = useRef(null);
  const inner = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.x = t * 0.12;
      outer.current.rotation.y = t * 0.18;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.3;
      const pulse = 1 + Math.sin(t * 1.6) * 0.06;
      inner.current.scale.setScalar(pulse);
    }
    if (group.current) {
      // Ease the rig toward the cursor
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x, mouse.current.y * 0.35, 2.5, delta
      );
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y, mouse.current.x * 0.5, 2.5, delta
      );
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={outer}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshBasicMaterial color="#a35e47" wireframe transparent opacity={0.32} />
        </mesh>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.05, 4]} />
          <meshStandardMaterial
            color="#1a120a"
            emissive="#a35e47"
            emissiveIntensity={0.75}
            roughness={0.25}
            metalness={0.6}
          />
        </mesh>
        {/* Orbit ring */}
        <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
          <torusGeometry args={[2.6, 0.006, 8, 96]} />
          <meshBasicMaterial color="#9c9a9a" transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, 0.5, -0.3]}>
          <torusGeometry args={[3.05, 0.004, 8, 96]} />
          <meshBasicMaterial color="#a35e47" transparent opacity={0.16} />
        </mesh>
      </Float>
    </group>
  );
}

function EmberField({ count = 320 }) {
  const points = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 1;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffb573"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 5]} intensity={26} color="#a35e47" />
      <pointLight position={[-5, -3, 2]} intensity={10} color="#7e4634" />
      <EmberCore mouse={mouse} />
      <EmberField />
    </Canvas>
  );
}
