import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold gradient-text">
            Priti
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="#contact"
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-primary-foreground text-sm font-medium text-center hover:opacity-90 transition-opacity"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
