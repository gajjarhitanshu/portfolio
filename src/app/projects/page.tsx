"use client";

import { Projects_arr } from "../../../public/projects_data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const sorted = [...Projects_arr].sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return (
    <div className="h-screen flex flex-col p-4 sm:p-6 md:p-10 lg:py-12 lg:px-16 overflow-hidden">

      {/* fixed header — never scrolls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45 }}
        className="flex-shrink-0 mb-6 md:mb-8"
      >
        <Link
          href="/"
          className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors group mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Hitanshu Gajjar</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold hero-gradient-text">
          All Projects
        </h1>
        <p className="text-white/40 text-sm mt-1">A full archive of shipped work.</p>
      </motion.div>

      {/* scrollable table — fills remaining height */}
      <div
        className="flex-1 min-h-0 rounded-2xl border border-white/10 overflow-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <table className="w-full border-collapse min-w-[680px]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-white/10 bg-[#0f1923]">
              {["Year", "Project", "Made at", "Built with", "Description"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-4 text-[11px] font-semibold text-white/35 uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((project, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, ease: "easeOut", delay: 0.04 + i * 0.04 }}
                className="border-b border-white/[0.06] hover:bg-teal-400/[0.04] transition-colors group"
              >
                <td className="py-3.5 px-4">
                  <span className="text-white/35 text-xs tabular-nums">{project.year}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-white font-semibold text-sm group-hover:text-teal-300 transition-colors">
                    {project.name}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-white/45 text-xs">{project.madeAt}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span key={t} className="skill-chip text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4 max-w-xs">
                  <span className="text-white/45 text-xs leading-relaxed line-clamp-2">
                    {project.oneLineDescription}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
