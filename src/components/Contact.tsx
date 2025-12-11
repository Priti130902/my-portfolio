import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send, Phone, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "priti@example.com",
      href: "mailto:priti@example.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mumbai, India",
      href: "#",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--neon-purple)/0.1)] rounded-full blur-[120px]" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[hsl(var(--neon-blue)/0.1)] rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm text-primary mb-4 border border-[hsl(var(--neon-purple)/0.3)]">
              05. Contact
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              Let's <span className="gradient-text">connect</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              I'm currently available for freelance work and full-time opportunities.
              If you have a project in mind, let's talk!
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Contact Info */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="glass-card rounded-2xl p-8 neon-glow-blue">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-3 rounded-xl glass-card group-hover:neon-glow-purple transition-all">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground">{item.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.div 
                className="glass-card rounded-2xl p-8"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-4">Let's work together</h3>
                <p className="text-muted-foreground">
                  I'm passionate about building great products and always excited to
                  collaborate on interesting projects. Whether you need a website,
                  web application, or technical consultation, I'd love to hear from you.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="glass-card rounded-2xl p-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-primary-foreground flex items-center justify-center gap-2 disabled:opacity-70"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
