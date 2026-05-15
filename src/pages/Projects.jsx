import { useEffect, useRef, useState } from 'react'
import Nav from '../components/Nav'
import { FEATURED, PROJECTS_ARCHIVE } from '../data'

const COMPANY_COLORS = {
  FULCRUM: '#00c4a7',
  AGILE: '#ff6b3d',
  SHINE: '#5b8def',
  EWW:   '#42c79a',
  INDIE: '#e6dcc3',
  TECH:  '#b07eff',
}
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026]

// ──────────────────────────────────────────────────────────────
// FEATURED CARD
// ──────────────────────────────────────────────────────────────
function FeaturedCard({ project, isFirst }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    const spotX = ((e.clientX - r.left) / r.width) * 100
    const spotY = ((e.clientY - r.top) / r.height) * 100
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg)`
      el.style.setProperty('--spot-x', `${spotX}%`)
      el.style.setProperty('--spot-y', `${spotY}%`)
    })
  }
  const handleMouseLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      className="feat-card"
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(245,241,232,0.08)',
        borderRadius: '12px',
        padding: isFirst ? '48px' : '32px',
        cursor: 'none',
        overflow: 'hidden',
        gridColumn: isFirst ? 'span 2' : 'span 1',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <style>{`
        .feat-card { --spot-x: 50%; --spot-y: 50%; }
        .feat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,107,61,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .feat-card:hover::before { opacity: 1; }
        .feat-card:hover { border-color: rgba(255,107,61,0.3); }
        .feat-card .fc-arrow {
          font-family: var(--font-mono);
          font-size: 1.4rem;
          color: var(--accent);
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.25s, transform 0.25s;
          flex-shrink: 0;
          margin-left: 16px;
        }
        .feat-card:hover .fc-arrow { opacity: 1; transform: translate(0,0); }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '8px',
          }}>
            {project.company} · {project.year}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: isFirst ? 'clamp(1.8rem, 3.5vw, 2.8rem)' : 'clamp(1.2rem, 2vw, 1.7rem)',
            letterSpacing: '-0.03em',
            color: 'var(--cream)',
            lineHeight: 1.1,
          }}>
            {project.title}
          </h3>
        </div>
        <span className="fc-arrow">↗</span>
      </div>

      <p style={{
        fontSize: '0.92rem',
        lineHeight: 1.65,
        color: 'var(--cream-muted)',
        flex: 1,
        maxWidth: isFirst ? '560px' : undefined,
      }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--cream-muted)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// CONSTELLATION — exact port of constellation.js
