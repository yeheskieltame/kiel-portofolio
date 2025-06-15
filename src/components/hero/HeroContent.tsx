
import React from 'react';
import { Code, Database, Sparkles, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGreeting } from "@/lib/utils";

interface HeroContentProps {
  greeting: string;
  name: string;
  cursorVisible: boolean;
  visitorName: string;
}

const HeroContent: React.FC<HeroContentProps> = ({ greeting, name, cursorVisible, visitorName }) => {
  return (
    <div className="md:flex-1 text-center md:text-left">
      {visitorName && (
        <div className="animate-fade-in mb-8">
          <p className="text-lg md:text-xl text-purple-300 font-medium">
            {getGreeting()} {visitorName}! Ready to explore the future? 🌟
          </p>
        </div>
      )}

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
  );
};

export default HeroContent;
