
import React from 'react';
import { Blocks, BrainCircuit, Network, Zap, Cpu } from "lucide-react";

const FloatingElements: React.FC = () => {
  return (
    <>
      <div className="absolute top-20 left-10 animate-float">
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
          <Blocks className="w-6 h-6 text-blue-400" />
        </div>
      </div>
      <div className="absolute top-40 right-16 animate-float" style={{animationDelay: "1s"}}>
        <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30">
          <BrainCircuit className="w-6 h-6 text-purple-400" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float" style={{animationDelay: "2s"}}>
        <div className="p-3 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-green-500/30">
          <Network className="w-6 h-6 text-green-400" />
        </div>
      </div>
      <div className="absolute top-60 left-1/2 animate-float" style={{animationDelay: "0.5s"}}>
        <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30">
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
      </div>
      <div className="absolute bottom-60 right-1/3 animate-float" style={{animationDelay: "1.5s"}}>
        <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30">
          <Cpu className="w-4 h-4 text-cyan-400" />
        </div>
      </div>
    </>
  );
};

export default FloatingElements;
