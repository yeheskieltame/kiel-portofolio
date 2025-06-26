
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';

interface GeometricSceneProps {
  children: React.ReactNode;
  enableControls?: boolean;
  showStars?: boolean;
  className?: string;
}

const GeometricScene = ({ 
  children, 
  enableControls = false, 
  showStars = true, 
  className = "" 
}: GeometricSceneProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting Setup */}
          <ambientLight intensity={0.3} color="#ffffff" />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            color="#ffffff"
            castShadow
          />
          <pointLight 
            position={[-10, -10, -5]} 
            intensity={0.8} 
            color="#8B5CF6"
          />
          <pointLight 
            position={[10, -10, 5]} 
            intensity={0.6} 
            color="#EC4899"
          />
          <pointLight 
            position={[0, 10, -5]} 
            intensity={0.7} 
            color="#10B981"
          />
          
          {/* Background Stars */}
          {showStars && (
            <Stars 
              radius={100} 
              depth={50} 
              count={5000} 
              factor={4} 
              saturation={0} 
              fade 
              speed={1} 
            />
          )}
          
          {/* Controls */}
          {enableControls && (
            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
              maxDistance={15}
              minDistance={5}
            />
          )}
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GeometricScene;
