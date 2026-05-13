"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });

/* ─────────────────────────────────────── DATA ───────────────────────────── */

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { value: 7,  suffix: "+", label: "YEARS EXPERIENCE" },
  { value: 50, suffix: "+", label: "APPS SHIPPED" },
  { value: 3,  suffix: "",  label: "COUNTRIES SERVED" },
  { value: 15, suffix: "+", label: "TEAM MEMBERS LED" },
];

const PILLARS = [
  { label: "FOUNDATION",     text: "2.5 Years Native Android development starting in 2016." },
  { label: "SPECIALIZATION", text: "Focused on React Native since mid-2019 for high-performance apps." },
  { label: "LEADERSHIP",     text: "3+ Years leading teams and managing international client projects." },
];

const FEATURED = [
  {
    name: "Moshi AI", year: "2025",
    tags: ["NEXT.JS", "AI"],
    desc: "Built a virtual assistant capable of researching, summarising, and generating digital content like images, videos, and documents.",
    glow: "#1a4fff", from: "#03091c", via: "#070f2b",
  },
  {
    name: "TalkToo", year: "2024",
    tags: ["REACT NATIVE", "GEN AI"],
    desc: "Enhanced performance by 80% using optimization techniques. Built reusable UI components and integrated generative AI tools.",
    glow: "#6600ff", from: "#0a0a1a", via: "#110f28",
  },
  {
    name: "SoundGen AI", year: "2024",
    tags: ["TAILWIND CSS", "WEB"],
    desc: "Redesigned UI and improved load time from 5s to under 300ms using code-splitting and dynamic imports.",
    glow: "#00c488", from: "#031710", via: "#071f18",
  },
  {
    name: "Skill India Digital", year: "2023",
    tags: ["E-GOV", "SCALE"],
    desc: "Created multilingual interfaces for onboarding and profile flows. Integrated eKYC using Aadhaar APIs for a national platform.",
    glow: "#0055ff", from: "#080d20", via: "#0e1430",
  },
];

const SKILL_GROUPS = [
  { label: "CORE TECHNOLOGIES",   items: ["React Native", "TypeScript", "React JS", "Node JS", "Next JS"] },
  { label: "STATE & PERFORMANCE", items: ["Redux-Saga", "React Query", "Context API", "NativeBase", "Tailwind CSS"] },
  { label: "GENERATIVE AI",       items: ["OpenAI", "Gemini", "Claude", "Google AI"] },
  { label: "NATIVE DEVELOPMENT",  items: ["Swift", "Kotlin", "Java", "Android Studio", "Xcode"] },
  { label: "TOOLS & WORKFLOW",    items: ["Git", "Firebase", "GraphQL", "ESLint", "Figma"] },
];

const EXPERIENCE = [
  {
    title: "Sr. Software Engineer",
    company: "Agile Soft System Inc.",
    period: "March 2024 – Current",
    desc: "Leading frontend and mobile development using React Native, React.js, and Next.js. Improved system performance and usability by optimizing components and backend APIs in Node.js. Mentored developers and automated workflows using Google Apps Script.",
    tags: ["NODE.JS", "NEXT.JS", "LEADERSHIP"],
  },
  {
    title: "Team Lead (React Native)",
    company: "Shine Infosoft",
    period: "July 2023 – Feb 2024",
    desc: "Revamped legacy code into modular React Native components, improving app performance and user experience. Leveraged Redux-Saga and Context API for robust state management. Collaborated on version control and supported QA coordination.",
    tags: ["REDUX-SAGA", "TYPESCRIPT"],
  },
  {
    title: "Team Lead",
    company: "Excellent Web World",
    period: "July 2022 – July 2023",
    desc: "Developed high-quality cross-platform features using React Native. Integrated Firebase for authentication and real-time functionality. Maintained code quality with ESLint and Prettier.",
    tags: ["FIREBASE", "REACT NATIVE"],
  },
];

/* ─────────────────────────────── HELPERS ───────────────────────────────── */

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

