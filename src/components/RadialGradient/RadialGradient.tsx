"use client";
import React, { useEffect, useState } from "react";

const colorCombinations = [
  "#004080, #003366",
  "#5e2a77, #3f0071",
  "#003d99, #002d72",
  "#004366, #00234d",
];

const RadialGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMovement = (event: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const mouseXPercentage = Math.round((event.pageX / windowWidth) * 100);
      const mouseYPercentage = Math.round((event.pageY / windowHeight) * 100);
      setMousePosition({ x: mouseXPercentage, y: mouseYPercentage });
    };

    document.addEventListener("mousemove", handleMouseMovement);

    return () => {
      document.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);

  const gradientStyle = {
    backgroundImage: `radial-gradient(at ${mousePosition.x}% ${mousePosition.y}%, ${colorCombinations[3]})`,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  };

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(at ${mousePosition.x}% ${mousePosition.y}%, ${colorCombinations[3]})`,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    ></div>
  );
};

export default RadialGradient;
