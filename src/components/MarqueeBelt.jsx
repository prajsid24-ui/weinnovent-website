const items = [
  'BRANDING', 'SOCIAL MEDIA', 'PERFORMANCE MARKETING',
  'CONTENT CREATION', 'PHOTOGRAPHY & VIDEO', 'WEBSITE DESIGN',
  'LEAD GENERATION', 'BRAND IDENTITY',
]

export default function MarqueeBelt({ reverse = false, light = false }) {
  const track = [...items, ...items]

  return (
    <div style={{
      overflow: 'hidden',
      background: light ? '#f0efe9' : '#0C6867',
      padding: '12px 0',
      borderTop: light ? '1px solid rgba(0,0,0,0.07)' : 'none',
      borderBottom: light ? '1px solid rgba(0,0,0,0.07)' : 'none',
    }}>
      <div
        className={reverse ? 'marquee-track-reverse' : 'marquee-track'}
        style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 28,
              padding: '0 28px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: light ? 'rgba(0,0,0,0.38)' : 'rgba(255,255,255,0.88)',
            }}
          >
            {item}
            <span style={{
              fontSize: 16,
              color: light ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.3)',
              lineHeight: 1,
            }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
