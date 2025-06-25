
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

const LaptopCharacter = () => {
  const groupRef = useRef<Group>(null);
  const laptopRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (laptopRef.current) {
      // Subtle laptop screen glow effect
      laptopRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Character Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshLambertMaterial color="#4A5568" />
      </mesh>

      {/* Character Head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshLambertMaterial color="#F7FAFC" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshLambertMaterial color="#2D3748" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.1, 0.85, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      <mesh position={[0.1, 0.85, 0.25]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshLambertMaterial color="#000000" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshLambertMaterial color="#F7FAFC" />
      </mesh>
      <mesh position={[0.6, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshLambertMaterial color="#F7FAFC" />
      </mesh>

      {/* Hands on keyboard position */}
      <mesh position={[-0.3, -0.2, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshLambertMaterial color="#F7FAFC" />
      </mesh>
      <mesh position={[0.3, -0.2, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshLambertMaterial color="#F7FAFC" />
      </mesh>

      {/* Laptop Base */}
      <mesh position={[0, -0.3, 0.2]}>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshLambertMaterial color="#2D3748" />
      </mesh>

      {/* Laptop Screen */}
      <mesh ref={laptopRef} position={[0, 0.2, -0.2]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.1, 0.8, 0.05]} />
        <meshLambertMaterial color="#1A202C" />
      </mesh>

      {/* Laptop Screen Display */}
      <mesh position={[0, 0.2, -0.17]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[1, 0.7]} />
        <meshLambertMaterial color="#4299E1" emissive="#4299E1" emissiveIntensity={0.3} />
      </mesh>

      {/* Code Lines on Screen */}
      <mesh position={[-0.3, 0.3, -0.16]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.3, 0.05]} />
        <meshLambertMaterial color="#68D391" emissive="#68D391" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.2, 0.2, -0.16]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.4, 0.05]} />
        <meshLambertMaterial color="#F687B3" emissive="#F687B3" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.1, 0.1, -0.16]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[0.2, 0.05]} />
        <meshLambertMaterial color="#FBD38D" emissive="#FBD38D" emissiveIntensity={0.2} />
      </mesh>

      {/* Floating Code Particles */}
      <mesh position={[0.5, 0.8, 0.3]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshLambertMaterial color="#9F7AEA" emissive="#9F7AEA" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.4, 0.9, 0.4]}>
        <boxGeometry args={[0.03, 0.03, 0.03]} />
        <meshLambertMaterial color="#4FD1C7" emissive="#4FD1C7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 1.1, 0.2]}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshLambertMaterial color="#F093FB" emissive="#F093FB" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

export default LaptopCharacter;
