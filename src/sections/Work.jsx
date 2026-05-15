import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED } from '../data'

// CSS isometric cube matching the design's upper-right decoration
function IsoCube() {
  return (
    <div style={{ position: 'absolute', top: '60px', right: '32px', width: '130px', height: '130px', pointerEvents: 'none' }}>
      <style>{`
        .iso-cube {
          position: relative;
          width: 80px;
          height: 80px;
          transform-style: preserve-3d;
          transform: rotateX(-30deg) rotateY(45deg);
          margin: 30px auto 0;
        }
        .iso-face {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 1px solid rgba(0,0,0,0.15);
        }
        .iso-top {
          background: rgba(0,0,0,0.12);
          transform: rotateX(90deg) translateZ(40px);
        }
        .iso-front {
          background: rgba(0,0,0,0.22);
          transform: translateZ(40px);
        }
        .iso-right {
          background: rgba(0,0,0,0.32);
          transform: rotateY(90deg) translateZ(40px);
        }
      `}</style>
      <div className="iso-cube">
        <div className="iso-face iso-top" />
        <div className="iso-face iso-front" />
        <div className="iso-face iso-right" />
      </div>
    </div>
  )
}

function FirstCard({ project }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1200px) rotateY(${px * 5}deg) rotateX(${-py * 5}deg) translateZ(0)`
    })
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: 'var(--accent)',
        borderRadius: '12px',
        padding: '40px',
        cursor: 'none',
        overflow: 'hidden',
        gridColumn: '1',
        gridRow: '1 / span 2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '480px',
        transition: 'transform 0.15s ease',
      }}
    >
      {/* Isometric cube decoration */}
      <IsoCube />

      {/* Top meta row */}
      <div style={{
        position: 'absolute',
        top: '32px',
        left: '40px',
        right: '40px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(13,13,16,0.6)',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
      }}>
        <span style={{ flexShrink: 0 }}># 01</span>
        <span style={{ textAlign: 'right' }}>{project.year} · {project.company}</span>
      </div>

      {/* Bottom content */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
          letterSpacing: '-0.03em',
          color: 'var(--ink)',
          lineHeight: 1.05,
          marginBottom: '16px',
        }}>
          {project.title}
        </h3>

        <p style={{
          fontSize: '0.9rem',
          lineHeight: 1.65,
          color: 'rgba(13,13,16,0.72)',
          marginBottom: '24px',
          maxWidth: '380px',
        }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: '999px',
              background: 'transparent',
              color: 'var(--ink)',
              border: '1px solid rgba(13,13,16,0.3)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
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
      el.style.transform = `perspective(1000px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateZ(0)`
      el.style.setProperty('--spot-x', `${spotX}%`)
      el.style.setProperty('--spot-y', `${spotY}%`)
    })
  }

  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card"
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(245,241,232,0.08)',
        borderRadius: '12px',
        padding: '32px',
        cursor: 'none',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.15s ease',
      }}
    >
      <style>{`
        .project-card { --spot-x: 50%; --spot-y: 50%; }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,107,61,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .project-card:hover::before { opacity: 1; }
        .project-card:hover { border-color: rgba(255,107,61,0.3); }
        .project-card .arrow {
          position: absolute;
          bottom: 28px;
          right: 28px;
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--accent);
          opacity: 0;
          transform: translate(-6px, 6px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .project-card:hover .arrow { opacity: 1; transform: translate(0,0); }
      `}</style>

      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.1em',
        color: 'var(--cream-muted)',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span># {String(index + 1).padStart(2, '0')}</span>
        <span>{project.year} · {project.company.toUpperCase()}</span>
      </div>

      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
        letterSpacing: '-0.02em',
        color: 'var(--cream)',
        marginBottom: '12px',
        lineHeight: 1.1,
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: '0.88rem',
        lineHeight: 1.65,
        color: 'var(--cream-muted)',
        marginBottom: '24px',
      }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.05)',
            color: 'var(--cream-muted)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="arrow">↗</div>
    </div>
  )
}

export default function Work() {
  // first card + next 2 in tall-left layout, then last 3 in 3-col row
  const [first, ...rest] = FEATURED
  const topRight = rest.slice(0, 2)
  const bottomRow = rest.slice(2)

  return (
    <section id="work" className="section">
      <div className="section-label">03 · FEATURED WORK</div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: '56px',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'var(--cream)',
        }}>
          Selected projects.
        </h2>
        <Link to="/projects" className="pill pill-outline" style={{ flexShrink: 0 }}>
          FULL ARCHIVE ↗
        </Link>
      </div>

      <hr style={{ marginBottom: '32px' }} />

      {/* Top section: tall orange card + 2 stacked dark cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '12px',
        marginBottom: '12px',
      }}>
        <FirstCard project={first} />
        {topRight.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + 1} />
        ))}
      </div>

      {/* Bottom row: 3 equal cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}>
        {bottomRow.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i + 3} />
        ))}
      </div>
    </section>
  )
}