function Reveal({
  children, delay = 0, y = 28, className = "",
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─────────────────────────────── NAVBAR ────────────────────────────────── */

function Navbar() {
  const scrolled = useScrolled();
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(12,12,20,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="font-display font-bold text-base text-white tracking-tight">
          Hitanshu Gajjar
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="nav-link font-body">{l.label}</Link>
          ))}
        </div>
        <Link href="mailto:hitanshu.hexxum@gmail.com" className="btn-ghost text-[11px] py-2 px-4">
          Resume
        </Link>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────────── HERO ──────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Three.js canvas fills the whole hero ── */}
      <ThreeBackground />

      {/* left-side readability gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(12,12,20,0.92) 0%, rgba(12,12,20,0.70) 42%, rgba(12,12,20,0.15) 68%, transparent 85%)",
        }}
      />
      {/* bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0c0c14)" }}
      />

      {/* purple right accent */}
      <div className="side-border-right" />

      {/* ── Content ── */}
      <div className="container relative z-10 pt-20">
        <div className="max-w-[520px]">

          {/* status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="mono-label text-[10px] text-white/50 tracking-[0.2em]">
              AVAILABLE FOR NEW OPPORTUNITIES
            </span>
          </motion.div>

          {/* name — two-line stagger */}
          <div className="mb-5 overflow-hidden">
            {["Hitanshu", "Gajjar"].map((word, i) => (
              <motion.div
                key={word}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 + i * 0.12 }}
                className="block font-display font-extrabold leading-[0.95] tracking-tight"
                style={{ fontSize: "clamp(3.4rem, 7vw, 5.2rem)" }}
              >
                <span className={i === 1 ? "teal-text" : "text-white"}>{word}</span>
              </motion.div>
            ))}
          </div>

          {/* role line */}
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mono-label text-[11px] text-teal-400/70 mb-5 tracking-[0.22em]"
          >
            SENIOR SOFTWARE ENGINEER · REACT NATIVE &amp; FRONTEND
          </motion.p>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.72 }}
            className="text-white/45 text-[15px] leading-relaxed mb-8 font-body"
          >
            Crafting high-performance, intuitive mobile &amp; web experiences
            with 7 years of real-world engineering across 3 countries.
          </motion.p>

          {/* stats — minimal horizontal strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.88 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10"
          >
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-teal-400 leading-none"
                    style={{ fontSize: "clamp(1.2rem,2vw,1.5rem)" }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mono-label text-[8px] text-white/28 mt-0.5">{s.label}</span>
                </div>
                {i < STATS.length - 1 && (
                  <span className="w-px h-7 bg-white/10 hidden sm:block" />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.02 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="#projects" className="btn-primary">
              View Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="#contact" className="btn-ghost">
              Contact Me
            </Link>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-teal-400/50 to-transparent"
          animate={{ scaleY: [1, 0.35, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────── ABOUT ─────────────────────────────────── */

function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        {/* heading */}
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(1.9rem,3.8vw,2.8rem)" }}>
              Bridging Design &amp; Scalable Engineering
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-4 font-body">
              I&apos;m Hitanshu Gajjar, a Frontend-focused Software Engineer with over 7 years of experience building robust and scalable applications. My journey began in late 2016 as an Android Developer, where I spent 2.5 years honing core mobile development skills.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto font-body">
              My approach emphasises performance, usability, and clean, maintainable code — whether I&apos;m tackling a startup MVP or contributing to large-scale applications. I&apos;ve recently been integrating Generative AI tools (OpenAI, Gemini, Claude) into production applications.
            </p>
          </Reveal>
        </div>

        {/* pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/[0.07] rounded-xl overflow-hidden">
          {PILLARS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <div className={`pillar-card h-full ${i < 2 ? "md:border-r border-white/[0.07]" : ""}`}
                style={{ borderLeft: "none" }}>
                <p className="mono-label mb-3">{p.label}</p>
                <p className="text-white/60 text-sm leading-relaxed font-body">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── PROJECTS ────────────────────────────────── */

function ProjectCard({ p, i }: { p: typeof FEATURED[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="card overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* image area */}
      <div className="project-img"
        style={{ background: `linear-gradient(135deg, ${p.from}, ${p.via}, #0c0c14)` }}
      >
        {/* radial glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
            style={{ backgroundColor: p.glow }} />
        </div>
        {/* subtle grid */}
        <div className="absolute inset-0 dot-grid opacity-[0.06]" />
        {/* animated corner grid lines */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* overlay fade to card bg */}
        <div className="project-img-overlay" />
        {/* tech tags */}
        <div className="absolute top-3 right-3 flex gap-1.5 z-10">
          {p.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-white/70 border border-white/20 rounded bg-black/40 backdrop-blur-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display font-bold text-white text-lg group-hover:text-teal-300 transition-colors">
            {p.name}
          </h3>
          <span className="mono-label text-[10px] text-white/30">{p.year}</span>
        </div>
        <p className="text-white/50 text-sm leading-relaxed mb-4 font-body">{p.desc}</p>
        <Link href="/projects" className="explore-link">
          Explore Project <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <p className="mono-label mb-3">SELECTED WORKS</p>
            <h2 className="font-display font-bold text-white"
              style={{ fontSize: "clamp(1.9rem,3.8vw,2.8rem)" }}>
              Featured Projects
            </h2>
          </div>
          <Link href="/projects" className="explore-link text-white/40 hover:text-teal-400 transition-colors">
            View Archive <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURED.map((p, i) => <ProjectCard key={p.name} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────── SKILLS ────────────────────────────────── */

function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
          {/* left */}
          <Reveal>
            <p className="mono-label mb-4">EXPERTISE</p>
            <h2 className="font-display font-bold text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
              Technical Proficiency
            </h2>
            <p className="text-white/45 text-sm leading-relaxed font-body">
              Mastering the stack to build high-performance mobile and web ecosystems. My toolkit is centred on React Native and scalable frontend architectures.
            </p>
          </Reveal>

          {/* right — skill groups */}
          <div className="flex flex-col gap-8">
            {SKILL_GROUPS.map((g, gi) => (
              <Reveal key={g.label} delay={gi * 0.08}>
                <p className="mono-label text-[10px] text-white/35 mb-3">{g.label}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((skill, si) => (
                    <motion.span
                      key={skill}
                      className="skill-chip"
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.28, delay: gi * 0.05 + si * 0.04 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── EXPERIENCE ──────────────────────────────── */

function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <Reveal>
            <p className="mono-label mb-3">PROFESSIONAL JOURNEY</p>
            <h2 className="font-display font-bold text-white"
              style={{ fontSize: "clamp(1.9rem,3.8vw,2.8rem)" }}>
              Work History
            </h2>
          </Reveal>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* timeline */}
          <div className="relative pl-8">
            {/* animated line */}
            <motion.div
              className="absolute left-0 top-3 w-px bg-gradient-to-b from-teal-400/60 to-transparent"
              initial={{ height: 0 }}
              whileInView={{ height: "calc(100% - 16px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            />

            <div className="flex flex-col gap-8">
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={exp.company} delay={i * 0.12} y={20}>
                  <div className="relative">
                    {/* dot */}
                    <div className="absolute -left-[35px] top-1.5 timeline-dot" />

                    {/* card */}
                    <div className="card p-6 hover:border-teal-400/20 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-display font-bold text-white text-base leading-tight mb-0.5">
                            {exp.title}
                          </h3>
                          <p className="text-teal-400 text-sm font-medium">{exp.company}</p>
                        </div>
                        <span className="mono-label text-[10px] text-white/30 shrink-0">{exp.period}</span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-4 font-body">{exp.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[9px] mono-label text-white/40 border border-white/10 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── CTA ──────────────────────────────────── */

function CTASection() {
  return (
    <section id="contact" className="section-sm">
      <div className="container">
        <Reveal>
          <div className="card rounded-2xl p-12 sm:p-16 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #111119 0%, #0f0f1c 100%)" }}
          >
            {/* background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #5eead4, #7c3aed)" }} />
            {/* content */}
            <div className="relative z-10">
              <p className="mono-label mb-6">AVAILABLE FOR HIRE</p>
              <h2 className="font-display font-bold text-white mb-4"
                style={{ fontSize: "clamp(1.9rem,4vw,3rem)" }}>
                Let&apos;s build something{" "}
                <span className="italic-teal">visionary</span> together.
              </h2>
              <p className="text-white/45 text-base max-w-md mx-auto mb-10 font-body">
                Currently open to high-impact opportunities in React Native architecture and frontend engineering.
              </p>
              <div className="flex items-center justify-center flex-wrap gap-4">
                <Link href="mailto:hitanshu.hexxum@gmail.com" className="btn-outline-white">
                  Get In Touch
                </Link>
                <Link href="https://github.com/HItanshuGajjar" target="_blank"
                  className="p-3 rounded-lg border border-white/15 hover:border-teal-400/40 hover:bg-teal-400/10 transition-all">
                  <Github className="w-4 h-4 text-white/50" />
                </Link>
                <Link href="https://www.linkedin.com/in/hitanshu-gajjar/" target="_blank"
                  className="p-3 rounded-lg border border-white/15 hover:border-teal-400/40 hover:bg-teal-400/10 transition-all">
                  <Linkedin className="w-4 h-4 text-white/50" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────── FOOTER ────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-white/70 text-sm">Hitanshu Gajjar</span>
        <span className="font-body text-white/25 text-xs text-center">
          © 2024 Hitanshu Gajjar. Built with precision and vision.
        </span>
        <div className="flex items-center gap-6">
          <Link href="mailto:hitanshu.hexxum@gmail.com" className="footer-link">Email</Link>
          <Link href="https://www.linkedin.com/in/hitanshu-gajjar/" target="_blank" className="footer-link">LinkedIn</Link>
          <Link href="https://github.com/HItanshuGajjar" target="_blank" className="footer-link">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────── ROOT ──────────────────────────────────── */

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <CTASection />
      <Footer />
    </main>
  );
}
