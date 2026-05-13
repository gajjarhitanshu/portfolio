"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const isOnHeroRef = useRef(false);
  const isHoverRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window) return;

    setMounted(true);
    document.body.style.cursor = "none";

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }

      const hero = document.getElementById("hero-section");
      if (hero) {
        const r = hero.getBoundingClientRect();
        isOnHeroRef.current =
          mouseX >= r.left &&
          mouseX <= r.right &&
          mouseY >= r.top &&
          mouseY <= r.bottom;
      }
    };

    const onEnterInteractive = () => {
      isHoverRef.current = true;
    };
    const onLeaveInteractive = () => {
      isHoverRef.current = false;
    };

    const bindInteractiveElements = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;

        if (isOnHeroRef.current) {
          ringRef.current.style.width = "72px";
          ringRef.current.style.height = "72px";
          ringRef.current.style.borderColor = "rgba(94,234,212,0.9)";
          ringRef.current.style.backgroundColor = "rgba(94,234,212,0.07)";
          ringRef.current.style.boxShadow =
            "0 0 20px rgba(94,234,212,0.25), inset 0 0 20px rgba(94,234,212,0.05)";
        } else if (isHoverRef.current) {
          ringRef.current.style.width = "52px";
          ringRef.current.style.height = "52px";
          ringRef.current.style.borderColor = "rgba(94,234,212,1)";
          ringRef.current.style.backgroundColor = "rgba(94,234,212,0.18)";
          ringRef.current.style.boxShadow = "0 0 12px rgba(94,234,212,0.4)";
        } else {
          ringRef.current.style.width = "38px";
          ringRef.current.style.height = "38px";
          ringRef.current.style.borderColor = "rgba(94,234,212,0.55)";
          ringRef.current.style.backgroundColor = "transparent";
          ringRef.current.style.boxShadow = "none";
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    bindInteractiveElements();

    const observer = new MutationObserver(bindInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.body.style.cursor = "";
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transition:
            "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
          width: "38px",
          height: "38px",
          borderColor: "rgba(94,234,212,0.55)",
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#5eead4",
          boxShadow: "0 0 6px rgba(94,234,212,0.8)",
        }}
      />
    </>
  );
}
