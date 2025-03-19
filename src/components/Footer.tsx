
import { Github, Facebook, Linkedin, Mail, Instagram, MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-medium tracking-tight">
              Yeheskiel Yunus Tame
            </a>
            <p className="text-muted-foreground mt-2 text-sm">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/yeheskieltame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://facebook.com/Yeheskiel-Yunus-Tame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a 
              href="https://instagram.com/skyrior_tame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/yeheskieltame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://discord.gg/skyriortame" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Discord"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
            <a 
              href="mailto:hello@example.com" 
              className="text-muted-foreground hover:text-foreground transition-smooth"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100 text-center text-sm text-muted-foreground">
          <p>Machine Learning Developer | Data Science Enthusiast</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
