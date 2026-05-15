import { SKILLS } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-label">{SKILLS.label}</div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '24px',
        marginBottom: '56px',
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
          {SKILLS.headline}
        </h2>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--cream-muted)',
          paddingTop: '8px',
          alignSelf: 'flex-end',
        }}>
          {SKILLS.sub}
        </div>
      </div>

      <hr style={{ marginBottom: '48px' }} />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        {SKILLS.tags.map((tag, i) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '10px 18px',
              borderRadius: '999px',
              border: '1px solid var(--ink-muted)',
              color: 'var(--cream-muted)',
              background: 'transparent',
              cursor: 'none',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--cream)'
              e.currentTarget.style.background = 'rgba(255,107,61,0.08)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--ink-muted)'
              e.currentTarget.style.color = 'var(--cream-muted)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}
