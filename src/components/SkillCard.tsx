
import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  icon: string;
  level: number;
  index: number;
}

const SkillCard = ({ name, icon, level, index }: SkillCardProps) => {
  // Check if icon is a URL or a predefined icon
  const isImageUrl = (icon: string) => {
    return icon.startsWith('http') || icon.startsWith('/');
  };

  return (
    <div 
      className={cn(
        "group p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover-scale",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
          <img src={icon} alt={name} className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <div className="w-full bg-secondary rounded-full h-1 mt-2">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${level}%`, transitionDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
