import { useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const WA_NUMBER = '917019149074'
const WA_MESSAGE = encodeURIComponent("Hi Weinnovent Studios! I visited your website and I'm interested in your services. Can we connect?")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

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
    return () => { cancelAnimationFrame(idleId); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: 500, height: 500, position: 'relative', perspective: 1100 }}>
      <motion.div style={{ width: '100%', height: '100%', rotateX, rotateY, transformStyle: 'preserve-3d', position: 'relative' }}>

        {/* Main dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          style={{
            position: 'absolute', inset: '24px 0 0 0',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)', overflow: 'hidden',
            x: d2x, y: d2y,
          }}
        >
          <div style={{ height: 44, background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
            <div style={{ flex: 1, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.07)', marginLeft: 10, display: 'flex', alignItems: 'center', padding: '0 10px' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>weinnovent.com/results</span>
            </div>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { label: 'Leads', value: '1,500+', up: 'Generated', color: '#0C6867' },
                { label: 'Revenue', value: '₹1Cr', up: '10x Growth', color: '#c9a96e' },
                { label: 'ROI', value: '3x', up: 'Ad Spend', color: '#0C6867' },
              ].map(k => (
                <div key={k.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{k.label}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>{k.value}</p>
                  <p style={{ fontSize: 10, color: k.color, fontWeight: 700, marginTop: 4 }}>{k.up}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '12px 12px', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>Client Revenue Growth</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>6 MONTHS</span>
              </div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 48 }}>
                {[15, 22, 31, 45, 68, 80, 88, 95, 100, 100, 100, 100].map((h, i) => (
                  <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.04, ease }}
                    style={{ flex: 1, borderRadius: 3, background: i >= 9 ? '#0C6867' : i >= 6 ? '#c9a96e' : 'rgba(255,255,255,0.12)', height: `${h}%`, transformOrigin: 'bottom' }}
                  />
                ))}
              </div>
            </div>
            {[
              { name: 'Koncept Homes', type: 'Branding + Social', status: '₹42L', color: '#0C6867' },
              { name: 'Nandi Realty', type: 'Performance Ads', status: '347 Leads', color: '#c9a96e' },
            ].map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 7, background: '#0C6867', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{p.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>{p.name}</p>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)' }}>{p.type}</p>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: p.color, fontWeight: 700 }}>{p.status}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating: ROI card */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
          style={{ position: 'absolute', top: -20, right: -28, width: 155, background: '#0C6867', borderRadius: 18, padding: '16px 16px', boxShadow: '0 24px 48px rgba(12,104,103,0.5)', x: d1x, y: d1y, zIndex: 10 }}
        >
          <p style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Revenue Impact</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>₹1 Cr</p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>from ₹10L in 6 months</p>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 24 }}>
            {[10, 20, 35, 55, 75, 90, 100, 100].map((h, i) => (
              <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 1.2 + i * 0.05 }}
                style={{ flex: 1, borderRadius: 2, background: 'rgba(255,255,255,0.4)', height: `${h}%`, transformOrigin: 'bottom' }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating: Leads card */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease }}
          style={{ position: 'absolute', bottom: 28, left: -32, width: 148, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: 18, padding: '16px 16px', boxShadow: '0 20px 48px rgba(0,0,0,0.4)', border: '1px solid rgba(201,169,110,0.3)', x: d1x, y: d1y, zIndex: 10 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: 'rgba(201,169,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 13 }}>🎯</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>Leads Generated</span>
          </div>
          <p style={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 4 }}>1,500+</p>
          <p style={{ fontSize: 10, color: '#c9a96e', fontWeight: 600 }}>Qualified leads · 2024</p>
        </motion.div>

        {/* Live pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease }}
          style={{ position: 'absolute', bottom: -8, right: 16, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: 999, padding: '9px 16px', display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 12px 32px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', x: d2x, y: d2y, zIndex: 10 }}
        >
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>6 brands growing</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

const words = ['Branding', 'Lead Generation', 'Social Media', 'Photography', 'Performance Ads', 'Video Production', 'Identity', '10x ROI']

export default function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', background: '#0a0a0a' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center top', filter: 'brightness(0.90)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.95) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 75% 50%, rgba(12,104,103,0.12) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1160, margin: '0 auto', width: '100%', padding: '130px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="hero-grid">

        <div>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: 'rgba(12,104,103,0.2)', border: '1px solid rgba(12,104,103,0.4)', marginBottom: 24 }}>
            <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#0C6867', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
              #1 Creative Studio · Bengaluru
            </span>
          </motion.div>

          {/* Main hook */}
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#ffffff', marginBottom: 20, textShadow: '0 2px 24px rgba(0,0,0,0.45), 0 1px 4px rgba(0,0,0,0.3)' }}>
            {['Your Best Clients', 'Are Already Searching', "for You — Let's Make Sure They Find You."].map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.span style={{ display: 'block', color: '#ffffff' }}
                  initial={{ y: '110%', filter: 'blur(8px)' }} animate={{ y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease }}
                >{line}</motion.span>
              </div>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }}
            style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', maxWidth: 420, marginBottom: 16 }}>
            A creative studio in Bengaluru that grows brands through <strong style={{ color: '#fff' }}>organic content and social media</strong> — no vanity metrics, no shortcuts. Just consistent, high-quality work that puts your brand in front of the right people and keeps it there.
          </motion.p>

          {/* Trust bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8, ease }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 28, padding: '10px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {['⭐ 6+ Brands Grown', '🌱 Organic Growth First', '📍 Bengaluru', '⚡ Reply in 2 hrs'].map((t, i) => (
              <span key={i} style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>{t}</span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {/* Primary — WhatsApp */}
            <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 12px 32px rgba(37,211,102,0.4)' }}
              whileTap={{ scale: 0.97 }}
              style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: '#25d366', padding: '14px 28px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Get Free Strategy Call
            </motion.a>

            {/* Secondary */}
            <motion.a href="#work"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.75)', padding: '14px 28px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'transparent' }}
            >See Our Results</motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.0, ease }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 28px', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {[['1,500+', 'Leads Generated'], ['₹1Cr', 'Revenue Grown'], ['3x', 'ROI on Ads'], ['6+', 'Brands Served']].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1, marginBottom: 3 }}>{v}</p>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Visual */}
        <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.35, ease }}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <HeroVisual />
        </motion.div>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(0,0,0,0.1)', padding: '13px 0', overflow: 'hidden', background: '#ffffff' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
          {[...words, ...words, ...words].map((w, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, padding: '0 22px', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#111111', whiteSpace: 'nowrap' }}>
              {w}
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#0C6867', display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; padding-top: 100px !important; padding-bottom: 48px !important; }
          .hero-grid > div:last-child { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-grid { padding-top: 90px !important; padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </section>
  )
}
