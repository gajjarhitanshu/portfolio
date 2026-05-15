import useIsMobile from '../hooks/useIsMobile'

const PARAGRAPHS = [
  'Between 2019 and 2022, I worked as a contract-based developer, delivering tailored mobile solutions to clients in varied sectors such as education, e-commerce, and logistics. After transitioning from native Android development to React Native, I focused on building efficient, user-friendly, and cross-platform applications designed to meet diverse business objectives.',
  'Throughout this period, I handled full project lifecycles — taking ownership from architectural planning and coding to deployment and ongoing maintenance. My toolkit included React Native, Firebase integration, and payment gateways like Razorpay and Paytm. I also connected with PHP-based backend services to provide end-to-end solutions for client requirements.',
  'A key aspect of my contract work was close coordination with international clients and distributed teams. Alongside hands-on coding, I led small teams, mentored junior developers, and maintained clean, structured Git workflows. This experience greatly enhanced my versatility, strengthened my communication skills with global stakeholders, and reinforced my ability to independently deliver production-ready software in fast-paced environments.',
]

const HIGHLIGHTS = [
  { value: '14+', label: 'Apps delivered' },
  { value: '3', label: 'Continents served' },
  { value: '2019–22', label: 'Period' },
  { value: '100%', label: 'Client retention' },
]

export default function ContractWork() {
  const isMobile = useIsMobile()
  return (
    <section
      id="contract"
      style={{
        background: 'var(--cream)',
        padding: isMobile ? '80px 20px' : '100px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture number */}
      <div style={{
        position: 'absolute',
        right: '-0.05em',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 'clamp(12rem, 28vw, 22rem)',
        letterSpacing: '-0.06em',
        lineHeight: 1,
        color: 'rgba(13,13,16,0.04)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        2019
      </div>

      <div style={{ position: 'relative', maxWidth: '1200px' }}>
        {/* Section label */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(13,13,16,0.45)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{ width: '2rem', height: '1px', background: 'var(--ink)', display: 'inline-block', opacity: 0.3 }} />
          05 · INDEPENDENT WORK
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--ink)',
          marginBottom: '16px',
        }}>
          Contract-Based
        </h2>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 700,
          fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          color: 'var(--ink)',
          marginBottom: '64px',
          opacity: 0.25,
        }}>
          2019 – 2022
        </h2>

        {/* Stat pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '64px',
        }}>
          {HIGHLIGHTS.map(h => (
            <div key={h.label} style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              padding: '10px 20px',
              border: '1px solid rgba(13,13,16,0.15)',
              borderRadius: '999px',
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--ink)',
                letterSpacing: '-0.02em',
              }}>
                {h.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(13,13,16,0.45)',
              }}>
                {h.label}
              </span>
            </div>
          ))}
        </div>

        {/* Prose columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '24px' : '40px',
          borderTop: '1px solid rgba(13,13,16,0.1)',
          paddingTop: '48px',
        }}>
          {PARAGRAPHS.map((para, i) => (
            <p key={i} style={{
              fontSize: '0.875rem',
              lineHeight: 1.8,
              color: 'rgba(13,13,16,0.6)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
