import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

const skills = [
  { name: "MongoDB", level: 90, category: "backend", icon: "🍃" },
  { name: "Express.js", level: 85, category: "backend", icon: "⚡" },
  { name: "React", level: 95, category: "frontend", icon: "⚛️" },
  { name: "Node.js", level: 88, category: "backend", icon: "💚" },
  { name: "TypeScript", level: 85, category: "frontend", icon: "📘" },
  { name: "JavaScript", level: 95, category: "frontend", icon: "⭐" },
  { name: "Tailwind CSS", level: 90, category: "frontend", icon: "🎨" },
  { name: "Git & GitHub", level: 88, category: "tools", icon: "🔧" },
  { name: "REST APIs", level: 90, category: "backend", icon: "🔗" },
  { name: "Next.js", level: 80, category: "frontend", icon: "▲" }
];

const mernStack = [
  { name: "MongoDB", icon: "🍃", color: "from-green-500 to-green-600" },
  { name: "Express.js", icon: "⚡", color: "from-gray-500 to-gray-600" },
  { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
  { name: "Node.js", icon: "💚", color: "from-green-600 to-green-700" },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    if (!skillsRef.current || !isInView) return;

    const progressBars = skillsRef.current.querySelectorAll(".progress-fill");
    
    progressBars.forEach((bar, index) => {
      const level = skills[index].level;
      gsap.fromTo(bar, 
        { width: "0%" },
        { 
          width: `${level}%`, 
          duration: 1.5, 
          delay: index * 0.1,
          ease: "power3.out" 
        }
      );
    });
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--neon-purple)/0.05)] to-transparent" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[hsl(var(--neon-blue)/0.1)] rounded-full blur-[120px]" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[hsl(var(--neon-pink)/0.1)] rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-4 border border-[hsl(var(--neon-purple)/0.3)]">
              02. Skills
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Technologies I <span className="gradient-text">work with</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              I'm always expanding my skill set and staying up-to-date with the latest technologies
            </p>
          </motion.div>

          {/* MERN Stack Highlight */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-3xl p-8 neon-glow-purple">
              <h3 className="text-xl font-semibold text-center mb-8">
                <span className="gradient-text">MERN Stack</span> - My Core Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {mernStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="group relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="text-center p-6 rounded-2xl glass-card-hover cursor-pointer">
                      <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </div>
                      <span className="font-semibold">{tech.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* All Skills Grid */}
          <motion.div 
            ref={skillsRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="glass-card-hover rounded-xl p-5 cursor-pointer"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  transform: hoveredSkill === index ? 
                    "perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(10px)" : 
                    "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div
                    className="progress-fill h-full rounded-full bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))]"
                    style={{ 
                      boxShadow: hoveredSkill === index ? 
                        "0 0 20px hsl(var(--neon-purple) / 0.5)" : 
                        "none" 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
