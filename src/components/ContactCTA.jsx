import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '0,0,0'
}

function GlassInfoCard({ label, value, color, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), spring)

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false) }}
        style={{
          rotateX, rotateY, transformStyle: 'preserve-3d',
          padding: '20px 24px', borderRadius: 18,
          background: hovered ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: hovered ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.2)',
          boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)' : '0 4px 16px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.3)',
          transition: 'all 0.35s ease', cursor: 'default',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }} />
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: color || '#0C6867', marginBottom: 6 }}>{label}</p>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em' }}>{value}</p>
      </motion.div>
    </motion.div>
  )
}

export default function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mainCardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 80, damping: 20 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-4, 4]), spring)
  const glowX = useSpring(useTransform(rawX, [-0.5, 0.5], [20, 80]), spring)
  const glowY = useSpring(useTransform(rawY, [-0.5, 0.5], [20, 80]), spring)

  const onMove = (e) => {
    const r = mainCardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', padding: '80px 24px 120px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(135deg, #f0f9ff 0%, #fafaf7 40%, #f5f0ff 70%, #f0faf5 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease }}
          style={{ perspective: 1200 }}
        >
          <motion.div
            ref={mainCardRef}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false) }}
            style={{
              rotateX, rotateY, transformStyle: 'preserve-3d',
              position: 'relative', borderRadius: 32,
              padding: 'clamp(40px, 6vw, 80px)',
              background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
              border: hovered ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.25)',
              boxShadow: hovered
                ? '0 60px 120px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)'
                : '0 20px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.35)',
              transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
              overflow: 'hidden',
            }}
          >
            {/* Top shine */}
            <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }} />

            {/* Mouse glow */}
            <motion.div style={{
              position: 'absolute', width: 300, height: 300, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(12,104,103,0.15) 0%, transparent 70%)',
              left: glowX, top: glowY, transform: 'translate(-50%,-50%)',
              pointerEvents: 'none', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }} className="contact-inner">
                <div>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1, ease }}
                    style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 24 }}>Get In Touch</motion.p>

                  <motion.h2 initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15, ease }}
                    style={{ fontSize: 'clamp(2.4rem, 5vw, 4.8rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0, color: '#1a1a1a', marginBottom: 24 }}>
                    Ready to build<br />something <span style={{ color: '#0C6867' }}>lasting?</span>
                  </motion.h2>

                  <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25, ease }}
                    style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)', maxWidth: 460, marginBottom: 40 }}>
                    Book a free strategy call. No fluff, no pressure — just a clear plan for what your brand can become.
                  </motion.p>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35, ease }}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                    <a href="mailto:hello@weinnovent.com" style={{
                      fontSize: 14, fontWeight: 600, color: '#fff',
                      background: '#0C6867', padding: '14px 32px',
                      borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 10,
                      transition: 'all 0.2s',
                      boxShadow: '0 8px 24px rgba(12,104,103,0.3)',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#0f8584'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(12,104,103,0.4)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#0C6867'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(12,104,103,0.3)' }}
                    >
                      Book a Free Strategy Call
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                    <a href="mailto:hello@weinnovent.com" style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#0C6867'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.45)'}
                    >hello@weinnovent.com</a>
                  </motion.div>
                </div>

                {/* Info cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }} className="contact-info-cards">
                  <GlassInfoCard label="Location" value="Bengaluru, India" color="#0C6867" index={0} inView={inView} />
                  <GlassInfoCard label="Response Time" value="Within 24 hours" color="#c9a96e" index={1} inView={inView} />
                  <GlassInfoCard label="First Call" value="Always free" color="#a78bfa" index={2} inView={inView} />

                  {/* Social links */}
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6, ease }}
                    style={{ padding: '16px 20px', borderRadius: 18, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>Follow Us</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[
                        { label: 'Instagram', href: 'https://instagram.com/weinnovent', color: '#e1306c' },
                        { label: 'LinkedIn', href: 'https://linkedin.com/company/weinnovent', color: '#0077b5' },
                        { label: 'YouTube', href: 'https://youtube.com/@weinnovent', color: '#ff0000' },
                      ].map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 13, fontWeight: 500, color: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = s.color}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(0,0,0,0.55)'}
                        >{s.label} <span style={{ opacity: 0.4, fontSize: 10 }}>↗</span></a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-inner { grid-template-columns: 1fr !important; }
          .contact-info-cards { flex-direction: row !important; flex-wrap: wrap; }
        }
      `}</style>
    </section>
  )
}
