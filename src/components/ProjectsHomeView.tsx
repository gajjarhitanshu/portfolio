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
    <div className="glass-effect p-4 flex flex-row">
      <div className="flex flex-1 ms-4 flex-col">
        <div className="flex  flex-row center-align">
          <CText baseSize={18}>{`${name} - `}</CText>
          <CText baseSize={14} className="opacity-70 ms-1 mt-1">{`${role.join(
            ", "
          )}`}</CText>
        </div>
        <CText baseSize={14} className="opacity-70 mt-2">
          {`${description}`}
        </CText>
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
