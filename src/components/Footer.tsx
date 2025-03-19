
import { Github, Facebook, Linkedin, Mail, Instagram, MessageSquare, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-theme-dark text-white py-12 px-6 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-circuit bg-cover bg-fixed opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-purple via-theme-blue to-theme-purple"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-medium tracking-tight text-gradient bg-gradient-to-r from-white via-theme-purple-light to-white bg-clip-text">
              Yeheskiel Yunus Tame
            </a>
            <p className="text-gray-400 mt-2 text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-5">
            <a 
              href="https://github.com/yeheskieltame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-smooth"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://facebook.com/Yeheskiel-Yunus-Tame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-smooth"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/skyrior_tame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-smooth"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/yeheskieltame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://discord.gg/skyriortame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-smooth"
              aria-label="Discord"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
            <a 
              href="mailto:yeheskielyunustame13@gmail.com" 
              className="text-gray-400 hover:text-white transition-smooth"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span>Machine Learning Developer | Data Science Enthusiast</span>
            <span className="inline-flex items-center">
              Made with <Heart className="h-3 w-3 text-theme-purple mx-1" /> in React
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
