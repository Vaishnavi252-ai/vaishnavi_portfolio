'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AIModel() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(t * 0.8) * 0.12;
      coreRef.current.rotation.y = t * 0.15;
      coreRef.current.rotation.x += (mouse.y * 0.15 - coreRef.current.rotation.x) * 0.05;
      coreRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.rotation.x = Math.PI / 2.2;
      ring1Ref.current.position.y = Math.sin(t * 0.8) * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.25;
      ring2Ref.current.rotation.y = t * 0.15;
      ring2Ref.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
  });

  return (
    <group>
      {/* Core AI orb - teal accent */}
      <Sphere ref={coreRef} args={[0.65, 64, 64]}>
        <MeshDistortMaterial
          color="#14b8a6"
          roughness={0.15}
          metalness={0.85}
          distort={0.25}
          speed={2}
          envMapIntensity={1.5}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[0.62, 32, 32]}>
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.15} side={THREE.BackSide} />
      </Sphere>

      {/* Outer aura */}
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>

      {/* Ring 1 */}
      <Torus ref={ring1Ref} args={[1.15, 0.02, 16, 100]}>
        <meshStandardMaterial color="#14b8a6" roughness={0.2} metalness={0.9} transparent opacity={0.8} />
      </Torus>

      {/* Ring 2 */}
      <Torus ref={ring2Ref} args={[1.4, 0.012, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#2dd4bf" roughness={0.3} metalness={0.8} transparent opacity={0.5} />
      </Torus>

      {/* Satellite orbs */}
      <SatelliteOrb radius={1.15} speed={0.7} phase={0} size={0.055} />
      <SatelliteOrb radius={1.15} speed={0.9} phase={Math.PI * 0.66} size={0.045} />
      <SatelliteOrb radius={1.4} speed={0.5} phase={Math.PI} size={0.04} />
    </group>
  );
}

function SatelliteOrb({ radius, speed, phase, size }: { radius: number; speed: number; phase: number; size: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    const floatY = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = floatY + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[size, 16, 16]}>
      <meshStandardMaterial color="#14b8a6" roughness={0.1} metalness={0.9} emissive="#14b8a6" emissiveIntensity={0.3} />
    </Sphere>
  );
}

function SceneLight() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 3]} intensity={2.5} color="#14b8a6" />
      <pointLight position={[-3, -2, -3]} intensity={1} color="#ffffff" />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#2dd4bf" />
    </>
  );
}

interface AIModel3DProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function AIModel3D({ className, style }: AIModel3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className} style={{ ...style, minHeight: '300px', background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.1), transparent 70%)' }} />
    );
  }

  return (
    <div className={className} style={{ ...style, minHeight: '300px' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneLight />
        <AIModel />
      </Canvas>
    </div>
  );
}
