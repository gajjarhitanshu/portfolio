"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Experience_arr } from "../../public/experience";
import { Projects_arr } from "../../public/projects_data";
import { skills_arr } from "../../public/skills";
import { ArrowRight, Github, Linkedin, Mail, Layers, Code2 } from "lucide-react";

const linkedInUrl = "https://www.linkedin.com/in/hitanshu-gajjar/";
const githubUrl = "https://github.com/HItanshuGajjar";
const mailUrl = "mailto:hitanshu.hexxum@gmail.com";

const NAV = [
  { id: "about", label: "ABOUT" },
  { id: "experiences", label: "EXPERIENCES" },
  { id: "projects", label: "PROJECTS" },
];

const STATS = [
  { value: "7+", label: "Years Experience" },
  { value: "50+", label: "Apps Shipped" },
  { value: "3", label: "Countries Served" },
  { value: "15+", label: "Team Members Led" },
];

const ROLES = [
  "React Native Engineer",
  "Frontend Architect",
  "Mobile Performance Lead",
  "AI Integration Specialist",
];

/* ── helpers ── */
const ease = [0.22, 1, 0.36, 1] as const;

function heroAnim(i: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.11 },
  };
}

/* ── Typewriter ── */
function Typewriter({ texts }: { texts: string[] }) {
  const [display, setDisplay] = useState("");
  const [ti, setTi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 2200);
      return () => clearTimeout(t);
    }
    const full = texts[ti];
    const speed = deleting ? 45 : 88;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.substring(0, ci + 1);
        setDisplay(next);
        if (next === full) setPaused(true);
        else setCi((c) => c + 1);
      } else {
        const next = full.substring(0, ci - 1);
        setDisplay(next);
        if (next === "") {
          setDeleting(false);
          setTi((i) => (i + 1) % texts.length);
          setCi(0);
        } else {
          setCi((c) => c - 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [ci, deleting, paused, texts, ti]);

  return (
    <span>
      {display}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

/* ── FadeUp – scroll-triggered ── */
function FadeUp({
  children,
  delay = 0,
  scrollRoot,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  scrollRoot?: React.RefObject<HTMLElement | null>;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
    ...(scrollRoot ? { root: scrollRoot } : {}),
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading with underline reveal ── */
function SectionHeading({
  children,
  scrollRoot,
}: {
  children: React.ReactNode;
  scrollRoot?: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-40px",
    ...(scrollRoot ? { root: scrollRoot } : {}),
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -18 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative inline-block pb-1"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white/90">{children}</h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full"
        style={{ background: "linear-gradient(90deg, #5eead4, rgba(129,140,248,0.4), transparent)" }}
      />
    </motion.div>
  );
}

/* ── Main ── */
export default function Home() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedMenu, setSelectedMenu] = useState("ABOUT");

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSelectedMenu(entry.target.id.toUpperCase());
        }
      },
      { root: container, threshold: 0.25 }
    );
    sectionRefs.current.forEach((s) => s && observer.observe(s));
    return () => sectionRefs.current.forEach((s) => s && observer.unobserve(s));
  }, []);

  return (
    <div className="h-lvh w-lvw flex flex-col md:flex-row p-6 md:p-0 overflow-hidden">

      {/* ── LEFT HERO PANEL ── */}
      <div
        id="hero-section"
        className="flex md:flex-1 flex-col justify-between md:my-16 md:pl-16 md:pr-10 overflow-hidden"
      >
        <div className="flex flex-col gap-3">

          {/* status badge */}
          <motion.div
            {...heroAnim(0)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-400/30 bg-teal-400/10 w-fit mb-1"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-300 text-xs font-medium tracking-wide">
              Available for new opportunities
            </span>
          </motion.div>

          {/* name */}
          <motion.div {...heroAnim(1)}>
            <Link href="#about">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight cursor-pointer">
                <span className="hero-gradient-text">Hitanshu</span>
                <br />
                <span className="text-white/90">Gajjar</span>
              </h1>
            </Link>
          </motion.div>

          {/* typewriter role */}
          <motion.div {...heroAnim(2)}>
            <p className="text-teal-300 font-semibold text-base sm:text-lg tracking-wide min-h-[1.75rem]">
              <Typewriter texts={ROLES} />
            </p>
          </motion.div>

          {/* tagline */}
          <motion.div {...heroAnim(3)}>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xs mt-1">
              Crafting high-performance, intuitive mobile&nbsp;&amp;&nbsp;web experiences
              with a global mindset and 7&nbsp;years of real-world engineering.
            </p>
          </motion.div>

          {/* stats */}
          <motion.div {...heroAnim(4)} className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-xl font-bold text-teal-400">{s.value}</span>
                <span className="text-white/40 text-xs">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* currently at */}
          <motion.div {...heroAnim(5)} className="flex items-center gap-2 mt-3">
            <Layers className="w-4 h-4 text-white/40 flex-shrink-0" />
            <span className="text-white/40 text-xs">
              Currently at{" "}
              <span className="text-white/70 font-medium">Agile Soft Systems Inc.</span>
            </span>
          </motion.div>
        </div>

        {/* nav */}
        <motion.div {...heroAnim(6)} className="hidden lg:flex flex-col gap-4 my-6">
          {NAV.map((item) => {
            const isSelected = item.label === selectedMenu;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setSelectedMenu(item.label)}
                className="flex gap-4 items-center group cursor-pointer"
              >
                <div
                  className="h-px rounded-full transition-all duration-300 group-hover:w-20"
                  style={{
                    width: isSelected ? "5rem" : "1.5rem",
                    background: isSelected
                      ? "linear-gradient(90deg,#5eead4,#818cf8)"
                      : "#4b5563",
                  }}
                />
                <span
                  className={`text-[11px] tracking-widest font-semibold transition-colors duration-200 ${
                    isSelected ? "text-white" : "text-white/40 group-hover:text-white/80"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </motion.div>

        {/* socials */}
        <motion.div {...heroAnim(7)} className="flex gap-3 mt-4 md:mt-0">
          {[
            { href: mailUrl, Icon: Mail, label: "Email" },
            { href: githubUrl, Icon: Github, label: "GitHub" },
            { href: linkedInUrl, Icon: Linkedin, label: "LinkedIn" },
          ].map(({ href, Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              className="group p-2 rounded-lg border border-white/10 hover:border-teal-400/50 hover:bg-teal-400/10 transition-all duration-200"
            >
              <Icon className="w-5 h-5 text-white/50 group-hover:text-teal-300 transition-colors" />
            </Link>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT SCROLLABLE PANEL ── */}
      <div
        ref={scrollRef}
        id="scrollable-div"
        className="flex flex-col md:overflow-y-auto scroll-smooth pb-24 px-4 sm:px-6 md:px-8 lg:px-14 mt-10 md:mt-0 md:flex-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >

        {/* ── ABOUT ── */}
        <section
          ref={(el) => { sectionRefs.current[0] = el; }}
          id="about"
          className="md:pt-16 lg:pt-24"
        >
          <SectionHeading scrollRoot={scrollRef}>About</SectionHeading>

          <FadeUp delay={0.1} scrollRoot={scrollRef} className="mt-6">
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              I&apos;m <span className="text-white font-semibold">Hitanshu Gajjar</span>, a
              Frontend-focused Software Engineer with over{" "}
              <span className="text-teal-300">7 years</span> of experience building robust and
              scalable applications. My journey began in late 2016 as an Android Developer before
              specialising in React Native from mid-2019 — enabling high-performance, cross-platform
              mobile apps that meet modern business needs.
            </p>
          </FadeUp>

          <FadeUp delay={0.16} scrollRoot={scrollRef} className="mt-4">
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              Over the years I&apos;ve collaborated with international clients and cross-functional
              teams across education, e-commerce, logistics, and AI sectors. I bring a unique blend
              of <span className="text-teal-300">hands-on engineering</span> and{" "}
              <span className="text-teal-300">technical leadership</span> — having led teams and
              managed projects for 3+ years while staying deeply involved in architecture and code.
            </p>
          </FadeUp>

          <FadeUp delay={0.22} scrollRoot={scrollRef} className="mt-4">
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              While React Native remains my core focus, I&apos;m also proficient in React.js,
              Next.js, Node.js, and have recently been integrating Generative AI tools (OpenAI,
              Gemini, Claude) into production applications. My approach always emphasises
              performance, usability, and clean, maintainable code.
            </p>
          </FadeUp>

          {/* skill chips */}
          <FadeUp delay={0.1} scrollRoot={scrollRef} className="mt-10">
            <h3 className="text-white/60 font-semibold text-xs uppercase tracking-widest mb-4">
              Skills &amp; Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills_arr.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-chip"
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, root: scrollRef }}
                  transition={{ duration: 0.28, ease: "easeOut", delay: i * 0.016 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </FadeUp>
        </section>

        {/* ── EXPERIENCES ── */}
        <section
          ref={(el) => { sectionRefs.current[1] = el; }}
          id="experiences"
          className="pt-24"
        >
          <SectionHeading scrollRoot={scrollRef}>Experience</SectionHeading>

          <div className="mt-8 flex flex-col gap-4">
            {Experience_arr.map((item, i) => (
              <FadeUp key={i} delay={i * 0.09} scrollRoot={scrollRef}>
                <ExperienceCard {...item} />
              </FadeUp>
            ))}
          </div>

          {/* contract block */}
          <FadeUp delay={0.1} scrollRoot={scrollRef} className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code2 className="w-5 h-5 text-teal-400" />
                <h3 className="text-white font-semibold text-sm sm:text-base">
                  Contract-Based Development{" "}
                  <span className="text-white/35 font-normal text-xs">(2019 – 2022)</span>
                </h3>
              </div>
              <p className="text-white/55 text-sm sm:text-base leading-relaxed">
                Delivered tailored mobile solutions across education, e-commerce, and logistics as
                an independent consultant. Handled full project lifecycles — from architectural
                planning and coding to deployment and maintenance. Built with React Native,
                Firebase, Razorpay, Paytm, and PHP backends while co-ordinating distributed
                international teams and maintaining clean Git workflows. This experience
                strengthened my versatility, global communication skills, and ability to
                independently deliver production-ready software in fast-paced environments.
              </p>
            </div>
          </FadeUp>
        </section>

        {/* ── PROJECTS ── */}
        <section
          ref={(el) => { sectionRefs.current[2] = el; }}
          id="projects"
          className="pt-24"
        >
          <div className="flex items-center justify-between mb-8">
            <SectionHeading scrollRoot={scrollRef}>Projects</SectionHeading>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, root: scrollRef }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 text-xs sm:text-sm font-medium transition-colors group"
              >
                All Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="flex flex-col gap-5">
            {Projects_arr.filter((p) => p.showAsDisplay).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, root: scrollRef, margin: "-40px" }}
                transition={{ duration: 0.58, ease: "easeOut", delay: i * 0.07 }}
              >
                <ProjectCard
                  name={item.name}
                  description={item.description ?? item.oneLineDescription ?? ""}
                  tech={item.tech}
                  role={item.role}
                  year={item.year}
                  madeAt={item.madeAt}
                  index={i}
                />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

/* ── Experience Card ── */
function ExperienceCard({
  startDate,
  endDate,
  title,
  company,
  description,
  tech,
}: {
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
}) {
  return (
    <div className="group experience-card relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-teal-400/25 transition-all duration-300 p-5 sm:p-6 flex flex-col sm:flex-row gap-4">
      <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-gradient-to-b from-teal-400/0 via-teal-400/60 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex-shrink-0 sm:w-36">
        <span className="text-white/30 text-[11px] leading-relaxed">
          {startDate}
          <br />— {endDate}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-white font-semibold text-sm sm:text-base">{title}</h3>
        <p className="text-teal-300/80 text-xs sm:text-sm mt-0.5 mb-2">{company}</p>
        <p className="text-white/55 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {tech.map((t) => (
            <span key={t} className="skill-chip text-[10px]">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({
  name,
  description,
  tech,
  role,
  year,
  madeAt,
}: {
  name: string;
  description: string;
  tech: string[];
  role: string[];
  year: string;
  madeAt: string;
  index: number;
}) {
  return (
    <div className="group project-card relative rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.065] hover:border-teal-400/25 transition-all duration-300 p-5 sm:p-6 overflow-hidden">
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-teal-400/5 group-hover:bg-teal-400/10 blur-3xl transition-all duration-500 pointer-events-none" />

      <div className="flex items-start justify-between gap-4 mb-3 relative">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="text-white font-bold text-base sm:text-lg">{name}</h3>
            <span className="text-white/25 text-xs">·</span>
            <span className="text-white/30 text-xs tabular-nums">{year}</span>
          </div>
          <p className="text-teal-300/70 text-xs">{role.join(" · ")}</p>
        </div>
        <span className="text-white/25 text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">
          {madeAt}
        </span>
      </div>

      <p className="text-white/55 text-sm leading-relaxed mb-4 relative">{description}</p>

      <div className="flex flex-wrap gap-1.5 relative">
        {tech.map((t) => (
          <span key={t} className="skill-chip text-[10px]">{t}</span>
        ))}
      </div>
    </div>
  );
}
