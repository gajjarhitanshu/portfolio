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
    <div className="glass-effect p-4 flex flex-row">
      <div>
        <CText baseSize={12} className="opacity-60 mt-0.5">
          {startDate} - {endDate}
        </CText>
      </div>
      <div className="flex flex-1 ms-4 flex-col">
        <CText baseSize={14}>{`${title} - ${company}`}</CText>
        <CText
          baseSize={14}
          className="opacity-70 mt-2"
        >{`${description}`}</CText>
        <div className="flex flex-row mt-2 chip-container">
          {tech.map((item, index) => {
            return (
              <div key={`${index}`} className="chip">
                <CText baseSize={10}>{item}</CText>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
