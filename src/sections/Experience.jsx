import { useState } from 'react'
import { EXPERIENCE } from '../data'
import useIsMobile from '../hooks/useIsMobile'

function ExperienceRow({ job, index }) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', cursor: 'none' }}
    >
      <style>{`
        .exp-row-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255,107,61,0.06) 0%, transparent 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .exp-row-sweep.active { transform: scaleX(1); }
        .exp-accent-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: var(--accent);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .exp-accent-bar.active { transform: scaleY(1); }
      `}</style>

      <div className={`exp-row-sweep${hovered ? ' active' : ''}`} />
      <div className={`exp-accent-bar${hovered ? ' active' : ''}`} />

      <div style={{
        position: 'relative',
        padding: '52px 0 52px 24px',
        borderBottom: '1px solid rgba(245,241,232,0.07)',
      }}>
        {/* Index + period row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '20px',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: hovered ? 'var(--accent)' : 'rgba(245,241,232,0.2)',
            transition: 'color 0.35s',
            minWidth: '28px',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div style={{
            flex: 1,
            height: '1px',
            background: hovered ? 'rgba(255,107,61,0.3)' : 'rgba(245,241,232,0.07)',
            transition: 'background 0.35s',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,241,232,0.3)',
          }}>
            {job.period}
          </span>
        </div>

        {/* Role + company */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap', marginBottom: '6px' }}>
          <h3 style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
            letterSpacing: '-0.025em',
            color: hovered ? 'var(--cream)' : 'rgba(245,241,232,0.8)',
            transition: 'color 0.3s',
            lineHeight: 1.1,
          }}>
            {job.role}
          </h3>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            opacity: hovered ? 1 : 0.65,
            transition: 'opacity 0.3s',
          }}>
            @ {job.company}
          </span>
        </div>

        {/* Location */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,232,0.25)',
          marginBottom: '28px',
        }}>
          {job.location}
        </div>

        {/* Highlights + stack */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          gap: isMobile ? '16px' : '40px',
          alignItems: 'start',
        }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {job.highlights.map((h, i) => (
              <li key={i} style={{
                display: 'flex',
                gap: '14px',
                fontSize: '0.875rem',
                lineHeight: 1.65,
                color: hovered ? 'rgba(245,241,232,0.65)' : 'rgba(245,241,232,0.38)',
                transition: 'color 0.35s',
              }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>—</span>
                {h}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: '6px', alignItems: isMobile ? 'flex-start' : 'flex-end' }}>
            {job.stack.map(t => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '999px',
                border: `1px solid ${hovered ? 'rgba(255,107,61,0.22)' : 'rgba(245,241,232,0.08)'}`,
                color: hovered ? 'rgba(245,241,232,0.6)' : 'rgba(245,241,232,0.3)',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.35s, color 0.35s',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-label">04 · EXPERIENCE</div>

      <h2 style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: 'var(--cream)',
        marginBottom: '56px',
      }}>
        Where I've shipped.
      </h2>

      <div style={{ borderTop: '1px solid rgba(245,241,232,0.07)' }}>
        {EXPERIENCE.map((job, i) => (
          <ExperienceRow key={job.id} job={job} index={i} />
        ))}
      </div>
    </section>
  )
}
