
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group, Color, Vector3 } from 'three';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Floating Geometric Sphere with distortion
const DistortedSphere = ({ position, color }: { position: [number, number, number], color: string }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.6}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Animated Torus with procedural material
const AnimatedTorus = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1.2, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#9F7AEA"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
          emissive="#4C1D95"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Crystalline structure
const Crystal = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          color="#60A5FA"
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          transparent
          thickness={0.5}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
};

// Particle Ring System
const ParticleRing = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 2;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Colorful particles
      const color = new Color().setHSL(Math.random(), 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions: pos, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={positions.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// DNA Helix Structure
const DNAHelix = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const t = (i / 50) * Math.PI * 4;
      const x = Math.cos(t) * 0.5;
      const y = (i / 50) * 4 - 2;
      const z = Math.sin(t) * 0.5;
      points.push(new Vector3(x, y, z));
    }
    return points;
  }, []);

  return (
    <group ref={groupRef} position={[3, 0, -2]}>
      {helixPoints.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={`hsl(${(index / helixPoints.length) * 360}, 70%, 60%)`}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const GeometricHero = () => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central distorted sphere */}
      <DistortedSphere position={[0, 0, 0]} color="#8B5CF6" />
      
      {/* Orbiting geometric shapes */}
      <AnimatedTorus position={[-2, 1, 1]} />
      <Crystal position={[2, -1, -1]} />
      <DistortedSphere position={[-1.5, -2, 0.5]} color="#EC4899" />
      <Crystal position={[1.5, 2, -0.5]} />
      
      {/* Particle ring system */}
      <ParticleRing />
      
      {/* DNA Helix */}
      <DNAHelix />
      
      {/* Floating energy orbs */}
      <Float speed={4} rotationIntensity={1} floatIntensity={3}>
        <mesh position={[-3, 2, 2]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial 
            color="#00D2FF" 
            transparent 
            opacity={0.6}
            emissive="#00D2FF"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[3, -2, 1]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshBasicMaterial 
            color="#FF6B6B" 
            transparent 
            opacity={0.7}
            emissive="#FF6B6B"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-2, -3, -1]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshBasicMaterial 
            color="#4ECDC4" 
            transparent 
            opacity={0.8}
            emissive="#4ECDC4"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
};

export default GeometricHero;
