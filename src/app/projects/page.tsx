"use client";

import CText from "@/components/CText/CText";
import { Projects_arr } from "../../../public/projects_data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Projects() {
  const project_arr = Projects_arr.sort(
    (a, b) => parseInt(b.year) - parseInt(a.year)
  );

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerRow = document.querySelector(".header-row");
      if (!headerRow) return;

      const rect = headerRow.getBoundingClientRect();

      setIsSticky(rect.top <= 0); // Sticky if at or above the top
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-10 lg:py-20 lg:px-10">
      <div className="max-w-7xl mx-auto w-full mb-8 md:mb-12 xs:fixed xs:top-4 xs:left-4">
        <Link
          href="/"
          className="inline-flex items-center text-[#5eead4] hover:text-[#5eead4]/80 transition-colors group mb-4"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="text-sm sm:text-base">Hitanshu Gajjar</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
          All Projects
        </h1>
      </div>
      <div className="max-w-7xl mx-auto">
        <table className="w-full border-collapse z-10 min-w-[640px] overflow-x-auto">
          <thead>
            <tr className="bg-opacity-10 backdrop-blur sticky top-0 z-20">
              <th className="text-left py-3 px-2 font-normal text-xs sm:text-sm text-gray-400">
                Year
              </th>
              <th className="text-left py-3 px-2 font-normal text-xs sm:text-sm text-gray-400">
                Project
              </th>
              <th className="text-left py-3 px-2 font-normal text-xs sm:text-sm text-gray-400">
                Made at
              </th>
              <th className="text-left py-3 px-2 font-normal text-xs sm:text-sm text-gray-400">
                Built with
              </th>
              <th className="text-left py-3 px-2 font-normal text-xs sm:text-sm text-gray-400">
                Short Description
              </th>
            </tr>
          </thead>
          <tbody>
            {project_arr.map((project, index) => (
              <tr key={index} className="border-t border-[#ffffff40]">
                <td className="py-3 px-2">
                  <CText baseSize={12} className="opacity-70 sm:text-sm">
                    {project.year}
                  </CText>
                </td>
                <td className="py-3 px-2">
                  <CText
                    baseSize={12}
                    fontWeight="semiBold"
                    className="sm:text-sm"
                  >
                    {project.name}
                  </CText>
                </td>
                <td className="py-3 px-2">
                  <CText baseSize={12} className="opacity-70 sm:text-sm">
                    {project.madeAt}
                  </CText>
                </td>
                <td className="py-3 px-2">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="chip bg-gray-700 px-1.5 py-0.5 rounded text-xs"
                      >
                        <CText baseSize={8} className="sm:text-[10px]">
                          {tech}
                        </CText>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <CText baseSize={12} className="opacity-70 sm:text-sm">
                    {project.oneLineDescription}
                  </CText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
