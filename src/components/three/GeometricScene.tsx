
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { OrbitControls, Environment, EffectComposer, Bloom, ChromaticAberration } from '@react-three/drei';
import GeometricHero from './GeometricHero';

const GeometricScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [4, 2, 4], fov: 60 }}
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
          <ambientLight intensity={0.3} color="#4C1D95" />
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.2} 
            color="#FFFFFF"
            castShadow
          />
          <pointLight 
            position={[-5, 3, 2]} 
            intensity={0.8} 
            color="#9F7AEA"
            distance={10}
          />
          <pointLight 
            position={[5, -3, -2]} 
            intensity={0.8} 
            color="#4FD1C7"
            distance={10}
          />
          <spotLight
            position={[0, 8, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#EC4899"
            castShadow
          />
          
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* Auto-rotating controls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
            enableDamping={true}
            dampingFactor={0.05}
          />
          
          {/* Main geometric hero */}
          <GeometricHero />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.5}
            />
            <ChromaticAberration 
              offset={[0.002, 0.002]}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GeometricScene;
