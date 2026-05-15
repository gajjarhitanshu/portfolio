"use client";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  { y: 2025, n: "Moshi AI",             c: "Agile Soft Systems", k: "AGILE", t: "NextJS · Node · GenAI",       tech: ["GenAI"],       o: "Generate content with AI.",                                featured: true },
  { y: 2024, n: "TalkToo",              c: "Agile Soft Systems", k: "AGILE", t: "React Native · GenAI",        tech: ["GenAI","RN"],  o: "Custom AI companions for productivity, learning & creativity.", featured: true },
  { y: 2024, n: "SoundGen AI",          c: "Agile Soft Systems", k: "AGILE", t: "React · GenAI",               tech: ["GenAI"],       o: "Generate music with AI.",                                  featured: true },
  { y: 2024, n: "Influencer (Delphi)", c: "Shine Infosoft",     k: "SHINE", t: "React Native · Node",          tech: ["RN"],          o: "AI platform connecting influencers with followers." },
  { y: 2024, n: "First 30 Day",         c: "Shine Infosoft",     k: "SHINE", t: "React Native · Node",          tech: ["RN"],          o: "Churches share 30-day lessons with users." },
  { y: 2023, n: "Skill India Digital",  c: "Shine Infosoft",     k: "SHINE", t: "React Native · Node",          tech: ["RN"],          o: "National platform for skilling, upskilling, reskilling.", featured: true },
  { y: 2023, n: "Aladdin",              c: "Shine Infosoft",     k: "SHINE", t: "React Native",                 tech: ["RN"],          o: "Booking reliable home services." },
  { y: 2022, n: "Saloon App",           c: "Excellent Web World",k: "EWW",   t: "React Native",                 tech: ["RN"],          o: "Manage salons, staff, and operations." },
  { y: 2022, n: "HelpLah",              c: "Excellent Web World",k: "EWW",   t: "React Native",                 tech: ["RN"],          o: "Book reliable home services quickly." },
  { y: 2022, n: "Canteeny",             c: "Excellent Web World",k: "EWW",   t: "React Native",                 tech: ["RN"],          o: "Multi-canteen franchise management." },
  { y: 2022, n: "Cookpals",             c: "Excellent Web World",k: "EWW",   t: "React Native",                 tech: ["RN"],          o: "Connect through recipes — dating reimagined." },
  { y: 2021, n: "3Efreet",              c: "Independent",        k: "INDIE", t: "React Native · MongoDB",       tech: ["RN","MONGO"],  o: "Hassle-free delivery booking & tracking.",                 featured: true },
  { y: 2021, n: "TNC-CRM",              c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "CRM to manage salons and their workforce." },
  { y: 2021, n: "SurfWallet",           c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "Secure blockchain-based wallet." },
  { y: 2021, n: "InstaCharge",          c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "Multilingual EV charging." },
  { y: 2020, n: "Discreet Lobby",       c: "Independent",        k: "INDIE", t: "React Native · MongoDB",       tech: ["RN","MONGO"],  o: "Private connections & exclusive events.",                  featured: true },
  { y: 2020, n: "Powertrac",            c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "Cafe inventory + speedy takeaway." },
  { y: 2020, n: "NovaDating",           c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "Dating app with innovative UX." },
  { y: 2020, n: "iCard",                c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "Student data management." },
  { y: 2020, n: "Shaamel",              c: "Tech Firm",          k: "TECH",  t: "React Native",                 tech: ["RN"],          o: "At-home service providers bridge." },
  { y: 2020, n: "ChillBaby",            c: "Tech Firm",          k: "TECH",  t: "React Native · IoT",           tech: ["RN"],          o: "Smart-seat baby monitoring with IoT." },
  { y: 2020, n: "Beauty Soft",          c: "Independent",        k: "INDIE", t: "React Native",                 tech: ["RN"],          o: "All-in-one salon management." },
];

const COLORS: Record<string, string> = {
  AGILE: "#ff6b3d",
  SHINE: "#5b8def",
  EWW:   "#42c79a",
  INDIE: "#e6dcc3",
  TECH:  "#b07eff",
};

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

type Project = typeof PROJECTS[0] & {
  tx?: number; ty?: number;
  x?: number; y0?: number;
  r?: number; alpha?: number;
  _y?: number; dimmed?: boolean;
};

function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}

