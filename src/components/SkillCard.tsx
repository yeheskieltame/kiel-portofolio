
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SkillCardProps {
  name: string;
  icon: string;
  level: number;
  index: number;
}

const SkillCard = ({ name, icon, level, index }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm",
        "bg-gradient-to-br from-white/5 to-white/10",
        "transition-all duration-500 hover:scale-105 hover:border-purple-500/50 hover:from-white/10 hover:to-white/20",
        "opacity-0 animate-fade-in overflow-hidden"
      )}
      style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Hover Border Animation */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 group-hover:from-purple-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
      
      {/* Floating Particles - very subtle */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500"></div>
      <div className="absolute top-4 right-6 w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" style={{ animationDelay: "0.3s" }}></div>
      
      <div className="relative z-10 flex items-center space-x-4">
        {/* Icon Container */}
        <div className="relative">
          <div className={cn(
            "w-14 h-14 flex items-center justify-center rounded-xl",
            "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/20",
            "group-hover:scale-110 group-hover:border-white/30 transition-all duration-300"
          )}>
            <img 
              src={icon} 
              alt={name} 
              className="h-8 w-8 object-contain filter group-hover:brightness-110 transition-all duration-300" 
            />
          </div>
          
          {/* Subtle Pulse Ring */}
          <div className="absolute inset-0 rounded-xl border border-purple-400/0 group-hover:border-purple-400/20 group-hover:scale-110 transition-all duration-500"></div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
            {name}
          </h3>
          
          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Proficiency</span>
              <span className={cn(
                "font-bold transition-colors duration-300",
                isHovered ? "text-purple-300" : "text-gray-300"
              )}>
                {level}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              {/* Progress Fill */}
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
                  "bg-gradient-to-r from-purple-400 to-blue-400"
                )}
                style={{ 
                  width: `${level}%`, 
                  transitionDelay: "300ms"
                }}
              >
                {/* Subtle Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accent - very subtle */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-purple-500/5 to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default SkillCard;
