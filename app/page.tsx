import { AnimatePresence, motion, useScroll } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";

/**
 * MOCK DATA
 */
const PROJECTS = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "SaaS Platform",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    description:
      "A comprehensive financial analytics platform featuring real-time data visualization, dark mode, and secure authentication flows.",
    stack: ["Next.js", "TypeScript", "Recharts", "Supabase"],
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
  },
];

const SKILLS = [
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

const SERVICES = [
  {
    title: "MVP Development",
    price: "Starter",
    features: [
      "Rapid Prototyping",
      "React/Next.js Stack",
      "Basic SEO Setup",
      "1 Month Support",
    ],
    popular: false,
  },
  {
    title: "Enterprise Solutions",
    price: "Global",
    features: [
      "Scalable Architecture",
      "Advanced Security",
      "CI/CD Pipelines",
      "24/7 Priority Support",
      "Multi-language Support",
    ],
    popular: true,
  },
  {
    title: "Tech Consultation",
    price: "Hourly",
    features: [
      "Code Review",
      "Architecture Planning",
      "Performance Audit",
      "Team Training",
    ],
    popular: false,
  },
];

/**
 * COMPONENTS
 */

// Reusable Glass Card Component
const GlassCard = ({ children, className = "", hoverEffect = true }) => (
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
    {/* Shine effect on hover */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500" />
    {children}
  </div>
);

// Custom "Swiper" Style Slider
const ProjectSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12">
      <div className="relative h-[500px] md:h-[400px] w-full perspective-1000">
        {/* Slider Controls */}
        <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-30">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-white group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-30">
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-white group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Slides */}
        <div className="w-full h-full relative">
          <AnimatePresence mode="popLayout">
            {PROJECTS.map((project, index) => {
              // Only render if it's the current, prev or next for performance, but keeping your logic for position classes
              let position = "translate-x-full opacity-0 scale-95 z-0";
              if (index === currentIndex) {
                position = "translate-x-0 opacity-100 scale-100 z-20";
              } else if (
                index === currentIndex - 1 ||
                (currentIndex === 0 && index === PROJECTS.length - 1)
              ) {
                position = "-translate-x-full opacity-0 scale-95 z-0";
              }

              return (
                <div
                  key={project.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${position}`}
                >
                  <GlassCard
                    className="h-full flex flex-col md:flex-row p-0 group"
                    hoverEffect={false}
                  >
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60 z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative bg-gradient-to-br from-white/5 to-transparent">
                      <span className="text-cyan-400 text-sm font-tracking-wider uppercase mb-2 font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/5 text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button className="w-fit flex items-center gap-2 text-white font-medium group/btn">
                        View Project
                        <span className="p-1 rounded-full bg-white/10 group-hover/btn:bg-cyan-500/20 transition-colors">
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {PROJECTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`
              h-2 rounded-full transition-all duration-300 
              ${
                idx === currentIndex
                  ? "w-8 bg-cyan-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

// Animated Map Background Component
const WorldMap = () => (
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    {/* Simplified Abstract Map Dots */}
    <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
    <div className="absolute top-[45%] left-[50%] w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700" />
    <div className="absolute top-[35%] left-[75%] w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000" />

    <svg
      className="w-full h-full stroke-white/10 fill-none"
      viewBox="0 0 800 400"
    >
      {/* Abstract curved lines connecting "continents" */}
      <path
        d="M100,200 Q250,100 400,200 T700,150"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      <path
        d="M50,300 Q300,350 500,250 T750,300"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    </svg>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Scroll progress for background parallax or indicators could be added here
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Work" },
    { id: "services", label: "Global" },
    { id: "skills", label: "Stack" },
    { id: "contact", label: "Contact" },
  ];

  // Animation variants
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
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      {/* BACKGROUND ANIMATION */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px]"
        />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse delay-2000" />
      </div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            scrolled
              ? "py-4 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5"
              : "py-6 bg-transparent"
          }
        `}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
              <Code2 size={18} />
            </div>
            <span className="text-white">
              Dev<span className="text-cyan-400">Folio</span>.
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(link.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(link.id);
                }}
                className={`
                  text-sm font-medium transition-colors hover:text-cyan-400 relative
                  ${
                    activeSection === link.id
                      ? "text-cyan-400"
                      : "text-slate-400"
                  }
                `}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                  />
                )}
              </a>
            ))}
          </div>

          {/* ACTIONS GROUP: ICONS + FLICKERING BUTTON */}
          <div className="hidden md:flex items-center gap-4">
            {/* Navbar Social Icons */}
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white text-sm font-medium transition-all relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Talk
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Flicker Effect Overlay */}
              <motion.div
                animate={{ opacity: [0, 0.2, 0, 0.1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  times: [0, 0.1, 0.2, 0.3, 1],
                }}
                className="absolute inset-0 bg-cyan-400/30 mix-blend-overlay"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MAIN CONTENT */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        {/* HERO SECTION */}
        <motion.section
          id="home"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="container mx-auto min-h-[80vh] flex flex-col justify-center items-center text-center mb-20"
        >
          {/* PROFILE IMAGE */}
          <motion.div variants={itemVariants} className="mb-8 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-purple-600">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0f172a]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400"
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Status Dot on Profile */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#0f172a] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold tracking-wide"
          >
            AVAILABLE FOR GLOBAL PROJECTS
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8"
          >
            Building digital <br />
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-[length:200%_auto]"
            >
              experiences
            </motion.span>{" "}
            that matter.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
          >
            I'm a Full Stack Developer specializing in high-performance web
            applications. Delivering enterprise-grade solutions to clients
            worldwide.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4"
          >
            <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              View My Work
            </button>

            {/* RESUME DOWNLOAD BUTTON */}
            <a
              href="/resume.pdf" // Placeholder path
              download="My_Resume.pdf"
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 group"
            >
              <Download
                size={20}
                className="group-hover:translate-y-1 transition-transform"
              />
              Download CV
            </a>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl"
          >
            {[
              { label: "Experience", value: "5+ Yrs" },
              { label: "Projects", value: "40+" },
              { label: "Clients", value: "Global" },
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

        {/* PROJECTS SLIDER SECTION */}
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

        {/* GLOBAL SERVICES / HUGE SECTION */}
        <motion.section
          id="services"
          className="container mx-auto mb-32 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {/* Background Map Graphic */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b]/50 to-[#0f172a] z-10" />
            <WorldMap />
          </div>

          <div className="relative z-20 py-16 px-4">
            <div className="text-center mb-16">
              <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm mb-2 block">
                Global Solutions
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Scale Your Business <br /> Without Borders
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Providing world-class development services to startups and
                enterprises across the globe. Optimized for performance,
                accessibility, and growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {SERVICES.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <GlassCard
                    className={`p-8 h-full flex flex-col ${
                      service.popular
                        ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                        : ""
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
                        {service.price}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-grow">
                      {service.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <CheckCircle className="w-5 h-5 text-cyan-500 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 rounded-xl font-bold transition-all ${
                        service.popular
                          ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                          : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                      }`}
                    >
                      Get Started
                    </button>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SKILLS GRID */}
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

        {/* CTA / CONTACT */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="container mx-auto max-w-4xl"
        >
          <GlassCard className="p-8 md:p-12 relative overflow-hidden">
            {/* Decorative background gradients inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to start your project?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                I'm currently looking for new opportunities. Whether you have a
                question or just want to say hi, my inbox is always open.
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-lg shadow-cyan-500/25"
                >
                  <Mail size={20} />
                  Send an Email
                </a>
                <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all backdrop-blur-md">
                  <ExternalLink size={20} />
                  Schedule Call
                </button>
              </div>

              <div className="flex justify-center gap-6 pt-8 border-t border-white/10">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
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

      {/* FOOTER */}
      <footer className="relative z-10 py-8 text-center text-slate-500 text-sm">
        <p>© 2024 DevFolio. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}
