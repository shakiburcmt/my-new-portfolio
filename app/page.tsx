"use client";

import emailjs from "emailjs-com";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Download,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  X,
} from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

// Types for local page data and props.
type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  stack: string[];
  clientUrl: string;
  serverUrl: string;
  liveUrl: string;
};

type SkillCategory = {
  name: string;
  icon: ReactNode;
  items: string[];
};

type NavLink = {
  id: string;
  label: string;
};

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
};

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Page content.
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "SaaS Platform",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description:
      "A comprehensive financial analytics platform featuring real-time data visualization, dark mode, and secure authentication flows.",
    stack: ["Next.js", "TypeScript", "Recharts", "Supabase"],
    clientUrl: "https://github.com/shakiburcmt/fintech-dashboard",
    serverUrl: "https://github.com/shakiburcmt/fintech-dashboard",
    liveUrl: "https://fintech-demo.example.com",
  },
  {
    id: 2,
    title: "Lumina E-Commerce",
    category: "Web Application",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800",
    description:
      "Modern headless e-commerce solution with 3D product previews, AI-driven recommendations, and instant checkout.",
    stack: ["React", "Three.js", "Stripe", "Tailwind"],
    clientUrl: "https://github.com/shakiburcmt/lumina-ecommerce",
    serverUrl: "https://github.com/shakiburcmt/lumina-ecommerce",
    liveUrl: "https://lumina-store.example.com",
  },
  {
    id: 3,
    title: "Nebula AI Chat",
    category: "AI Integration",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description:
      "Conversational interface leveraging LLMs for code generation and technical support with syntax highlighting.",
    stack: ["OpenAI API", "Next.js", "Framer Motion", "Redis"],
    clientUrl: "https://github.com/shakiburcmt/nebula-ai-chat",
    serverUrl: "https://github.com/shakiburcmt/nebula-ai-chat",
    liveUrl: "https://nebula-ai.example.com",
  },
  {
    id: 4,
    title: "Estate Flow",
    category: "Real Estate",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    description:
      "Property management system enabling virtual tours and automated tenant screening processes.",
    stack: ["Vue", "Firebase", "Mapbox", "Node.js"],
    clientUrl: "https://github.com/shakiburcmt/estate-flow",
    serverUrl: "https://github.com/shakiburcmt/estate-flow",
    liveUrl: "https://estate-flow.example.com",
  },
];

const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    icon: <Layers className="w-5 h-5" />,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  },
  {
    name: "Backend",
    icon: <Cpu className="w-5 h-5" />,
    items: ["Node.js", "PostgreSQL", "GraphQL", "Redis", "Python"],
  },
  {
    name: "DevOps",
    icon: <Globe className="w-5 h-5" />,
    items: ["Docker", "AWS", "CI/CD", "Vercel", "Git"],
  },
];

const IMPACT_METRICS = [
  {
    value: "5+",
    label: "Years Building Web Products",
    detail: "Hands-on delivery across frontend, backend, and deployment.",
  },
  {
    value: "40+",
    label: "Projects Shipped",
    detail: "Production-ready apps with clean architecture and maintainable code.",
  },
  {
    value: "<24h",
    label: "Communication Response",
    detail: "Consistent updates, ownership, and reliable collaboration.",
  },
];

const CAREER_STORIES = [
  {
    title: "Performance-First Engineering",
    summary:
      "Optimized frontend bundles, caching, and rendering strategy to make apps faster and more stable under load.",
    result: "Faster user experience and better conversion quality.",
  },
  {
    title: "End-to-End Product Ownership",
    summary:
      "Handled architecture, API design, UI delivery, and deployment workflows with CI/CD in real projects.",
    result: "Features shipped with fewer blockers and cleaner handoff.",
  },
  {
    title: "Scalable Team Contribution",
    summary:
      "Collaborated with designers and product teams, wrote clear PRs, and improved codebase consistency.",
    result: "Higher delivery speed with maintainable code standards.",
  },
];