// ──────────────────────────────────────────────────────────────
function Constellation() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const PROJECTS = PROJECTS_ARCHIVE

    const hash = (s) => {
      let h = 2166136261
      for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 16777619) >>> 0 }
      return h
    }

    // Canvas
    const canvas = document.createElement('canvas')
    canvas.style.cursor = 'pointer'
    canvas.style.display = 'block'
    canvas.style.width = '100%'
    canvas.style.height = '420px'
    container.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    let W = 0, H = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    function layout() {
      const padX = 80, padTop = 110, padBottom = 80
      const innerW = W - padX * 2
      const innerH = H - padTop - padBottom
      PROJECTS.forEach((p) => {
        const yearRatio = (p.year - YEARS[0]) / (YEARS[YEARS.length - 1] - YEARS[0])
        const jx = ((hash(p.title) % 1000) / 1000 - 0.5) * (innerW / (YEARS.length * 1.6))
        p.tx = padX + yearRatio * innerW + jx
        const yr = (hash(p.title + 'y') % 1000) / 1000
        p.ty = padTop + 30 + yr * (innerH - 60)
        p.r = p.featured ? 11 : 6
        if (p.x == null) {
          p.x = p.tx
          p.y0 = p.ty + 80
          p.alpha = 0
          p.cy = p.ty + 80
        }
      })
    }

    function resize() {
      const r = container.getBoundingClientRect()
      W = r.width
      H = 420
      canvas.width = W * DPR
      canvas.height = H * DPR
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      layout()
    }
    resize()
    window.addEventListener('resize', resize)

    function buildEdges() {
      const E = []
      for (let i = 0; i < PROJECTS.length; i++) {
        for (let j = i + 1; j < PROJECTS.length; j++) {
          const a = PROJECTS[i], b = PROJECTS[j]
          if (Math.abs(a.year - b.year) > 1) continue
          const shared = a.tech.filter(t => b.tech.includes(t))
          if (shared.length === 0) continue
          const d2 = (a.tx - b.tx) ** 2 + (a.ty - b.ty) ** 2
          if (d2 > 220 * 220) continue
          E.push([i, j, shared[0]])
        }
      }
      return E
    }
    let edges = buildEdges()
    window.addEventListener('resize', () => { edges = buildEdges() })

    // Hover card
    const card = document.createElement('div')
    card.style.cssText = `
      position:absolute; pointer-events:none; z-index:10;
      background:rgba(13,13,16,0.95); border:1px solid rgba(245,241,232,0.1);
      border-radius:8px; padding:14px 18px; min-width:200px; max-width:260px;
      opacity:0; transform:translateY(4px);
      transition:opacity 0.18s ease, transform 0.18s ease;
      font-family:var(--font-mono); color:var(--cream);
    `
    card.innerHTML = '<div class="cm"></div><h4 class="cn" style="margin:6px 0 4px;font-family:var(--font-sans);font-weight:700;font-size:0.95rem;"></h4><p class="co" style="font-size:0.75rem;color:rgba(245,241,232,0.55);margin:0 0 8px;line-height:1.4;"></p><div class="ct" style="font-size:0.65rem;color:var(--accent);letter-spacing:0.06em;"></div>'
    container.style.position = 'relative'
    container.appendChild(card)

    // Floating dust
    const PARTICLES = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1200, y: Math.random() * 420,
      v: 0.15 + Math.random() * 0.35,
      r: 0.5 + Math.random() * 1.2,
      a: 0.1 + Math.random() * 0.4,
    }))

    const pointer = { x: -1, y: -1 }
    let hoverIdx = -1

    canvas.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
    })
    canvas.addEventListener('pointerleave', () => { pointer.x = -1; pointer.y = -1 })

    const startTime = performance.now()
    const ENTRANCE_DUR = 1800
    const ENTRANCE_STAGGER = 50
    let animId

    function frame(now) {
      animId = requestAnimationFrame(frame)
      const t = (now - startTime) / 1000
      ctx.clearRect(0, 0, W, H)

      // Entrance per node
      PROJECTS.forEach((p, i) => {
        const local = Math.max(0, Math.min(1, ((now - startTime) - i * ENTRANCE_STAGGER) / ENTRANCE_DUR))
        const eased = 1 - Math.pow(1 - local, 3)
        p.alpha = eased
        const startY = p.ty + 80
        p.x += (p.tx - p.x) * 0.08
        p.cy = startY + (p.ty - startY) * eased
      })

      // Year column grid
      YEARS.forEach((yr, i) => {
        const xr = i / (YEARS.length - 1)
        const x = 80 + xr * (W - 160)
        ctx.strokeStyle = 'rgba(42,42,48,0.7)'
        ctx.setLineDash([2, 6])
        ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, H - 80); ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = 'rgba(245,241,232,0.25)'
        ctx.font = "500 10px 'JetBrains Mono', monospace"
        ctx.textAlign = 'center'
        ctx.fillText(yr, x, H - 60)
      })

      // Dust particles
      PARTICLES.forEach((p) => {
        p.y -= p.v
        p.x += Math.sin(t * 0.5 + p.r * 7) * 0.15
        if (p.y < -2) { p.y = H + 4; p.x = Math.random() * W }
        if (p.x < -2) p.x = W
        if (p.x > W + 2) p.x = 0
        ctx.fillStyle = `rgba(245,241,232,${p.a})`
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      })

      // Find hover
      hoverIdx = -1
      let bestDist = Infinity
      if (pointer.x >= 0) {
        PROJECTS.forEach((p, i) => {
          const dx = pointer.x - p.x, dy = pointer.y - p.cy
          const d2 = dx * dx + dy * dy
          const hitR = p.featured ? 22 : 16
          if (d2 < hitR * hitR && d2 < bestDist) { bestDist = d2; hoverIdx = i }
        })
      }

      // Edges
      edges.forEach(([i, j]) => {
        const a = PROJECTS[i], b = PROJECTS[j]
        const isHi = (i === hoverIdx || j === hoverIdx)
        ctx.strokeStyle = isHi ? 'rgba(255,107,61,0.55)' : 'rgba(120,120,130,0.18)'
        ctx.lineWidth = isHi ? 1.4 : 0.8
        ctx.beginPath(); ctx.moveTo(a.x, a.cy); ctx.lineTo(b.x, b.cy); ctx.stroke()
        const pulse = ((t * 0.4 + (i * 0.13)) % 1)
        const px2 = a.x + (b.x - a.x) * pulse
        const py2 = a.cy + (b.cy - a.cy) * pulse
        ctx.fillStyle = isHi ? 'rgba(255,107,61,0.9)' : 'rgba(255,107,61,0.18)'
        ctx.beginPath(); ctx.arc(px2, py2, isHi ? 2.4 : 1.4, 0, Math.PI * 2); ctx.fill()
      })

      // Nodes
      PROJECTS.forEach((p, i) => {
        const hi = i === hoverIdx
        const color = COMPANY_COLORS[p.companyKey] || '#ccc'
        const r = (p.featured ? 11 : 6) * (hi ? 1.6 : 1) * p.alpha

        if (hi || p.featured) {
          const grd = ctx.createRadialGradient(p.x, p.cy, 0, p.x, p.cy, r * (hi ? 6 : 3.5))
          grd.addColorStop(0, color + '55'); grd.addColorStop(1, color + '00')
          ctx.fillStyle = grd
          ctx.beginPath(); ctx.arc(p.x, p.cy, r * (hi ? 6 : 3.5), 0, Math.PI * 2); ctx.fill()
        }

        if (p.featured) {
          ctx.strokeStyle = 'rgba(245,241,232,0.85)'; ctx.lineWidth = 1.2
          ctx.beginPath(); ctx.arc(p.x, p.cy, r + 4, 0, Math.PI * 2); ctx.stroke()
        }

        ctx.globalAlpha = p.alpha
        ctx.fillStyle = color
        ctx.beginPath(); ctx.arc(p.x, p.cy, r, 0, Math.PI * 2); ctx.fill()

        ctx.fillStyle = 'rgba(245,241,232,0.6)'
        ctx.beginPath(); ctx.arc(p.x - r * 0.3, p.cy - r * 0.35, r * 0.25, 0, Math.PI * 2); ctx.fill()
        ctx.globalAlpha = 1

        if (p.featured && !hi) {
          ctx.fillStyle = 'rgba(245,241,232,0.55)'
          ctx.font = "500 11px 'JetBrains Mono', monospace"
          ctx.textAlign = 'left'
          ctx.fillText(p.title, p.x + r + 8, p.cy + 4)
        }
        if (hi) {
          ctx.fillStyle = 'rgba(245,241,232,1)'
          ctx.font = "600 12px 'JetBrains Mono', monospace"
          ctx.textAlign = 'left'
          ctx.fillText(p.title.toUpperCase(), p.x + r + 10, p.cy - 4)
          ctx.fillStyle = 'rgba(245,241,232,0.6)'
          ctx.font = "500 10px 'JetBrains Mono', monospace"
          ctx.fillText(p.year + ' · ' + p.company, p.x + r + 10, p.cy + 10)
        }
      })

      // Hover card
      if (hoverIdx >= 0) {
        const p = PROJECTS[hoverIdx]
        card.style.left = p.x + 'px'
        card.style.top = (p.cy - p.r - 6) + 'px'
        card.querySelector('.cm').textContent = `${p.year} · ${p.company}${p.featured ? ' · ★ FEATURED' : ''}`
        card.querySelector('.cm').style.cssText = 'font-size:0.6rem;letter-spacing:0.1em;color:rgba(245,241,232,0.45);'
        card.querySelector('.cn').textContent = p.title
        card.querySelector('.co').textContent = p.description
        card.querySelector('.ct').textContent = p.stack
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
        canvas.style.cursor = 'pointer'
      } else {
        card.style.opacity = '0'
        card.style.transform = 'translateY(4px)'
        canvas.style.cursor = 'default'
      }
    }

    requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      if (container.contains(canvas)) container.removeChild(canvas)
      if (container.contains(card)) container.removeChild(card)
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', marginBottom: '8px' }} />
}

