import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Frontend Developer Intern",
    company: "Tech Innovators Inc.",
    location: "Remote",
    duration: "Jan 2024 - Present",
    description: [
      "Developed responsive web applications using React and Tailwind CSS",
      "Collaborated with senior developers on large-scale projects",
      "Improved website performance by 40% through code optimization",
      "Participated in daily stand-ups and agile development processes",
    ],
    color: "neon-purple",
  },
  {
    title: "Web Development Intern",
    company: "Digital Solutions Ltd.",
    location: "Mumbai, India",
    duration: "Jun 2023 - Dec 2023",
    description: [
      "Built and maintained client websites using HTML, CSS, and JavaScript",
      "Integrated REST APIs and handled data management",
      "Worked on UI/UX improvements based on user feedback",
      "Assisted in testing and debugging web applications",
    ],
    color: "neon-blue",
  },
  {
    title: "Freelance Developer",
    company: "Self-employed",
    location: "Remote",
    duration: "Jan 2023 - May 2023",
    description: [
      "Completed multiple projects for small businesses",
      "Designed and developed custom WordPress themes",
      "Provided ongoing maintenance and support services",
      "Managed client relationships and project timelines",
    ],
    color: "neon-pink",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[hsl(var(--neon-pink)/0.08)] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[hsl(var(--neon-blue)/0.08)] rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-4 border border-[hsl(var(--neon-purple)/0.3)]">
              04. Experience
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              My <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              A timeline of my professional experience and internships
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-pink))] to-[hsl(var(--neon-blue))] hidden md:block" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-0 md:pl-20 mb-12 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] hidden md:block neon-glow-purple" />

                <motion.div 
                  className="glass-card-hover rounded-2xl p-6 md:p-8"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 0 40px hsl(var(--${exp.color}) / 0.3)`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold gradient-text">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-foreground mt-1">
                        <Briefcase size={16} className="text-primary" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end mt-2 md:mt-0 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
