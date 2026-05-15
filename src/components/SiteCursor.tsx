"use client";
import { useEffect, useRef } from "react";

export default function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let cx = 0, cy = 0, tx = 0, ty = 0;
    let rafId: number;

    const onMove = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener("pointermove", onMove);

    const tick = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    const addHover = () => {
      document.querySelectorAll("a, button, .btn, [data-cursor='hover']").forEach((el) => {
        (el as HTMLElement).addEventListener("pointerenter", () => cursor.classList.add("hovering"));
        (el as HTMLElement).addEventListener("pointerleave", () => cursor.classList.remove("hovering"));
      });
    };
    addHover();

    const obs = new MutationObserver(addHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      obs.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="site-cursor" />;
}