// ──────────────────────────────────────────────────────────────
// ARCHIVE LIST
// ──────────────────────────────────────────────────────────────
function ArchiveList() {
  const [hovered, setHovered] = useState(null)
  return (
    <div style={{ marginTop: '48px' }}>
      <style>{`
        .archive-row { position: relative; overflow: hidden; }
        .archive-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,107,61,0.04);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .archive-row:hover::before { transform: scaleX(1); }
        .archive-row .ar-arrow {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent);
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .archive-row:hover .ar-arrow { opacity: 1; transform: translateX(0); }
        .archive-row .ar-title {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--cream-muted);
          transition: color 0.25s, transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .archive-row:hover .ar-title {
          color: var(--cream);
          transform: translateX(6px);
        }
        .archive-row .ar-year {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--cream-muted);
          letter-spacing: 0.08em;
          transition: color 0.25s;
        }
        .archive-row:hover .ar-year { color: var(--accent); }
      `}</style>
      {PROJECTS_ARCHIVE.map((p, i) => (
        <div
          key={i}
          className="archive-row"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr auto auto 24px',
            gap: '24px',
            padding: '16px 0',
            borderBottom: '1px solid rgba(245,241,232,0.06)',
            alignItems: 'center',
            cursor: 'none',
          }}
        >
          <span className="ar-year">{p.year}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
              background: COMPANY_COLORS[p.companyKey] || '#ccc',
              transition: 'transform 0.25s',
              transform: hovered === i ? 'scale(1.4)' : 'scale(1)',
            }} />
            <span className="ar-title">{p.title}</span>
            {p.featured && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '999px',
                border: '1px solid rgba(255,107,61,0.3)',
                color: 'var(--accent)',
                flexShrink: 0,
              }}>
                Featured
              </span>
            )}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(245,241,232,0.35)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            {p.company}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'rgba(245,241,232,0.3)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            {p.stack}
          </span>
          <span className="ar-arrow">↗</span>
        </div>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
