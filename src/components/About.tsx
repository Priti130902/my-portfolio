import { useRef, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Code2, Palette, Rocket, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // 🔹 MERN focused highlights
  const highlights = [
    {
      icon: Code2,
      title: "MERN Stack Development",
      description: "Building full-stack applications using MongoDB, Express, React & Node.js.",
      color: "neon-purple",
    },
    {
      icon: Palette,
      title: "Modern UI / UX",
      description: "Responsive, accessible & clean UI using Tailwind CSS and animations.",
      color: "neon-pink",
    },
    {
      icon: Rocket,
      title: "High Performance Apps",
      description: "Optimized APIs, fast rendering and scalable architecture.",
      color: "neon-blue",
    },
    {
      icon: Zap,
      title: "Fast & Reliable Delivery",
      description: "From idea to deployment with clean code & best practices.",
      color: "neon-purple",
    },
  ];

  // 🔹 Card 3D tilt effect
  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      const el = card as HTMLElement;

      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(el, {
          rotateX: (y - rect.height / 2) / 12,
          rotateY: (rect.width / 2 - x) / 12,
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const reset = () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
    });
  }, []);

  // 🔹 FIXED variants (TypeScript safe)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm mb-4">
            01. About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            MERN Stack <span className="gradient-text">Developer</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.p variants={itemVariants} className="glass-card p-6 rounded-xl text-lg">
              Hi, I’m <strong>Priti Kumari</strong> — a passionate MERN Stack Developer.
              I build scalable web applications with clean UI and powerful backend logic.
            </motion.p>

            <motion.p variants={itemVariants} className="glass-card p-6 rounded-xl">
              I specialize in React, Node.js, Express and MongoDB with experience in REST APIs,
              authentication, dashboards and modern frontend animations.
            </motion.p>

            <motion.p variants={itemVariants} className="glass-card p-6 rounded-xl">
              I love solving real-world problems, improving performance and delivering
              production-ready applications.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            ref={cardsRef}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="tilt-card glass-card-hover p-6 rounded-xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div style={{ transform: "translateZ(30px)" }}>
                  <item.icon className="w-7 h-7 mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
