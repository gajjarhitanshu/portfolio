import CText from "@/components/CText/CText";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
};

export default function ExperienceItemCard(props: Props) {
  const { startDate, endDate, title, company, description, tech } = props;

  return (
    <div className="glass-effect p-4 sm:p-6 flex flex-col sm:flex-row">
      <div className="mt-1 mb-2 sm:mb-0 sm:mr-4 sm:w-32 flex-shrink-0">
        <CText baseSize={12} className="opacity-60 sm:text-sm">
          {startDate} - {endDate}
        </CText>
      </div>
      <div className="flex flex-1  flex-col">
        <CText baseSize={14} className="font-semibold sm:text-base md:text-lg">
          {`${title} - ${company}`}
        </CText>
        <CText baseSize={14} className="opacity-70 mt-2 sm:text-base">
          {description}
        </CText>
        <div className="flex flex-wrap mt-3 gap-2">
          {tech.map((item, index) => (
            <div
              key={index}
              className="chip bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full"
            >
              <CText baseSize={10} className="sm:text-xs">
                {item}
              </CText>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
