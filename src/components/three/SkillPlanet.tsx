
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { Float, Html } from '@react-three/drei';

interface SkillPlanetProps {
  name: string;
  icon: string;
  level: number;
  position: [number, number, number];
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
}

const SkillPlanet = ({ 
  name, 
  icon, 
  level, 
  position, 
  color, 
  orbitRadius, 
  orbitSpeed, 
  size 
}: SkillPlanetProps) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += orbitSpeed * delta;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[orbitRadius, 0, 0]}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh
            ref={meshRef}
            position={position}
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={hovered ? size * 1.2 : size}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
              color={color}
              transparent
              opacity={0.8}
              emissive={color}
              emissiveIntensity={hovered ? 0.3 : 0.1}
            />
          </mesh>

          {/* Skill Icon Texture */}
          <Html
            position={[0, 0, 1.1]}
            center
            transform
            occlude
            style={{
              width: '40px',
              height: '40px',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}
          >
            <img 
              src={icon} 
              alt={name} 
              style={{ width: '24px', height: '24px' }}
            />
          </Html>

          {/* Skill Info on Hover */}
          {hovered && (
            <Html
              position={[0, 2, 0]}
              center
              style={{
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}
            >
              <div>
                <div>{name}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {level}% Proficiency
                </div>
              </div>
            </Html>
          )}

          {/* Orbital Trail */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[orbitRadius, 0.01, 8, 100]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.1}
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
};

export default SkillPlanet;