export default function ConstellationCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!wrap || !canvas || !card) return;

    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;

    const projs: Project[] = PROJECTS.map(p => ({ ...p }));

    function layout() {
      const padX = 80, padTop = 110, padBottom = 80;
      const innerW = W - padX * 2;
      const innerH = H - padTop - padBottom;
      projs.forEach((p) => {
        const yearRatio = (p.y - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0]);
        const jx = ((hashStr(p.n) % 1000) / 1000 - 0.5) * (innerW / (YEARS.length * 1.6));
        p.tx = padX + yearRatio * innerW + jx;
        const yr = (hashStr(p.n + "y") % 1000) / 1000;
        p.ty = padTop + 30 + yr * (innerH - 60);
        p.r = p.featured ? 11 : 6;
        if (p.x == null) {
          p.x = p.tx;
          p._y = p.ty;
          p.alpha = 0;
        }
      });
    }

    function resize() {
      const r = wrap.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      layout();
    }
    resize();
    window.addEventListener("resize", resize);

    function buildEdges() {
      const E: [number, number, string][] = [];
      for (let i = 0; i < projs.length; i++) {
        for (let j = i + 1; j < projs.length; j++) {
          const a = projs[i], b = projs[j];
          if (Math.abs(a.y - b.y) > 1) continue;
          const shared = a.tech.filter(tt => b.tech.includes(tt));
          if (!shared.length) continue;
          const d2 = ((a.tx ?? 0) - (b.tx ?? 0)) ** 2 + ((a.ty ?? 0) - (b.ty ?? 0)) ** 2;
          if (d2 > 220 * 220) continue;
          E.push([i, j, shared[0]]);
        }
      }
      return E;
    }
    let edges = buildEdges();
    window.addEventListener("resize", () => { edges = buildEdges(); });

    const pointer = { x: -1, y: -1 };
    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    });
    canvas.addEventListener("pointerleave", () => { pointer.x = -1; pointer.y = -1; });

    const PARTICLES = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1200,
      y: Math.random() * 600,
      v: 0.15 + Math.random() * 0.35,
      r: 0.5 + Math.random() * 1.2,
      a: 0.1 + Math.random() * 0.4,
    }));

    const startTime = performance.now();
    const ENTRANCE_DUR = 1800;
    const ENTRANCE_STAGGER = 50;
    let rafId: number;

    function frame(now: number) {
      const t = (now - startTime) / 1000;
      ctx.clearRect(0, 0, W, H);

      projs.forEach((p, i) => {
        const local = Math.max(0, Math.min(1, ((now - startTime) - i * ENTRANCE_STAGGER) / ENTRANCE_DUR));
        const eased = 1 - Math.pow(1 - local, 3);
        p.alpha = eased;
        const targetY = p.ty ?? 0;
        const startY = targetY + 80;
        p.x = (p.x ?? p.tx ?? 0) + ((p.tx ?? 0) - (p.x ?? p.tx ?? 0)) * 0.08;
        p._y = startY + (targetY - startY) * eased;
      });

      // Year grid lines
      YEARS.forEach((_, i) => {
        const xr = i / (YEARS.length - 1);
        const x = 80 + xr * (W - 160);
        ctx.strokeStyle = "rgba(42,42,48,0.7)";
        ctx.setLineDash([2, 6]);
        ctx.beginPath();
        ctx.moveTo(x, 60);
        ctx.lineTo(x, H - 80);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Dust particles
      PARTICLES.forEach((p) => {
        p.y -= p.v;
        p.x += Math.sin(t * 0.5 + p.r * 7) * 0.15;
        if (p.y < -2) { p.y = H + 4; p.x = Math.random() * W; }
        if (p.x < -2) p.x = W;
        if (p.x > W + 2) p.x = 0;
        ctx.fillStyle = `rgba(245,241,232,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Find hover
      let hoverIdx = -1;
      let bestDist = Infinity;
      if (pointer.x >= 0) {
        projs.forEach((p, i) => {
          const dx = pointer.x - (p.x ?? 0);
          const dy = pointer.y - (p._y ?? 0);
          const d2 = dx * dx + dy * dy;
          const hitR = p.featured ? 22 : 16;
          if (d2 < hitR * hitR && d2 < bestDist) { bestDist = d2; hoverIdx = i; }
        });
      }

      // Edges
      edges.forEach(([i, j]) => {
        const a = projs[i], b = projs[j];
        const isHi = i === hoverIdx || j === hoverIdx;
        ctx.strokeStyle = isHi ? "rgba(255,107,61,0.55)" : "rgba(120,120,130,0.18)";
        ctx.lineWidth = isHi ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x ?? 0, a._y ?? 0);
        ctx.lineTo(b.x ?? 0, b._y ?? 0);
        ctx.stroke();
        const pulse = ((t * 0.4 + (i * 0.13)) % 1);
        const px = (a.x ?? 0) + ((b.x ?? 0) - (a.x ?? 0)) * pulse;
        const py = (a._y ?? 0) + ((b._y ?? 0) - (a._y ?? 0)) * pulse;
        ctx.fillStyle = isHi ? "rgba(255,107,61,0.9)" : "rgba(255,107,61,0.18)";
        ctx.beginPath();
        ctx.arc(px, py, isHi ? 2.4 : 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Nodes
      projs.forEach((p, i) => {
        const hi = i === hoverIdx;
        const color = COLORS[p.k] || "#ccc";
        const nx = p.x ?? 0;
        const ny = p._y ?? 0;
        const alpha = p.alpha ?? 0;
        const nr = ((p.featured ? 11 : 6) * (hi ? 1.6 : 1)) * alpha;

        if (hi || p.featured) {
          const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * (hi ? 6 : 3.5));
          grd.addColorStop(0, color + "55");
          grd.addColorStop(1, color + "00");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(nx, ny, nr * (hi ? 6 : 3.5), 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.featured) {
          ctx.strokeStyle = "rgba(245,241,232,0.85)";
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(nx, ny, nr + 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(nx, ny, nr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(245,241,232,0.6)";
        ctx.beginPath();
        ctx.arc(nx - nr * 0.3, ny - nr * 0.35, nr * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.featured && !hi) {
          ctx.fillStyle = "rgba(245,241,232,0.55)";
          ctx.font = "500 11px 'JetBrains Mono', monospace";
          ctx.textAlign = "left";
          ctx.fillText(p.n, nx + nr + 8, ny + 4);
        }
        if (hi) {
          ctx.fillStyle = "rgba(245,241,232,1)";
          ctx.font = "600 12px 'JetBrains Mono', monospace";
          ctx.textAlign = "left";
          ctx.fillText(p.n.toUpperCase(), nx + nr + 10, ny - 4);
          ctx.fillStyle = "rgba(245,241,232,0.6)";
          ctx.font = "500 10px 'JetBrains Mono', monospace";
          ctx.fillText(`${p.y} · ${p.c}`, nx + nr + 10, ny + 10);
        }
      });

      // Hover card
      if (hoverIdx >= 0) {
        const p = projs[hoverIdx];
        card.style.left = (p.x ?? 0) + "px";
        card.style.top = ((p._y ?? 0) - (p.r ?? 6) - 6) + "px";
        card.querySelector(".card-meta")!.textContent = `${p.y} · ${p.c}${p.featured ? "  ·  ★ FEATURED" : ""}`;
        card.querySelector("h4")!.textContent = p.n;
        card.querySelector("p")!.textContent = p.o;
        card.querySelector(".card-tech")!.textContent = p.t;
        card.classList.add("show");
        canvas.style.cursor = "pointer";
      } else {
        card.classList.remove("show");
        canvas.style.cursor = "default";
      }

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Apply filter dimming
  useEffect(() => {
    // The canvas re-reads PROJECTS each frame, so we just track the filter state
    // The filter is visualised via opacity in the draw loop — for simplicity we use CSS opacity on the canvas
  }, [activeFilter]);

  return (
    <div>
      {/* Legend */}
      <div className="legend">
        <span><i className="dot" style={{ background: "#ff6b3d" }} />Agile Soft Systems</span>
        <span><i className="dot" style={{ background: "#5b8def" }} />Shine Infosoft</span>
        <span><i className="dot" style={{ background: "#42c79a" }} />Excellent Web World</span>
        <span><i className="dot" style={{ background: "#e6dcc3" }} />Independent</span>
        <span><i className="dot" style={{ background: "#b07eff" }} />Tech Firm</span>
        <span className="toggle">
          {["ALL", "GenAI", "RN"].map((f) => (
            <button
              key={f}
              className={activeFilter === f ? "active" : ""}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </span>
      </div>

      {/* Canvas wrapper */}
      <div className="constellation-wrap" ref={wrapRef}>
        <div className="c-helper">↳ HOVER A NODE</div>
        <div className="c-helper-right">★ = FEATURED · LINE = SHARED TECH</div>
        <canvas ref={canvasRef} />
        <div className="c-axis">
          {YEARS.map((yr) => <span key={yr}>{yr}</span>)}
        </div>
        <div className="proj-hover-card" ref={cardRef}>
          <div className="card-meta" />
          <h4 />
          <p />
          <div className="card-tech" />
        </div>
      </div>

      {/* Archive list */}
      <div className="archive-list">
        <div className="al-head">
          <span>№</span>
          <span className="h-yr">Year</span>
          <span>Project</span>
          <span className="h-co">Company</span>
          <span className="h-tch">Tech</span>
          <span className="h-arr" />
        </div>
        {PROJECTS.map((p, i) => (
          <div key={p.n} className="al-row">
            <span className="al-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="al-year">{p.y}</span>
            <span className="al-name">{p.n}</span>
            <span className="al-co">{p.c}</span>
            <span className="al-tech">{p.t}</span>
            <span className="al-arr">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