const TEAM_VALUES = [
  "Strong communication with product and design teams.",
  "Pragmatic decision-making with a quality mindset.",
  "Ownership from planning to production support.",
];

const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Stack" },
];

const PRIMARY_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 leading-none rounded-full bg-cyan-500 px-8 py-4 font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0";

const PRIMARY_BUTTON_COMPACT_CLASS =
  "inline-flex items-center justify-center gap-2 leading-none rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70 focus:ring-offset-2 focus:ring-offset-slate-950 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0";

const ANIMATED_GRADIENT_TEXT_CLASS =
  "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-[length:200%_auto]";
const MAIL_BUTTON_ICON_CLASS = "h-[18px] w-[18px] shrink-0";
const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "service_uka64zp";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_wa94irt";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "q1Z5NUYTux57WR_Iv";

// Contact modal with EmailJS submit.
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error("Email service configuration is missing.");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: "shakibur.cmt@gmail.com",
        reply_to: formData.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      alert("Message sent successfully! I will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      onClose();
    } catch (error: unknown) {
      console.error("Error sending message:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );
      alert(
        "Failed to send message via EmailJS. Opening your email app as fallback."
      );
      window.location.href =
        "mailto:shakibur.cmt@gmail.com?subject=Job%20Opportunity&body=Hi%20Shakibur,";
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1e293b] rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Send Message</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 resize-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${PRIMARY_BUTTON_COMPACT_CLASS} py-3 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            <span className="grid h-5 w-5 place-items-center">
              <Mail className={MAIL_BUTTON_ICON_CLASS} />
            </span>
            <span className="leading-none">
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>
          </button>
        </form>

        {submitError && (
          <p className="mt-3 text-xs text-rose-300 text-center">{submitError}</p>
        )}

        {/* Direct email fallback */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-sm text-slate-400 text-center">
            Or email me directly:{" "}
            <a
              href="mailto:shakibur.cmt@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              shakibur.cmt@gmail.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Shared card shell used in most sections.
const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hoverEffect = true,
}) => (
  <div
    className={`
      relative overflow-hidden
      bg-white/5 
      backdrop-blur-xl 
      border border-white/10 
      rounded-2xl 
      shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
      transition-all duration-500 ease-out
      ${
        hoverEffect
          ? "hover:bg-white/10 hover:border-white/20 hover:scale-[1.01] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
          : ""
      }
      ${className}
    `}
  >
    {children}
  </div>
);

