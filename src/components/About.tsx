import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code is my priority.",
      color: "neon-purple",
    },
    {
      icon: Palette,
      title: "UI/UX Focused",
      description: "Creating beautiful interfaces that users love to interact with.",
      color: "neon-pink",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing applications for speed and best user experience.",
      color: "neon-blue",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Delivering high-quality projects within the deadline.",
      color: "neon-purple",
    },
  ];

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".tilt-card");
    
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      
      cardElement.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = cardElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(cardElement, {
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      cardElement.addEventListener("mouseleave", () => {
        gsap.to(cardElement, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[hsl(var(--neon-purple)/0.1)] to-transparent rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-r from-[hsl(var(--neon-blue)/0.1)] to-transparent rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-4 border border-[hsl(var(--neon-purple)/0.3)]">
              01. About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Get to know <span className="gradient-text">me better</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Hello! I'm <span className="text-foreground font-semibold">Priti Kumari</span>, a passionate Frontend Developer with expertise in the 
                  MERN stack. I love turning complex problems into simple, beautiful, and 
                  intuitive solutions.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
                <p className="text-muted-foreground leading-relaxed">
                  My journey in web development started 3 years ago, and since then I've had 
                  the privilege of working on various projects ranging from small business 
                  websites to complex web applications.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="glass-card rounded-2xl p-8">
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or enjoying a good cup of coffee 
                  while reading tech blogs.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium group"
                  whileHover={{ x: 5 }}
                >
                  Let's work together 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div 
              ref={cardsRef}
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`tilt-card glass-card-hover rounded-2xl p-6 cursor-pointer ${index === 0 || index === 3 ? 'translate-y-4' : ''}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                    <div className={`p-3 rounded-xl bg-gradient-to-r from-[hsl(var(--${item.color})/0.2)] to-[hsl(var(--${item.color})/0.1)] mb-4 w-fit`}>
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
