import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// ── 3D Floating Dashboard ────────────────────────────────────
function HeroVisual() {
  const containerRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const spring = { stiffness: 90, damping: 20, mass: 0.9 }
  const x = useSpring(rawX, spring)
  const y = useSpring(rawY, spring)

  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12])
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12])
  const d1x = useTransform(x, [-0.5, 0.5], [-20, 20])
  const d1y = useTransform(y, [-0.5, 0.5], [-14, 14])
  const d2x = useTransform(x, [-0.5, 0.5], [-10, 10])
  const d2y = useTransform(y, [-0.5, 0.5], [-7, 7])
  const d3x = useTransform(x, [-0.5, 0.5], [-5, 5])
  const d3y = useTransform(y, [-0.5, 0.5], [-3, 3])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let idleId
    let t = 0

    const idle = () => {
      t += 0.018
      rawX.set(Math.sin(t * 0.6) * 0.09)
      rawY.set(Math.cos(t * 0.45) * 0.07)
      idleId = requestAnimationFrame(idle)
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      rawX.set((e.clientX - r.left) / r.width - 0.5)
      rawY.set((e.clientY - r.top) / r.height - 0.5)
    }
    const onLeave = () => { rawX.set(0); rawY.set(0) }

    idleId = requestAnimationFrame(idle)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(idleId)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: 500, height: 500, position: 'relative', perspective: 1100 }}>
      <motion.div style={{ width: '100%', height: '100%', rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}>

        {/* Main dashboard card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          style={{
            position: 'absolute', inset: '24px 0 0 0',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            x: d3x, y: d3y,
          }}
        >
          {/* Window bar */}
          <div style={{
            height: 44, background: 'rgba(255,255,255,0.05)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6,
          }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />
            ))}
            <div style={{
              flex: 1, height: 22, borderRadius: 6,
              background: 'rgba(255,255,255,0.07)',
              marginLeft: 10, display: 'flex', alignItems: 'center', padding: '0 10px',
            }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>weinnovent.com/dashboard</span>
            </div>
          </div>

          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { label: 'Reach', value: '2.4M', up: '+18%', color: '#0C6867' },
                { label: 'Leads', value: '347', up: '+42%', color: '#c9a96e' },
                { label: 'ROAS', value: '4.8×', up: '+31%', color: '#0C6867' },
              ].map(k => (
                <div key={k.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{k.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, fontFamily: 'Inter, sans-serif' }}>{k.value}</p>
                  <p style={{ fontSize: 10, color: k.color, fontWeight: 600, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>{k.up}</p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '12px 12px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif' }}>Campaign Performance</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>THIS MONTH</span>
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 48 }}>
                {[35, 52, 41, 68, 55, 80, 63, 88, 70, 82, 75, 95].map((h, i) => (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.04, ease }}
                    style={{
                      flex: 1, borderRadius: 3,
                      background: i === 11 ? '#0C6867' : i % 4 === 1 ? '#c9a96e' : 'rgba(255,255,255,0.12)',
                      height: `${h}%`, transformOrigin: 'bottom',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Projects */}
            {[
              { name: 'Koncept Homes', type: 'Branding', status: 'Live', color: '#0C6867' },
              { name: 'Nandi Realty', type: 'Performance Ads', status: 'Active', color: '#c9a96e' },
            ].map(p => (
              <div key={p.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 10px', borderRadius: 10,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: '#0C6867', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'Inter, sans-serif' }}>{p.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif' }}>{p.name}</p>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', fontFamily: 'Inter, sans-serif' }}>{p.type}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: p.color }} />
                  <span style={{ fontSize: 10, color: p.color, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating: Reach card */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
          style={{
            position: 'absolute', top: -20, right: -28,
            width: 155, background: '#0C6867',
            borderRadius: 18, padding: '16px 16px',
            boxShadow: '0 24px 48px rgba(12,104,103,0.5)',
            x: d1x, y: d1y, zIndex: 10,
          }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>Instagram Reach</p>
          <p style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>84K</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.18)', borderRadius: 999, padding: '3px 8px', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: '#fff', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>↑ 23%</span>
          </div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 24 }}>
            {[40, 55, 48, 62, 58, 74, 68, 84].map((h, i) => (
              <motion.div key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
                style={{ flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.35)', height: `${h}%`, transformOrigin: 'bottom' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating: Brand score */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease }}
          style={{
            position: 'absolute', bottom: 28, left: -32,
            width: 140,
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: 18, padding: '16px 16px',
            boxShadow: '0 20px 48px rgba(0,0,0,0.4)',
            border: '1px solid rgba(201,169,110,0.3)',
            x: d1x, y: d1y, zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(201,169,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13 }}>✦</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#fff', fontFamily: 'Inter, sans-serif' }}>Brand Score</span>
          </div>
          <div style={{ position: 'relative', width: 60, height: 60, margin: '0 auto 8px' }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
              <motion.circle cx="30" cy="30" r="24" fill="none" stroke="#c9a96e" strokeWidth="5"
                strokeLinecap="round" strokeDasharray={150}
                initial={{ strokeDashoffset: 150 }}
                animate={{ strokeDashoffset: 150 * 0.13 }}
                transition={{ duration: 1.4, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                transform="rotate(-90 30 30)"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>87</span>
            </div>
          </div>
          <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textAlign: 'center', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Excellent</p>
        </motion.div>

        {/* Floating: Live pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease }}
          style={{
            position: 'absolute', bottom: -8, right: 16,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 999,
            padding: '9px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            x: d2x, y: d2y, zIndex: 10,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }}
          />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>3 campaigns live</span>
        </motion.div>

      </motion.div>
    </div>
  )
}

// ── Marquee words ────────────────────────────────────────────
const words = ['Branding', 'Strategy', 'Social Media', 'Photography', 'Performance', 'Video Production', 'Identity', 'Growth']

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      background: '#0a0a0a',
    }}>

      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        filter: 'brightness(0.3)',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)',
      }} />

      {/* Teal glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 75% 50%, rgba(12,104,103,0.12) 0%, transparent 70%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1160, margin: '0 auto', width: '100%',
        padding: '130px 24px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48, alignItems: 'center',
      }} className="hero-grid">

        {/* Left: copy */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px', borderRadius: 999,
              background: 'rgba(12,104,103,0.2)',
              border: '1px solid rgba(12,104,103,0.4)',
              marginBottom: 32,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#0C6867', display: 'block' }}
            />
            <span style={{
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'Inter, sans-serif',
            }}>Creative Studio · Bengaluru</span>
          </motion.div>

          {/* Headline — Inter, refined weight */}
          <h1 style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            color: '#ffffff',
            marginBottom: 24,
          }}>
            {['We build brands', 'that earn', 'attention.'].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span
                  style={{
                    display: 'block',
                    color: i === 2 ? '#0C6867' : '#ffffff',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease }}
                >{line}</motion.span>
              </div>
            ))}
          </h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16, lineHeight: 1.7,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 390, marginBottom: 32,
            }}
          >
            A digital and creative studio crafting identities, campaigns, and experiences for brands ready to lead their category.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.76, ease }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}
          >
            <a href="#contact" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, fontWeight: 600, color: '#fff',
              background: '#0C6867', padding: '13px 26px',
              borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0f8584'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px rgba(12,104,103,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0C6867'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#work" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              padding: '13px 26px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'transparent' }}
            >View Our Work</a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            style={{
              display: 'flex', gap: 32,
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {[['6+', 'Active Clients'], ['4+', 'Years Experience'], ['100%', 'End-to-End']].map(([v, l]) => (
              <div key={l}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 26, fontWeight: 700,
                  letterSpacing: '-0.03em', color: '#fff',
                  lineHeight: 1, marginBottom: 4,
                }}>{v}</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 10, color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
                }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D visual */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <HeroVisual />
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '13px 0', overflow: 'hidden',
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
          {[...words, ...words, ...words].map((w, i) => (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 18,
              padding: '0 22px', fontSize: 11, fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap',
              fontFamily: 'Inter, sans-serif',
            }}>
              {w}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0C6867', display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}
