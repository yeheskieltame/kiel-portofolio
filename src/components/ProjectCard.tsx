
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Sparkles, Zap } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  tech: string[];
  index: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  demoLink,
  githubLink,
  tech,
  index
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-purple-900/50 backdrop-blur-lg border border-purple-500/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500",
        "opacity-0 animate-slide-up hover-scale",
      )}
      style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
      
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-all duration-700 ease-in-out",
            isHovered ? "scale-110 brightness-110" : "scale-100"
          )}
        />
        
        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-70"
        )} />
        
        {/* Floating Action Buttons */}
        <div className={cn(
          "absolute top-4 right-4 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
        )}>
          <Button 
            size="sm" 
            className="rounded-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
            asChild
          >
            <a href={demoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button 
            size="sm" 
            className="rounded-full p-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
            asChild
          >
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Tech Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/80 backdrop-blur-sm border border-purple-400/30">
            <Sparkles className="w-3 h-3 text-purple-200" />
            <span className="text-xs font-medium text-purple-100">
              {tech.length} Technologies
            </span>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6 relative">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tech.slice(0, 4).map((item, techIndex) => (
            <span
              key={techIndex}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600/30 to-blue-600/30 text-purple-200 border border-purple-400/30 backdrop-blur-sm"
            >
              {item}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-gray-600/30 to-gray-700/30 text-gray-300 border border-gray-500/30">
              +{tech.length - 4} more
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 group-hover:scale-105 transition-transform" 
            asChild
          >
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          </Button>
          <Button 
            size="sm" 
            className="flex-1 rounded-xl bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 border border-gray-600/50 group-hover:scale-105 transition-transform" 
            asChild
          >
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <Github className="h-4 w-4" />
              <span>Source</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none",
        "bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-pink-600/5",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
    </div>
  );
};

export default ProjectCard;
