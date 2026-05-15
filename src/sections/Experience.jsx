import { useState } from 'react'
import { EXPERIENCE } from '../data'

function ExperienceRow({ job }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '40px 0',
        borderBottom: '1px solid var(--ink-muted)',
        cursor: 'none',
      }}
    >
      {/* Hover sweep background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255,107,61,0.05)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }} />
      {/* Left accent bar */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '2px',
        background: 'var(--accent)',
        transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />

      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '24px',
        alignItems: 'start',
      }}>
        <div>
          {/* Role + company */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              transition: 'color 0.2s',
            }}>
              {job.role}
            </h3>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
            }}>
              @ {job.company}
            </span>
          </div>

          {/* Period + location */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--cream-muted)',
            marginBottom: '20px',
          }}>
            {job.period} · {job.location}
          </div>

          {/* Highlights */}
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {job.highlights.map((h, i) => (
              <li key={i} style={{
                display: 'flex',
                gap: '10px',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                color: hovered ? 'var(--cream-muted)' : 'rgba(200,196,188,0.6)',
                transition: 'color 0.3s',
              }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', paddingTop: '4px' }}>
          {job.stack.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid var(--ink-muted)',
              color: 'var(--cream-muted)',
              whiteSpace: 'nowrap',
            }}>
              {t}
            </span>
          ))}
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

      <div style={{ borderTop: '1px solid var(--ink-muted)' }}>
        {EXPERIENCE.map(job => (
          <ExperienceRow key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}
