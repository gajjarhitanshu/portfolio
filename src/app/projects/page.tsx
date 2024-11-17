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
    <div className="min-h-screen text-white p-10 md:my-20 md:pl-20 md:pr-10">
      <div className="max-w-7xl mx-auto w-full mb-20">
        <Link
          href="/"
          className="inline-flex items-center text-[#5eead4] hover:text-[#5eead4]/80 transition-colors group mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1" />
          Hitanshu Gajjar
        </Link>
        <h1 className="text-5xl font-semibold">All Projects</h1>
      </div>
      <div className="max-w-7xl mx-auto">
        <table className="w-full border-collapse z-10">
          <thead>
            <tr
              className={`header-row bg-red-500 text-sm text-gray-400 sticky z-20 top-0 backdrop-blur`}
            >
              <th className="text-left py-4 px-2 font-normal">Year</th>
              <th className="text-left py-4 px-2 font-normal">Project</th>
              <th className="text-left py-4 px-2 font-normal">Made at</th>
              <th className="text-left py-4 px-2 font-normal">Built with</th>
              <th className="text-left py-4 px-2 font-normal">
                Short Description
              </th>
            </tr>
          </thead>
          <tbody>
            {project_arr.map((project, index) => (
              <tr key={index} className="border-t border-[#ffffff40]">
                <td>
                  <CText baseSize={14} className="opacity-70 ms-1 mt-1 py-4">
                    {project.year}
                  </CText>
                </td>
                <td>
                  <CText baseSize={14} fontWeight="semiBold">
                    {project.name}
                  </CText>
                </td>
                <td>
                  <CText baseSize={14} className="opacity-70 ms-1 mt-1 py-4">
                    {project.madeAt}
                  </CText>
                </td>
                <td className="py-4 px-2">
                  <div className="flex flex-wrap gap-2 chip-container">
                    {project.tech.map((tech, techIndex) => (
                      <div key={techIndex} className="chip">
                        <CText baseSize={10}>{tech}</CText>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-2 align-center">
                  <CText
                    baseSize={14}
                    className="opacity-70 ms-1 mt-1"
                  >{`${project.oneLineDescription}`}</CText>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
