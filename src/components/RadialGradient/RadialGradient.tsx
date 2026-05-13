"use client";
import React, { useEffect, useRef } from "react";

const RadialGradient = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const xPct = Math.round((e.pageX / window.innerWidth) * 100);
      const yPct = Math.round((e.pageY / window.innerHeight) * 100);
      ref.current.style.backgroundImage = `
        radial-gradient(ellipse 80% 60% at ${xPct}% ${yPct}%, rgba(15,40,60,0.9) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at ${100 - xPct}% ${100 - yPct}%, rgba(30,20,55,0.7) 0%, transparent 60%)
      `;
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,40,60,0.9) 0%, transparent 70%)",
        backgroundColor: "#0f1923",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        transition: "background-image 0.15s ease",
      }}
    />
  );
};

export default RadialGradient;
