import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "Wave Visas",
    location: "Remote",
    duration: "Apr 2025 – Oct 2025",
    description: [
      "Developed 20+ responsive web pages using React.js and Tailwind CSS",
      "Converted Figma designs into pixel-perfect UI components",
      "Worked closely with backend APIs for dynamic data rendering",
      "Improved UI performance and fixed cross-browser issues",
    ],
    color: "neon-purple",
  },
  {
    title: "MERN Stack Trainee",
    company: "Self Learning / Projects",
    location: "Remote",
    duration: "Jan 2024 – Mar 2024",
    description: [
      "Built full-stack MERN applications using MongoDB, Express, React, and Node.js",
      "Implemented authentication, protected routes, and REST APIs",
      "Created dashboards, forms, and reusable components",
      "Deployed projects on Vercel and Render",
    ],
    color: "neon-blue",
  },
  {
    title: "Freelance Frontend Developer",
    company: "Personal Projects",
    location: "Remote",
    duration: "2023",
    description: [
      "Designed and developed responsive websites using React and Tailwind CSS",
      "Focused on clean UI, accessibility, and mobile-first design",
      "Worked on portfolio websites and landing pages",
      "Maintained code quality using reusable components",
    ],
    color: "neon-pink",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // ✅ FIXED variants (TypeScript safe)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm mb-4">
            04. Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Internship & hands-on project experience in Frontend and MERN stack
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-0 md:pl-20 mb-12"
            >
              <div className="absolute left-5 top-8 w-3 h-3 rounded-full bg-primary hidden md:block" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card-hover rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold gradient-text">{exp.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {exp.duration}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
