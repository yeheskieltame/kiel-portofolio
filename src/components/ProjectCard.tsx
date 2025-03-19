
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";

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
        "group relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm hover-scale",
        "opacity-0 animate-slide-up",
      )}
      style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: "forwards" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 ease-in-out",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
            >
              {item}
            </span>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <Button size="sm" className="rounded-full gap-2" asChild>
            <a href={demoLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
          </Button>
          <Button size="sm" variant="outline" className="rounded-full gap-2" asChild>
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
