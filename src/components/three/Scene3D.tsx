
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
        camera={{ position: [15, 10, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting for 3D objects */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <pointLight position={[0, 0, 10]} intensity={0.8} color="#ffffff" />
          
          {/* Background Stars */}
          {showStars && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
          
          {/* Enhanced Controls for 3D navigation */}
          {enableControls && (
            <OrbitControls 
              enableZoom={true} 
              enablePan={true} 
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxDistance={50}
              minDistance={5}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
            />
          )}
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
