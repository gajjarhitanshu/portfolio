"use client";

import React, { useEffect, useState } from "react";
import {
  montserratLight,
  montserratRegular,
  montserratMedium,
  montserratSemiBold,
  montserratBold,
  montserratExtraBold,
} from "../../../public/fonts";

type Props = {
  baseSize?: number;
  fontWeight?:
    | "light"
    | "regular"
    | "medium"
    | "semiBold"
    | "bold"
    | "extraBold";
  children: React.ReactNode;
  className?: string;
};
const CText = (props: Props) => {
  const {
    baseSize = 16,
    children,
    fontWeight = "regular",
    className = "",
  } = props;

  const [textSize, setTextSize] = useState(baseSize);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth < 768 ? baseSize * 0.8 : baseSize; // Example calculation
      setTextSize(newSize);
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [baseSize]);

  const fontClassName = () => {
    switch (fontWeight) {
      case "light":
        return montserratLight.className;

      case "regular":
        return montserratRegular.className;

      case "medium":
        return montserratMedium.className;

      case "semiBold":
        return montserratSemiBold.className;

      case "bold":
        return montserratBold.className;

      case "extraBold":
        return montserratExtraBold.className;

      default:
        return montserratRegular.className;
    }
  };

  return (
    <p
      style={{ fontSize: `${textSize}px` }}
      className={`${fontClassName()} ${className}`}
    >
      {children}
    </p>
  );
};

export default CText;
