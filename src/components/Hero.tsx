import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import gsap from "gsap";

const roles = [
  "Frontend Developer",
  "React Developer",
  "MERN Stack Developer",
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedText === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll(".floating-3d-shape");
      gsap.to(shapes, {
        x: (i) => mousePosition.x * (30 + i * 15),
        y: (i) => mousePosition.y * (30 + i * 15),
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [mousePosition]);

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-badge", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(".hero-title", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".hero-subtitle", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".hero-buttons", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".hero-social", 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.2"
    )
    .fromTo(".hero-image", 
      { opacity: 0, scale: 0.8, rotate: -10 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: "power3.out" },
      "-=0.8"
    );

    // Animate floating shapes continuously
    gsap.to(".shape-1", {
      y: "-=20",
      rotation: "+=360",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".shape-2", {
      y: "+=25",
      rotation: "-=360",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".shape-3", {
      x: "-=30",
      y: "+=15",
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="hero-parallax absolute inset-0 bg-gradient-to-br from-background via-background to-background">
        {/* Neon gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-[hsl(var(--neon-purple)/0.3)] to-[hsl(var(--neon-pink)/0.2)] rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-[hsl(var(--neon-blue)/0.3)] to-[hsl(var(--neon-purple)/0.2)] rounded-full blur-[100px] animate-pulse-slow animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[hsl(var(--neon-pink)/0.1)] via-[hsl(var(--neon-purple)/0.15)] to-[hsl(var(--neon-blue)/0.1)] rounded-full blur-[150px]" />
      </div>

      {/* 3D Floating Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-3d-shape shape-1 absolute top-[15%] left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] opacity-60 neon-glow-purple" 
          style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)` }} 
        />
        <div className="floating-3d-shape shape-2 absolute top-[20%] right-[15%] w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] opacity-50 neon-glow-blue" 
          style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * -15}deg)` }} 
        />
        <div className="floating-3d-shape shape-3 absolute bottom-[25%] left-[15%] w-24 h-24 rounded-3xl bg-gradient-to-br from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] opacity-40 neon-glow-pink rotate-45" 
          style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * 25}deg) rotateY(${mousePosition.x * 25}deg) rotate(45deg)` }} 
        />
        <div className="floating-3d-shape absolute bottom-[30%] right-[10%] w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))] opacity-50 neon-glow-purple" 
          style={{ transform: `perspective(1000px) rotateX(${mousePosition.y * -20}deg) rotateY(${mousePosition.x * -20}deg)` }} 
        />
        <div className="floating-3d-shape absolute top-[60%] left-[5%] w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-pink))] opacity-40 animate-float-delayed" />
        <div className="floating-3d-shape absolute top-[40%] right-[5%] w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))] opacity-30 animate-float-slow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div 
              className="hero-badge opacity-0"
              initial={{ opacity: 0, y: 20 }}
            >
              <span className="inline-block px-5 py-2.5 rounded-full glass-card text-sm text-muted-foreground mb-6 border border-[hsl(var(--neon-purple)/0.3)]">
                Welcome to my portfolio
              </span>
            </motion.div>

            <h1 className="hero-title opacity-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="gradient-text">Priti Kumari</span>
            </h1>

            <p className="hero-subtitle opacity-0 text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              <span className="text-foreground font-medium">
                {displayedText}
                <span className="inline-block w-[3px] h-[1.2em] bg-[hsl(var(--neon-purple))] ml-1 animate-pulse align-middle" />
              </span>
              <span className="hidden sm:inline">  MERN Stack Developer</span>
            </p>

            <p className="hero-subtitle opacity-0 text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10">
              I build exceptional digital experiences that are fast, accessible,
              and visually stunning. Let's turn your ideas into reality.
            </p>

            <div className="hero-buttons opacity-0 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.a
                href="#projects"
                className="btn-primary text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary text-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Priti_Kumari_Resume.pdf"
                className="btn-secondary text-foreground inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Download CV
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="hero-social opacity-0 flex items-center justify-center lg:justify-start gap-6 mt-10">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:priti@example.com", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-3 glass-card rounded-full text-muted-foreground hover:text-foreground transition-all duration-300 hover:neon-glow-purple"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right - Profile Image */}
          <div className="hero-image opacity-0 order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] rounded-full blur-[60px] opacity-50 scale-110" />
              
              {/* Profile Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden glass-card p-2"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[hsl(var(--neon-purple)/0.3)] to-[hsl(var(--neon-blue)/0.3)]">
                  <img
                    src="/myimage.jpeg"
                    alt="Priti Kumari - Frontend Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[hsl(var(--neon-purple)/0.3)] animate-spin-slow" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm">Scroll Down</span>
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
