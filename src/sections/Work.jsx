import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FEATURED } from '../data'
import useIsMobile from '../hooks/useIsMobile'
import useScrollReveal from '../hooks/useScrollReveal'

function ProjectRow({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const ref = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderBottom: '1px solid rgba(245,241,232,0.07)',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Hover sweep */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(255,107,61,0.05) 0%, transparent 80%)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }} />

      {/* Orange scaleY left bar */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: '2px',
        background: 'var(--accent)',
        transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '80px 1fr auto',
        gap: isMobile ? '12px' : '32px',
        alignItems: 'flex-start',
        padding: isMobile ? '28px 16px 28px 20px' : '44px 0 44px 24px',
      }}>
        {/* Index number */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: hovered ? 'var(--accent)' : 'rgba(245,241,232,0.2)',
          transition: 'color 0.3s',
          paddingTop: isMobile ? 0 : '6px',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Title + meta + desc */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '6px',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: hovered ? 'var(--cream)' : 'rgba(245,241,232,0.8)',
              transition: 'color 0.3s',
              margin: 0,
            }}>
              {project.title}
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              opacity: hovered ? 1 : 0.6,
              transition: 'opacity 0.3s',
            }}>
              @ {project.company}
            </span>
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.22)',
            marginBottom: '16px',
          }}>
            {project.year} · {project.role}
          </div>

          <p style={{
            fontSize: '0.875rem',
            lineHeight: 1.65,
            color: hovered ? 'rgba(245,241,232,0.6)' : 'rgba(245,241,232,0.35)',
            transition: 'color 0.35s',
            maxWidth: '560px',
            margin: 0,
          }}>
            {project.description}
          </p>
        </div>

        {/* Tags column */}
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'row' : 'column',
          flexWrap: 'wrap',
          gap: '6px',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          paddingTop: isMobile ? 0 : '4px',
          minWidth: isMobile ? 0 : '120px',
        }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.52rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '999px',
              border: `1px solid ${hovered ? 'rgba(255,107,61,0.25)' : 'rgba(245,241,232,0.08)'}`,
              color: hovered ? 'rgba(245,241,232,0.55)' : 'rgba(245,241,232,0.28)',
              whiteSpace: 'nowrap',
              transition: 'border-color 0.35s, color 0.35s',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const isMobile = useIsMobile()
  const headRef = useScrollReveal()

  return (
    <section id="work" className="section">
      <div className="section-label">03 · FEATURED WORK</div>

      <div
        ref={headRef}
        className="reveal"
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
          marginBottom: '48px',
        }}
      >
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: 'var(--cream)',
          margin: 0,
        }}>
          Selected projects.
        </h2>
        <Link
          to="/projects"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          All Projects ↗
        </Link>
      </div>

      <div style={{ borderTop: '1px solid rgba(245,241,232,0.07)' }}>
        {FEATURED.map((project, i) => (
          <ProjectRow key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
