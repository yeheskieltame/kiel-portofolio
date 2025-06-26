
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Color } from 'three';

const GeometricHero = () => {
  const mainSphereRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const cubeRef = useRef<Mesh>(null);
  const torusRef = useRef<Mesh>(null);
  const octahedronRef = useRef<Mesh>(null);

  // Animated particles around the main sphere
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 100; i++) {
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        speed: 0.5 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      });
    }
    return positions;
  }, []);

  const orbPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 4;
      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * 0.5,
        z: Math.sin(angle) * radius,
        speed: 0.3 + Math.random() * 0.2,
        offset: i * 0.5
      });
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Main sphere rotation and floating
    if (mainSphereRef.current) {
      mainSphereRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      mainSphereRef.current.rotation.y = time * 0.2;
      mainSphereRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.5;
      ringRef.current.rotation.z = Math.sin(time * 0.3) * 0.3;
    }

    // Geometric shapes orbiting
    if (cubeRef.current) {
      const angle1 = time * 0.8;
      cubeRef.current.position.x = Math.cos(angle1) * 3;
      cubeRef.current.position.z = Math.sin(angle1) * 3;
      cubeRef.current.position.y = Math.sin(time * 0.7) * 0.5;
      cubeRef.current.rotation.x = time * 0.5;
      cubeRef.current.rotation.y = time * 0.3;
    }

    if (torusRef.current) {
      const angle2 = time * 0.6 + Math.PI;
      torusRef.current.position.x = Math.cos(angle2) * 2.5;
      torusRef.current.position.z = Math.sin(angle2) * 2.5;
      torusRef.current.position.y = Math.cos(time * 0.8) * 0.8;
      torusRef.current.rotation.x = time * 0.4;
      torusRef.current.rotation.z = time * 0.2;
    }

    if (octahedronRef.current) {
      const angle3 = time * 0.7 + Math.PI * 0.5;
      octahedronRef.current.position.x = Math.cos(angle3) * 3.5;
      octahedronRef.current.position.z = Math.sin(angle3) * 3.5;
      octahedronRef.current.position.y = Math.sin(time * 0.9) * 1;
      octahedronRef.current.rotation.y = time * 0.6;
      octahedronRef.current.rotation.z = time * 0.4;
    }
  });

  return (
    <group>
      {/* Main Central Sphere with Complex Material */}
      <mesh ref={mainSphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#8B5CF6"
          metalness={0.8}
          roughness={0.2}
          emissive="#4C1D95"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe Ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#EC4899"
          emissive="#BE185D"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>

      {/* Orbiting Geometric Shapes */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial
          color="#10B981"
          metalness={0.6}
          roughness={0.3}
          emissive="#047857"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={torusRef}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.7}
          roughness={0.2}
          emissive="#D97706"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={octahedronRef}>
        <octahedronGeometry args={[0.4]} />
        <meshStandardMaterial
          color="#EF4444"
          metalness={0.5}
          roughness={0.4}
          emissive="#DC2626"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Floating Particles */}
      {particlePositions.map((particle, index) => (
        <mesh
          key={`particle-${index}`}
          position={[
            particle.x + Math.sin(particle.offset) * 0.5,
            particle.y + Math.cos(particle.offset) * 0.3,
            particle.z
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#7C3AED"
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}

      {/* Energy Orbs */}
      {orbPositions.map((orb, index) => (
        <mesh
          key={`orb-${index}`}
          position={[
            orb.x + Math.sin(orb.offset) * 0.3,
            orb.y,
            orb.z + Math.cos(orb.offset) * 0.3
          ]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#0891B2"
            emissiveIntensity={0.6}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* DNA Helix Structure */}
      {Array.from({ length: 20 }).map((_, index) => {
        const t = (index / 20) * Math.PI * 4;
        const y = (index - 10) * 0.2;
        return (
          <group key={`dna-${index}`}>
            <mesh position={[Math.cos(t) * 0.5, y, Math.sin(t) * 0.5]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial
                color="#F472B6"
                emissive="#EC4899"
                emissiveIntensity={0.4}
              />
            </mesh>
            <mesh position={[Math.cos(t + Math.PI) * 0.5, y, Math.sin(t + Math.PI) * 0.5]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial
                color="#60A5FA"
                emissive="#3B82F6"
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>
        );
      })}

      {/* Additional Ambient Elements */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#1E293B"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

export default GeometricHero;
