
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Float } from '@react-three/drei';

const AnimatedCube = ({ position, color = '#8B5CF6' }: { position: [number, number, number], color?: string }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
};

const AnimatedSphere = ({ position, color = '#3B82F6' }: { position: [number, number, number], color?: string }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const AnimatedTorus = ({ position, color = '#EC4899' }: { position: [number, number, number], color?: string }) => {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </Float>
  );
};

const AnimatedShapes = () => {
  return (
    <group>
      <AnimatedCube position={[-4, 2, -2]} color="#8B5CF6" />
      <AnimatedSphere position={[4, -2, -1]} color="#3B82F6" />
      <AnimatedTorus position={[-3, -3, -3]} color="#EC4899" />
      <AnimatedCube position={[3, 3, -4]} color="#10B981" />
      <AnimatedSphere position={[-2, 4, -2]} color="#F59E0B" />
      <AnimatedTorus position={[5, 1, -3]} color="#EF4444" />
    </group>
  );
};

export default AnimatedShapes;
