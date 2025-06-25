
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import LaptopCharacter from './LaptopCharacter';

const CharacterScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting optimized for character */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, 3, 2]} intensity={0.6} color="#9F7AEA" />
          <pointLight position={[5, -3, -2]} intensity={0.6} color="#4FD1C7" />
          
          {/* Auto-rotating controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 3}
          />
          
          <LaptopCharacter />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CharacterScene;
