import React from "react";
import CText from "./CText/CText";

type Props = {
  name: string;
  description: string;
  tech: string[];
  role: string[];
};

export default function ProjectsHomeView(props: Props) {
  const { name, description, tech, role } = props;

  return (
    <div className="glass-effect p-4 sm:p-6 flex flex-col sm:flex-row ">
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 sm:mb-0">
          <CText baseSize={16} className="font-semibold sm:text-lg md:text-xl">
            {`${name} - `}
          </CText>
          <CText
            baseSize={14}
            className="opacity-70 mt-1 sm:mt-0 sm:ml-2 sm:text-base md:text-lg"
          >
            {role.join(", ")}
          </CText>
        </div>
        <CText baseSize={14} className="opacity-70 mt-2 sm:mt-3 sm:text-base">
          {description}
        </CText>
        <div className="flex flex-wrap mt-3 sm:mt-4 gap-2">
          {tech.map((item, index) => (
            <div
              key={index}
              className="chip bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
            >
              <CText baseSize={10} className="sm:text-xs md:text-sm">
                {item}
              </CText>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
