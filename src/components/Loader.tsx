"use client";
import { useEffect, useRef, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    let p = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      p += Math.random() * 14 + 5;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        timeout = setTimeout(() => {
          setDone(true);
          if (!calledRef.current) {
            calledRef.current = true;
            // Let fade-out begin then call complete
            setTimeout(onComplete, 300);
          }
        }, 250);
        return;
      }
      setProgress(Math.floor(p));
      timeout = setTimeout(tick, 50 + Math.random() * 50);
    };

    tick();
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className={`loader${done ? " done" : ""}`}>
      <div className="label">INITIALISING SCENE</div>
      <div className="progress">{String(Math.floor(progress)).padStart(2, "0")}</div>
      <div className="right-label">HG / PORTFOLIO 2026</div>
    </div>
  );
}
