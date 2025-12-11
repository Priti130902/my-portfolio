import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart functionality, payment integration, and admin dashboard built with MERN stack.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "MongoDB","Express"],
    github: "https://github.com",
    live: "https://wave-visas.vercel.app/",
    color: "neon-purple",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team features.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&h=400&fit=crop",
    tags: ["React", "Express", "Socket.io", "PostgreSQL"],
    github: "https://github.com",
    live: "https://ashalearnology.vercel.app/",
    color: "neon-blue",
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for tracking social media metrics with beautiful charts and data visualization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Next.js", "TypeScript", "Tailwind", "Chart.js"],
    github: "https://github.com",
    live: "https://task-app-bice-three.vercel.app/",
    color: "neon-pink",
  },
  {
    title: "Real-time Chat Application",
    description: "Feature-rich messaging platform with group chats, file sharing, and end-to-end encryption.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c2a40?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "Socket.io", "Redis"],
    github: "https://github.com",
    live: "https://example.com",
    color: "neon-purple",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    setHoveredIndex(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--neon-purple)/0.08)] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[hsl(var(--neon-blue)/0.08)] rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-4 border border-[hsl(var(--neon-purple)/0.3)]">
              03. Projects
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Some things I've <span className="gradient-text">built</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and experience
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => {
                  handleCardHover(e, index);
                  setHoveredIndex(index);
                }}
                onMouseLeave={handleCardLeave}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--neon-purple)/0.8)] to-transparent flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-full hover:neon-glow-purple transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={24} />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass-card rounded-full hover:neon-glow-blue transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={24} />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6" style={{ transform: "translateZ(30px)" }}>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-mono rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
