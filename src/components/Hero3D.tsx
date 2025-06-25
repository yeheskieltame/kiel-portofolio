import { useEffect, useState } from "react";
import { ArrowDownIcon, Code, Database, Sparkles, BrainCircuit, Blocks, Zap, Cpu, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/utils";
import Scene3D from "./three/Scene3D";
import AnimatedShapes from "./three/AnimatedShapes";
import ParticleSystem from "./three/ParticleSystem";
import CharacterScene from "./three/CharacterScene";

const Hero3D = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
    // Check if visitor name is already saved
    const savedName = localStorage.getItem("visitorName");
    if (savedName) {
      setVisitorName(savedName);
      setShowNamePrompt(false);
    } else {
      // Show name prompt after a delay
      const timer = setTimeout(() => {
        setShowNamePrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    const greetingText = getGreeting();
    let nameText = ", I'm Yeheskiel Yunus Tame";

    let greetingIndex = 0;
    let nameIndex = 0;
    let greetingTimer: ReturnType<typeof setInterval>;
    let nameTimer: ReturnType<typeof setInterval>;

    // Type out greeting
    greetingTimer = setInterval(() => {
      if (greetingIndex < greetingText.length) {
        setGreeting(prev => prev + greetingText.charAt(greetingIndex));
        greetingIndex++;
      } else {
        clearInterval(greetingTimer);
        
        // Start typing name after greeting
        nameTimer = setInterval(() => {
          if (nameIndex < nameText.length) {
            setName(prev => prev + nameText.charAt(nameIndex));
            nameIndex++;
          } else {
            clearInterval(nameTimer);
          }
        }, 50);
      }
    }, 70);

    // Blink cursor
    const cursorTimer = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => {
      clearInterval(greetingTimer);
      clearInterval(nameTimer);
      clearInterval(cursorTimer);
    };
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visitorName.trim()) {
      localStorage.setItem("visitorName", visitorName);
      setShowNamePrompt(false);
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 pb-10 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Scene3D enableControls={false} showStars={true}>
          <AnimatedShapes />
          <ParticleSystem count={1500} />
        </Scene3D>
      </div>

      {/* Traditional Background Gradients - reduced opacity */}
      <div className="absolute inset-0 z-10 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,_119,_198,_0.3),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,_119,_198,_0.3),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(120,_200,_255,_0.2),_transparent_50%)]"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row items-center gap-12 justify-between relative z-20">
        <div className="md:flex-1 text-center md:text-left">
          {showNamePrompt ? (
            <div className="animate-fade-in mb-10 p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
              <h3 className="text-xl font-medium mb-3 text-white">Welcome to my digital universe! 🚀</h3>
              <p className="mb-4 text-gray-300">I'd love to know who's exploring. What's your name?</p>
              <form onSubmit={handleNameSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  placeholder="Enter your name"
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-6 py-3">
                  Enter
                </Button>
              </form>
            </div>
          ) : visitorName ? (
            <div className="animate-fade-in mb-8">
              <p className="text-lg md:text-xl text-purple-300 font-medium">
                {getGreeting()} {visitorName}! Ready to explore the future? 🌟
              </p>
            </div>
          ) : null}

          <div className="space-y-6 animate-slide-down opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <div className="inline-flex gap-4 items-center justify-center md:justify-start mb-8">
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></span>
              <span className="inline-block py-2 px-4 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-400/30 backdrop-blur-sm">
                🚀 Blockchain & AI Developer
              </span>
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-shift">
                {greeting}
              </span>
              <span className="text-white">{name}</span>
              <span className={`inline-block w-1 h-10 md:h-12 lg:h-14 ml-2 bg-gradient-to-b from-purple-400 to-blue-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto md:mx-0 leading-relaxed mt-8 text-balance">
              Crafting the future with <span className="text-purple-400 font-semibold">blockchain technology</span>, 
              <span className="text-blue-400 font-semibold"> artificial intelligence</span>, and 
              <span className="text-pink-400 font-semibold"> innovative solutions</span>. 
              Let's build tomorrow, today! ⚡
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto md:mx-0">
              <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover-scale">
                <Code className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white block">Smart Contracts</span>
              </div>
              <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover-scale">
                <BrainCircuit className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white block">AI Models</span>
              </div>
              <div className="group p-4 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-400/30 hover:border-green-400/50 transition-all duration-300 hover-scale">
                <Database className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white block">Data Science</span>
              </div>
              <div className="group p-4 rounded-xl bg-gradient-to-br from-pink-600/20 to-rose-600/20 backdrop-blur-sm border border-pink-400/30 hover:border-pink-400/50 transition-all duration-300 hover-scale">
                <Sparkles className="w-8 h-8 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white block">Innovation</span>
              </div>
            </div>
          
            <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-6 mt-12 animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <Button 
                className="rounded-2xl px-10 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 text-lg font-semibold" 
                size="lg" 
                asChild
              >
                <a href="#services">Explore My Work 🚀</a>
              </Button>
              <Button 
                variant="outline" 
                className="rounded-2xl px-10 py-4 border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 backdrop-blur-sm bg-white/5 text-lg font-semibold" 
                size="lg" 
                asChild
              >
                <a href="#contact">Let's Connect 💫</a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Replaced profile image section with 3D Character */}
        <div className="md:flex-1 flex justify-center items-center">
          <div className="relative w-96 h-96">
            {/* 3D Character Scene */}
            <div className="absolute inset-0 z-10">
              <CharacterScene />
            </div>
            
            {/* Enhanced glowing background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-3xl opacity-70 animate-pulse"></div>
            <div className="absolute inset-4 bg-gradient-to-b from-cyan-500/15 via-purple-500/15 to-blue-500/15 rounded-full blur-2xl opacity-60 animate-pulse" style={{animationDelay: "1s"}}></div>
            
            {/* Floating tech icons around the character */}
            <div className="absolute top-8 right-8 animate-bounce-slow z-20">
              <div className="p-3 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm border border-yellow-400/40">
                <Blocks className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="absolute bottom-8 left-8 animate-bounce-slow z-20" style={{animationDelay: "1s"}}>
              <div className="p-3 rounded-full bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-sm border border-green-400/40">
                <Network className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="absolute top-16 left-4 animate-bounce-slow z-20" style={{animationDelay: "2s"}}>
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-purple-400/40">
                <Cpu className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="absolute bottom-16 right-4 animate-bounce-slow z-20" style={{animationDelay: "1.5s"}}>
              <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 backdrop-blur-sm border border-cyan-400/40">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow z-20">
        <a href="#services" className="flex flex-col items-center text-purple-300 hover:text-purple-200 transition-smooth">
          <span className="text-sm font-medium mb-2">Discover More</span>
          <ArrowDownIcon className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero3D;
