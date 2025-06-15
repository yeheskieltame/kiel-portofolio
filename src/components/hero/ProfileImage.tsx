
import React from 'react';
import { Blocks, Network } from "lucide-react";

const ProfileImage: React.FC = () => {
  return (
    <div className="relative w-80 h-80">
      {/* Circle borders and effects - positioned lower to not cut the head */}
      <div className="absolute top-20 left-0 w-80 h-80 z-10">
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-spin" style={{animationDuration: "10s"}}></div>
        <div className="absolute inset-2 rounded-full border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin" style={{animationDuration: "8s", animationDirection: "reverse"}}></div>
        
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 via-blue-500/30 to-pink-500/30 rounded-full blur-2xl opacity-70 animate-pulse"></div>
      </div>
      
      {/* Profile Image - positioned to show head outside circle */}
      <div className="relative w-80 h-80 z-20">
        <img 
          src="/lovable-uploads/ac05b5d9-c668-494e-9575-2f216c149e65.png" 
          alt="Yeheskiel Yunus Tame - Blockchain & AI Developer" 
          className="w-80 h-80 object-cover shadow-2xl"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 75%, 75% 100%, 25% 100%, 0 75%)",
          }}
        />
        
        {/* Circle mask overlay for bottom part */}
        <div 
          className="absolute top-20 left-0 w-80 h-60 rounded-full border-4 border-white/20 bg-transparent z-30"
          style={{
            clipPath: "polygon(0 25%, 100% 25%, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>
      
      {/* Floating tech icons around profile */}
      <div className="absolute top-4 right-4 animate-bounce-slow z-30">
        <div className="p-2 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm">
          <Blocks className="w-5 h-5 text-yellow-400" />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 animate-bounce-slow z-30" style={{animationDelay: "1s"}}>
        <div className="p-2 rounded-full bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-sm">
          <Network className="w-5 h-5 text-green-400" />
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
