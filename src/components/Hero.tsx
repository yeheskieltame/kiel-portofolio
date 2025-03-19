
import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 pb-10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-4 animate-slide-down opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
            Machine Learning Developer
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight text-balance">
            Hi, I'm Yeheskiel Yunus Tame
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6 text-balance">
            A passionate Machine Learning Developer with a keen interest in data science, web development, and crafting intelligent systems. Currently honing my skills through Bangkit Academy's Machine Learning Path.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <Button className="rounded-full px-8 py-6" size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="outline" className="rounded-full px-8 py-6" size="lg" asChild>
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <a href="#projects" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-smooth">
          <span className="text-sm font-medium mb-2">Scroll</span>
          <ArrowDownIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
