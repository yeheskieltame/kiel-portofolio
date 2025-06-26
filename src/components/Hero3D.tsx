
import { useEffect, useState } from "react";
import { ArrowDownIcon, Code, Database, Sparkles, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/utils";
import Scene3D from "./three/Scene3D";
import AnimatedShapes from "./three/AnimatedShapes";
import ParticleSystem from "./three/ParticleSystem";
import WalletDonation from "./WalletDonation";

const Hero3D = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
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

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 pb-10 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* 3D Background Scene - Simplified */}
      <div className="absolute inset-0 z-0">
        <Scene3D enableControls={false} showStars={true}>
          <AnimatedShapes />
          <ParticleSystem count={800} />
        </Scene3D>
      </div>

      {/* Subtle Background Overlay */}
      <div className="absolute inset-0 z-10 bg-black/20"></div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto text-center relative z-20">
        
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-white">Available for Projects</span>
        </div>

        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-shift">
              {greeting}
            </span>
            <span>{name}</span>
            <span className={`inline-block w-1 h-8 md:h-12 lg:h-16 ml-2 bg-gradient-to-b from-purple-400 to-blue-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Blockchain & AI Developer crafting the future with innovative solutions
          </p>
        </div>

        {/* Tech Stack Grid - Simplified */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-12">
          <div className="group p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-300">
            <Code className="w-6 h-6 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
          </div>
          <div className="group p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300">
            <BrainCircuit className="w-6 h-6 text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
          </div>
          <div className="group p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-400/50 transition-all duration-300">
            <Database className="w-6 h-6 text-green-400 mx-auto group-hover:scale-110 transition-transform" />
          </div>
          <div className="group p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-300">
            <Sparkles className="w-6 h-6 text-pink-400 mx-auto group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button 
            className="rounded-xl px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 text-lg font-semibold" 
            size="lg" 
            asChild
          >
            <a href="#services">View My Work</a>
          </Button>
          <Button 
            variant="outline" 
            className="rounded-xl px-8 py-3 border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 backdrop-blur-sm bg-white/5 text-lg font-semibold" 
            size="lg" 
            asChild
          >
            <a href="#contact">Get In Touch</a>
          </Button>
        </div>

        {/* Wallet Donation Section - Clean Integration */}
        <div className="max-w-md mx-auto">
          <WalletDonation variant="hero" className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6" />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow z-20">
        <a href="#services" className="flex flex-col items-center text-purple-300 hover:text-purple-200 transition-all duration-300">
          <span className="text-sm font-medium mb-2">Scroll to explore</span>
          <ArrowDownIcon className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default Hero3D;
