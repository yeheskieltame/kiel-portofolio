
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import SkillPlanet from './SkillPlanet';
import { Float } from '@react-three/drei';

interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  category: string;
}

interface SolarSystemSkillsProps {
  skills: Skill[];
}

const SolarSystemSkills = ({ skills }: SolarSystemSkillsProps) => {
  const systemRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (systemRef.current) {
      systemRef.current.rotation.y += delta * 0.05;
    }
  });

  // Group skills by category and assign orbital properties
  const skillCategories = {
    programming: { color: '#3B82F6', baseRadius: 4 },
    ml: { color: '#8B5CF6', baseRadius: 6 },
    webdev: { color: '#10B981', baseRadius: 8 }
  };

  const getSkillProps = (skill: Skill, index: number, categorySkills: Skill[]) => {
    const category = skillCategories[skill.category as keyof typeof skillCategories];
    const angleStep = (Math.PI * 2) / categorySkills.length;
    const angle = angleStep * index;
    
    return {
      orbitRadius: category.baseRadius,
      orbitSpeed: 0.2 / category.baseRadius, // Slower for outer orbits
      position: [
        Math.cos(angle) * 0.5,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * 0.5
      ] as [number, number, number],
      color: category.color,
      size: Math.max(0.3, skill.level / 100)
    };
  };

  return (
    <group ref={systemRef}>
      {/* Central Sun */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#FEF08A"
            emissive="#FEF08A"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Skill Planets */}
      {Object.entries(
        skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {} as Record<string, Skill[]>)
      ).map(([category, categorySkills]) =>
        categorySkills.map((skill, index) => {
          const props = getSkillProps(skill, index, categorySkills);
          return (
            <SkillPlanet
              key={skill.id}
              name={skill.name}
              icon={skill.icon}
              level={skill.level}
              {...props}
            />
          );
        })
      )}

      {/* Ambient Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={new Float32Array(
              Array.from({ length: 1500 }, () => (Math.random() - 0.5) * 30)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.01}
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </points>
    </group>
  );
};

export default SolarSystemSkills;