// PAGE
// ──────────────────────────────────────────────────────────────
export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: 'var(--ink)', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '60px', paddingRight: '60px', borderBottom: '1px solid rgba(245,241,232,0.06)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--cream-muted)', marginBottom: '24px' }}>
          PORTFOLIO · ALL WORK
        </div>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(3rem, 8vw, 8rem)', letterSpacing: '-0.04em', lineHeight: 0.92, color: 'var(--cream)', marginBottom: '32px' }}>
          24 projects.<br />
          <span style={{ color: 'var(--accent)' }}>8+ years.</span>
        </h1>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px', maxWidth: '720px' }}>
          {[
            { value: '24', label: 'Projects shipped' },
            { value: '8+', label: 'Years experience' },
            { value: '3', label: 'Continents' },
            { value: '15+', label: 'Teams led' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(245,241,232,0.08)',
              borderRadius: '10px',
              padding: '20px 16px',
            }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.8rem', letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1, marginBottom: '6px' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cream-muted)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--cream-muted)', maxWidth: '520px' }}>
          Every project below solved a real problem for a real client — from AI companions to blockchain wallets, across mobile and web.
        </p>
      </section>

      {/* Featured grid */}
      <section id="featured" style={{ padding: '80px 60px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cream-muted)', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '2rem', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
          FEATURED DEEP-DIVES
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {FEATURED.map((p, i) => (
            <FeaturedCard key={p.id} project={p} isFirst={i === 0} />
          ))}
        </div>
      </section>

      {/* Constellation archive */}
      <section id="archive" style={{ padding: '80px 60px', borderTop: '1px solid rgba(245,241,232,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--cream-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '2rem', height: '1px', background: 'var(--accent)', display: 'inline-block' }} />
              FULL ARCHIVE · CONSTELLATION VIEW
            </div>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', color: 'var(--cream)', lineHeight: 1 }}>
              Every project, mapped.
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {Object.entries(COMPANY_COLORS).map(([k, color]) => {
              const labels = { AGILE: 'Agile Soft Systems', SHINE: 'Shine Infosoft', EWW: 'Excellent Web World', INDIE: 'Independent', TECH: 'Tech Firm' }
              return (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--cream-muted)' }}>
                    {labels[k]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <Constellation />
        <ArchiveList />
      </section>
    </div>
  )
}
