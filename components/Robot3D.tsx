'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 180;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 1.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c8c8c8"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrb() {
  const orbRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(t * 0.6) * 0.18;
      orbRef.current.rotation.y = t * 0.15;
      orbRef.current.rotation.z = Math.sin(t * 0.3) * 0.05;
      // Subtle mouse interaction
      orbRef.current.rotation.x += (mouse.y * 0.08 - orbRef.current.rotation.x) * 0.04;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.4;
      ring1Ref.current.position.y = Math.sin(t * 0.6) * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.25;
      ring2Ref.current.rotation.z = t * 0.15;
      ring2Ref.current.position.y = Math.sin(t * 0.6) * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.3;
      ring3Ref.current.rotation.x = Math.PI / 2.5;
      ring3Ref.current.position.y = Math.sin(t * 0.6) * 0.18;
    }
  });

  return (
    <group>
      {/* Core orb */}
      <Sphere ref={orbRef} args={[0.72, 64, 64]}>
        <MeshDistortMaterial
          color="#ffffff"
          roughness={0.1}
          metalness={0.8}
          distort={0.28}
          speed={2.2}
          envMapIntensity={1}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere args={[0.68, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer aura */}
      <Sphere args={[1.1, 32, 32]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} side={THREE.BackSide} />
      </Sphere>

      {/* Ring 1 - tilted horizontal */}
      <Torus ref={ring1Ref} args={[1.28, 0.018, 16, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#d0d0d0" roughness={0.2} metalness={0.9} />
      </Torus>

      {/* Ring 2 - diagonal */}
      <Torus ref={ring2Ref} args={[1.55, 0.012, 16, 120]} rotation={[Math.PI / 4, 0, 0]}>
        <meshStandardMaterial color="#a0a0a0" roughness={0.3} metalness={0.8} transparent opacity={0.7} />
      </Torus>

      {/* Ring 3 - wide outer */}
      <Torus ref={ring3Ref} args={[1.82, 0.008, 16, 120]}>
        <meshStandardMaterial color="#808080" roughness={0.4} metalness={0.7} transparent opacity={0.45} />
      </Torus>

      {/* Small satellite orbs */}
      <SatelliteOrb radius={1.28} speed={0.9} phase={0} size={0.06} />
      <SatelliteOrb radius={1.55} speed={0.55} phase={Math.PI} size={0.045} />
      <SatelliteOrb radius={1.28} speed={1.1} phase={Math.PI * 1.3} size={0.038} />
    </group>
  );
}

function SatelliteOrb({
  radius,
  speed,
  phase,
  size,
}: {
  radius: number;
  speed: number;
  phase: number;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase;
    const floatY = Math.sin(state.clock.elapsedTime * 0.6) * 0.18;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = floatY + Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <Sphere ref={ref} args={[size, 16, 16]}>
      <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
    </Sphere>
  );
}

function SceneLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(t * 0.4) * 3;
      lightRef.current.position.z = Math.cos(t * 0.4) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={lightRef} position={[3, 2, 3]} intensity={3} color="#ffffff" />
      <pointLight position={[-3, -2, -3]} intensity={1.2} color="#e0e0e0" />
      <pointLight position={[0, 4, 0]} intensity={1.5} color="#ffffff" />
    </>
  );
}

export default function Robot3D() {
  return (
    <div className="w-full h-full" style={{ minHeight: '480px' }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneLight />
        <FloatingOrb />
        <ParticleField />
      </Canvas>
    </div>
  );
}
