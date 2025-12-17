import { useState, useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Mail, MapPin, Send, Phone } from "lucide-react";

const Contact = () => {
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

    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert("Message sent successfully! I’ll get back to you soon.");

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "pritiroy.manoj@gmail.com",
      href: "mailto:pritiroy.manoj@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9508586146",
      href: "tel:+919508586146",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
    },
  ];

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
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm mb-4">
            05. Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">
            Let’s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Open to frontend & MERN stack opportunities, freelance projects,
            and collaborations.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Contact Details</h3>

              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-xl glass-card">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            variants={itemVariants}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full input-style"
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full input-style"
              />

              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full input-style resize-none"
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : <>
                  <Send size={18} /> Send Message
                </>}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
