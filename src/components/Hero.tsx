
import { useEffect, useState } from "react";
import { ArrowDownIcon, Code, Database, Sparkles, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
    // Get time-based greeting
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 18) return "Good afternoon";
      return "Good evening";
    };

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
      className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 pb-10 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-theme-dark-light bg-circuit bg-cover bg-fixed opacity-10"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-theme-purple-light/10 to-theme-blue-light/10"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        {showNamePrompt ? (
          <div className="animate-fade-in mb-10 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
            <h3 className="text-xl font-medium mb-3 text-theme-dark">Welcome to my portfolio!</h3>
            <p className="mb-4 text-muted-foreground">I'd love to know who's visiting. What's your name?</p>
            <form onSubmit={handleNameSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-theme-purple"
                placeholder="Enter your name"
              />
              <Button type="submit" className="bg-theme-purple hover:bg-theme-purple-dark">
                Continue
              </Button>
            </form>
          </div>
        ) : visitorName ? (
          <div className="animate-fade-in mb-8">
            <p className="text-lg md:text-xl text-theme-purple font-medium">
              {getGreeting()} {visitorName}! Welcome to my portfolio
            </p>
          </div>
        ) : null}

        <div className="space-y-4 animate-slide-down opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
          <div className="inline-flex gap-4 items-center justify-center mb-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-theme-purple to-transparent"></span>
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-theme-purple/20 text-theme-purple border border-theme-purple/30">
              Machine Learning Developer
            </span>
            <span className="h-px w-16 bg-gradient-to-r from-transparent via-theme-purple to-transparent"></span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight text-balance bg-clip-text text-transparent bg-gradient-to-r from-theme-purple via-theme-blue to-theme-purple animate-gradient-shift bg-300%">
            {greeting}<span className="text-theme-dark">{name}</span>
            <span className={`inline-block w-1 h-8 md:h-10 lg:h-12 ml-1 bg-theme-purple ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6 text-balance">
            A passionate Machine Learning Developer with a keen interest in data science, web development, and crafting intelligent systems. Currently honing my skills through Bangkit Academy's Machine Learning Path.
          </p>

          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Code size={18} className="text-theme-purple" />
              <span className="text-sm font-medium">Web Development</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Database size={18} className="text-theme-blue" />
              <span className="text-sm font-medium">Data Science</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <BrainCircuit size={18} className="text-theme-purple-dark" />
              <span className="text-sm font-medium">Machine Learning</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100">
              <Sparkles size={18} className="text-theme-blue-dark" />
              <span className="text-sm font-medium">AI Development</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
          <Button 
            className="rounded-full px-8 py-6 bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90 transition-all duration-300 shadow-lg shadow-theme-purple/20" 
            size="lg" 
            asChild
          >
            <a href="#projects">View Projects</a>
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full px-8 py-6 border-theme-purple text-theme-purple hover:bg-theme-purple/10" 
            size="lg" 
            asChild
          >
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <a href="#projects" className="flex flex-col items-center text-theme-purple hover:text-theme-purple-dark transition-smooth">
          <span className="text-sm font-medium mb-2">Scroll</span>
          <ArrowDownIcon className="h-5 w-5" />
        </a>
      </div>

      <div className="absolute top-1/4 right-10 md:right-20 w-32 h-32 rounded-full bg-gradient-to-br from-theme-purple to-theme-blue opacity-20 blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-10 md:left-20 w-40 h-40 rounded-full bg-gradient-to-tr from-theme-blue to-theme-purple opacity-10 blur-xl animate-pulse" style={{animationDelay: "1s"}}></div>
    </section>
  );
};

export default Hero;
