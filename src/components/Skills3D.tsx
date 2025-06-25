
import Scene3D from "./three/Scene3D";
import SolarSystemSkills from "./three/SolarSystemSkills";
import { useAdminData } from "./admin/AdminDataContext";
import { Brain, Code, Globe } from "lucide-react";

const Skills3D = () => {
  const { skills, isLoading } = useAdminData();

  if (isLoading) {
    return (
      <section id="skills" className="py-16 px-6 md:px-10 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(120,119,198,0.05)_75%,rgba(120,119,198,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-pulse-slow"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">Loading 3D Solar System...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-16 px-6 md:px-10 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(120,119,198,0.05)_25%,rgba(120,119,198,0.05)_26%,transparent_27%,transparent_74%,rgba(120,119,198,0.05)_75%,rgba(120,119,198,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 opacity-0 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-4">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-300 text-sm font-medium">3D Tech Solar System</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <p className="text-gray-300 max-w-2xl mx-auto text-base leading-relaxed mb-4">
            Explore my technical expertise in an interactive 3D solar system
          </p>

          {/* Legend */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 text-sm">Programming</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-purple-400 text-sm">ML & AI</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-400" />
              <span className="text-green-400 text-sm">Web Dev</span>
            </div>
          </div>
        </div>

        {/* 3D Solar System */}
        <div className="h-[600px] w-full opacity-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <Scene3D enableControls={true} showStars={false} className="rounded-2xl border border-white/10">
            <SolarSystemSkills skills={skills} />
          </Scene3D>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <p className="text-gray-400 text-sm">
            🖱️ Click and drag to rotate • 🔍 Scroll to zoom • ✨ Hover planets for details
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills3D;
