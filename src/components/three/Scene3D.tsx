
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Stars } from '@react-three/drei';

interface Scene3DProps {
  children: React.ReactNode;
  enableControls?: boolean;
  showStars?: boolean;
  className?: string;
}

const Scene3D = ({ children, enableControls = true, showStars = true, className = "" }: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Background Stars */}
          {showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
          
          {/* Controls */}
          {enableControls && (
            <OrbitControls 
              enableZoom={true} 
              enablePan={false} 
              enableRotate={true}
              autoRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          )}
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
