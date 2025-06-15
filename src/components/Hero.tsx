
import { useEffect, useState } from "react";
import { ArrowDownIcon } from "lucide-react";
import { getGreeting } from "@/lib/utils";
import NamePrompt from "./hero/NamePrompt";
import ProfileImage from "./hero/ProfileImage";
import FloatingElements from "./hero/FloatingElements";
import HeroContent from "./hero/HeroContent";

const Hero = () => {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [visitorName, setVisitorName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  useEffect(() => {
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
      className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 pb-10 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,_119,_198,_0.3),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,_119,_198,_0.3),_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(120,_200,_255,_0.2),_transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <FloatingElements />
      
      <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row items-center gap-12 justify-between relative z-10">
        <div className="md:flex-1 text-center md:text-left">
          {showNamePrompt ? (
            <NamePrompt 
              visitorName={visitorName}
              setVisitorName={setVisitorName}
              onSubmit={handleNameSubmit}
            />
          ) : null}

          <HeroContent 
            greeting={greeting}
            name={name}
            cursorVisible={cursorVisible}
            visitorName={visitorName}
          />
        </div>
        
        <div className="md:flex-1 flex justify-center items-center">
          <ProfileImage />
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <a href="#services" className="flex flex-col items-center text-purple-300 hover:text-purple-200 transition-smooth">
          <span className="text-sm font-medium mb-2">Discover More</span>
          <ArrowDownIcon className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