// Project carousel (custom, no external slider lib).
const ProjectSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const ANIMATION_MS = 1300;
  const SLIDE_OFFSET = 12;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), ANIMATION_MS);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), ANIMATION_MS);
  };

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), ANIMATION_MS);
  };

  // Rotate projects every few seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      <div className="relative h-[590px] sm:h-[560px] md:h-[430px] lg:h-[460px] w-full perspective-1000">
        {/* Navigation arrows */}
        <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-30">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-white group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-30">
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-white group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Active slide */}
        <div className="w-full h-full relative">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0.25,
                x: direction * SLIDE_OFFSET,
                scale: 0.998,
                filter: "blur(1px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: -direction * SLIDE_OFFSET,
                scale: 0.998,
                filter: "blur(1px)",
              }}
              transition={{
                x: {
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                },
                opacity: {
                  duration: 1.1,
                  ease: [0.4, 0, 0.2, 1],
                },
                scale: {
                  duration: 1.1,
                  ease: [0.4, 0, 0.2, 1],
                },
                filter: {
                  duration: 1.1,
                  ease: [0.4, 0, 0.2, 1],
                },
              }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <GlassCard
                className="h-full flex flex-col md:flex-row p-0 group"
                hoverEffect={false}
              >
                {/* Project image */}
                <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60 z-10" />
                  <motion.img
                    src={PROJECTS[currentIndex].image}
                    alt={PROJECTS[currentIndex].title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>

                {/* Project content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                  <span className="text-cyan-400 text-sm tracking-wider uppercase mb-2 font-semibold">
                    {PROJECTS[currentIndex].category}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {PROJECTS[currentIndex].title}
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {PROJECTS[currentIndex].description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {PROJECTS[currentIndex].stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/5 text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid w-full gap-3 sm:grid-cols-3">
                    <a
                      href={PROJECTS[currentIndex].clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={PRIMARY_BUTTON_COMPACT_CLASS}
                    >
                      Client Code
                    </a>
                    <a
                      href={PROJECTS[currentIndex].serverUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={PRIMARY_BUTTON_COMPACT_CLASS}
                    >
                      Server Code
                    </a>
                    <a
                      href={PROJECTS[currentIndex].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={PRIMARY_BUTTON_COMPACT_CLASS}
                    >
                      Live Site
                    </a>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-3 mt-8">
        {PROJECTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-8 bg-cyan-400"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Main page.
export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Init EmailJS once on mount.
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Keep nav state synced with scroll position.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Pick the latest section that is above the viewport marker.
      const sections = NAV_LINKS.map((link) =>
        document.getElementById(link.id)
      );
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(NAV_LINKS[i].id);
          break;
        }
      }
    };

    // Run once so nav state is correct on initial render.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleContactClick = () => {
    scrollToSection("contact");
  };

  const handleViewWorkClick = () => {
    scrollToSection("projects");
  };

  const handleSendEmail = () => {
    setIsContactOpen(true);
  };

  // Reusable animation variants.
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
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.2), transparent 30%), radial-gradient(circle at 80% 12%, rgba(14,165,233,0.22), transparent 36%), radial-gradient(circle at 50% 88%, rgba(2,132,199,0.2), transparent 38%)",
            backgroundSize: "180% 180%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:120px_120px] opacity-25" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-14%] left-[-12%] w-[520px] h-[520px] bg-cyan-500/18 rounded-full mix-blend-screen blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 42, 0],
            y: [0, 24, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-[18%] right-[-12%] w-[620px] h-[620px] bg-sky-500/16 rounded-full mix-blend-screen blur-[130px]"
        />
        <motion.div
          animate={{ x: [0, -36, 0], y: [0, -16, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-[-20%] left-[16%] w-[640px] h-[640px] bg-blue-500/14 rounded-full mix-blend-screen blur-[130px]"
        />
      </div>

      {/* Modal layer */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Top navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.4)]">
              <Code2 size={18} />
            </div>
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity }}
              className={`text-sm sm:text-base md:text-lg font-extrabold tracking-tight ${ANIMATED_GRADIENT_TEXT_CLASS}`}
            >
              Md. Shakibur Rahman
            </motion.span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                aria-current={activeSection === link.id ? "page" : undefined}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400 focus:outline-none"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right-side actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Social links */}
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <a
                href="https://github.com/shakiburcmt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/shakiburcse/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <button
              onClick={handleContactClick}
              className={`${PRIMARY_BUTTON_COMPACT_CLASS} rounded-full px-5`}
            >
              Let&apos;s Talk
            </button>
          </div>

          <button
            onClick={handleContactClick}
            className={`md:hidden ${PRIMARY_BUTTON_COMPACT_CLASS} rounded-full px-3 py-2 text-xs`}
          >
            Let&apos;s Talk
          </button>
        </div>
      </motion.nav>

      {/* Main content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        {/* Hero */}
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="container mx-auto min-h-[80vh] flex flex-col justify-center items-center text-center mb-20"
        >
          {/* Profile image */}
          <motion.div variants={itemVariants} className="mb-8 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-500">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0f172a]">
                <img
                  src="/Shakibur.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Availability dot */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#0f172a] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-wide"
          >
            OPEN TO FULL-TIME SOFTWARE ENGINEERING ROLES
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8"
          >
            Building digital <br />
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity }}
              className={ANIMATED_GRADIENT_TEXT_CLASS}
            >
              experiences
            </motion.span>{" "}
            that matter.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            I&apos;m a Full Stack Developer specializing in high-performance web
            applications. I&apos;m actively seeking a permanent full-time software
            engineering role where I can contribute long-term product value.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4"
          >
            <button
              onClick={handleViewWorkClick}
              className={PRIMARY_BUTTON_CLASS}
            >
              View My Work
            </button>

            {/* Resume download */}
            <a
              href="/Resume of Md. Shakibur Rahman.pdf"
              download="Shakibur_Rahman_Resume.pdf"
              className={`${PRIMARY_BUTTON_CLASS} group`}
            >
              <Download
                size={20}
                className="group-hover:translate-y-1 transition-transform"
              />
              Download CV
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { label: "Experience", value: "5+ Yrs" },
              { label: "Projects", value: "40+" },
              { label: "Team Impact", value: "Cross-Functional" },
              { label: "Response", value: "< 24h" },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-6 flex flex-col items-center">
                <span className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </GlassCard>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="container mx-auto mb-32"
        >
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
          </div>

          <ProjectSlider />
        </motion.section>

        {/* Career value */}
        <motion.section
          id="impact"
          className="container mx-auto mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="relative z-20 py-16 px-4">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                Why Hire Me
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Engineering That Delivers <br /> Business Impact
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                I build scalable products, collaborate effectively with teams,
                and ship with ownership from architecture to production.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto mb-8">
              {IMPACT_METRICS.map((metric) => (
                <GlassCard
                  key={metric.label}
                  className="p-7 border-cyan-500/30 shadow-[0_0_24px_rgba(6,182,212,0.12)]"
                >
                  <p className="text-4xl font-black text-white mb-2">
                    {metric.value}
                  </p>
                  <p className="text-cyan-300 font-semibold text-sm uppercase tracking-wider mb-3">
                    {metric.label}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {metric.detail}
                  </p>
                </GlassCard>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
              {CAREER_STORIES.map((story, idx) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.18 }}
                >
                  <GlassCard className="p-8 h-full border-white/10 hover:border-cyan-500/40">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {story.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-5">
                      {story.summary}
                    </p>
                    <p className="text-cyan-300 text-sm font-semibold tracking-wide uppercase">
                      {story.result}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <GlassCard className="max-w-6xl mx-auto p-8 md:p-10 border-cyan-500/30">
              <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Team Fit and Ownership Mindset
                  </h3>
                  <ul className="space-y-4">
                    {TEAM_VALUES.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="/Resume of Md. Shakibur Rahman.pdf"
                    download="Shakibur_Rahman_Resume.pdf"
                    className={PRIMARY_BUTTON_CLASS}
                  >
                    Download Resume
                  </a>
                  <button
                    onClick={handleSendEmail}
                    className={PRIMARY_BUTTON_CLASS}
                  >
                    Contact for Interview
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto mb-32 max-w-5xl"
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technical Stack
            </h2>
            <p className="text-slate-400 text-center max-w-lg">
              I leverage the latest tools and technologies to build robust,
              scalable applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((category, idx) => (
              <GlassCard key={idx} className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-6">
                  {category.name}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-4xl"
        >
          <GlassCard className="p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to build with your team?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                I&apos;m currently looking for a permanent software engineering
                position. If you&apos;re hiring, I&apos;d love to connect.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                <button
                  onClick={handleSendEmail}
                  className={PRIMARY_BUTTON_CLASS}
                >
                  <span className="grid h-5 w-5 place-items-center">
                    <Mail className={MAIL_BUTTON_ICON_CLASS} />
                  </span>
                  <span className="leading-none">Send an Email</span>
                </button>
              </div>

              <div className="flex justify-center gap-6 pt-8 border-t border-white/10">
                {[
                  { Icon: Github, url: "https://github.com/shakiburcmt" },
                  {
                    Icon: Linkedin,
                    url: "https://www.linkedin.com/in/shakiburcse/",
                  },
                ].map(({ Icon, url }, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 hover:text-cyan-400 text-slate-400 transition-all"
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-slate-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Md. Shakibur Rahman. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

