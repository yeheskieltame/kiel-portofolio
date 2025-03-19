
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-smooth px-6 py-4 md:px-10",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#home"
          className="font-medium text-xl tracking-tight transition-smooth hover:opacity-80"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-purple to-theme-blue">Portfolio</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-theme-purple transition-smooth"
            >
              {item.name}
            </a>
          ))}
          <Button className="rounded-full px-6 bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90 transition-all duration-300 shadow-md shadow-theme-purple/20" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-theme-purple" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white/95 backdrop-blur-sm z-40 pt-20 px-6 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center space-y-6">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-medium hover:text-theme-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <Button className="rounded-full w-full bg-gradient-to-r from-theme-purple to-theme-blue hover:opacity-90">
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
