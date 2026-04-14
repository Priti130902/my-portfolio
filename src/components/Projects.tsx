import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";
import gsap from "gsap";

// Project data 
const projects = [
  {
    title: "Wave Visas",
    description: "Overseas recruitment platform with automated workflow and visa tracking system.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", 
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    github: "https://github.com/Priti130902",
    live: "https://wave-visas.vercel.app/",
    accent: "from-purple-500 to-pink-500",
  },
  {
    title: "Asha Learnology",
    description: "Ed-tech platform with real-time progress tracking and interactive learning modules.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    tags: ["MERN Stack", "Socket.io", "Redux"],
    github: "https://github.com/Priti130902",
    live: "https://ashalearnology.vercel.app/",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    title: "Task Management AI",
    description: "Smart task organizer using AI to prioritize and categorize professional workflows.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    github: "https://github.com/Priti130902",
    live: "https://task-app-bice-three.vercel.app/",
    accent: "from-pink-500 to-orange-500",
  },
  {
    title: "ShramSetu-AI",
    description: "AI-powered bridge for employment opportunities and skill verification.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tags: ["React", "Express", "OpenAI API"],
    github: "https://github.com/Priti130902",
    live: "https://www.shramsetuai.com/",
    accent: "from-emerald-500 to-teal-500",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
  
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10; 
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
    setHoveredIndex(null);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 bg-[#030303] text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Featured <span className="text-purple-500">Work</span>
          </motion.h2>
          <div className="h-1 w-20 bg-purple-500 rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredIndex(index)}
              className="group relative bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Project Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90`} />
                
                {/* Floating Tech Badges on Image */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-tighter border border-white/10">
                    Case Study
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8" style={{ transform: "translateZ(50px)" }}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.live} className="text-gray-400 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${project.accent} blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;