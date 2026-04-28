import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const WA_NUMBER = '917019149074'
const WA_MESSAGE = encodeURIComponent("Hi Weinnovent Studios! I visited your website and I'm interested in your services. Can we connect?")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export default function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const mainCardRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const spring = { stiffness: 80, damping: 20 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [3, -3]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-3, 3]), spring)
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
        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.9, ease }} style={{ perspective: 1200 }}>
          <motion.div
            ref={mainCardRef}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { rawX.set(0); rawY.set(0); setHovered(false) }}
            style={{
              rotateX, rotateY, transformStyle: 'preserve-3d',
              position: 'relative', borderRadius: 32,
              padding: 'clamp(40px, 6vw, 72px)',
              background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.14)',
              backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
              border: hovered ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.25)',
              boxShadow: hovered ? '0 60px 120px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)' : '0 20px 60px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.35)',
              transition: 'background 0.4s, border 0.4s, box-shadow 0.4s', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: '5%', right: '5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }} />
            <motion.div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.12) 0%, transparent 70%)', left: glowX, top: glowY, transform: 'translate(-50%,-50%)', pointerEvents: 'none', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }} className="contact-inner">
                <div>
                  <motion.p initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.6, delay: 0.1, ease }}
                    style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 16 }}>Limited Slots · Free Strategy Call · No Commitment</motion.p>

                  <motion.h2 initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}} transition={{ duration: 0.9, delay: 0.15, ease }}
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#1a1a1a', marginBottom: 16 }}>
                    Your competitors are already<br />running ads. <span style={{ color: '#0C6867' }}>Are you?</span>
                  </motion.h2>

                  <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25, ease }}
                    style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)', maxWidth: 480, marginBottom: 32 }}>
                    Every month you wait, another brand takes the client that should have been yours. We've helped Bengaluru businesses generate <strong>1,500+ leads</strong> and grow from <strong>₹10L to ₹1Cr</strong> in under 6 months. In your free call, we'll show you exactly what's holding your brand back — and the one move that will change it.
                  </motion.p>

                  {/* Social proof row */}
                  <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3, ease }}
                    style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
                    {['✅ Free 30-min call', '⚡ Reply in 2 hours', '🔒 No sales pressure', '🎯 Actionable roadmap'].map(t => (
                      <span key={t} style={{ fontSize: 12, fontWeight: 500, color: 'rgba(0,0,0,0.55)', padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.08)', backdropFilter: 'blur(8px)' }}>{t}</span>
                    ))}
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.35, ease }}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
                    {/* WhatsApp — Primary */}
                    <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.04, boxShadow: '0 16px 40px rgba(37,211,102,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{ fontSize: 15, fontWeight: 700, color: '#fff', background: '#25d366', padding: '14px 32px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,211,102,0.3)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp for Free Call
                    </motion.a>

                    {/* Call */}
                    <motion.a href="tel:+917019149074"
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                      style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', padding: '14px 24px', borderRadius: 999, border: '1.5px solid rgba(0,0,0,0.15)', display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)' }}>
                      📞 +91 70191 49074
                    </motion.a>
                  </motion.div>
                </div>

                {/* Info cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }} className="contact-info-cards">
                  {[
                    { icon: '🎯', label: 'Leads Generated', value: '1,500+', color: '#0C6867' },
                    { icon: '📈', label: 'Revenue Grown', value: '₹10L → ₹1Cr', color: '#c9a96e' },
                    { icon: '⚡', label: 'ROI on Ad Spend', value: '3x Average', color: '#a78bfa' },
                    { icon: '📍', label: 'Based In', value: 'Bengaluru', color: '#0C6867' },
                  ].map((item, i) => (
                    <motion.div key={item.label}
                      initial={{ opacity: 0, y: 16, scale: 0.95 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                      style={{ padding: '16px 18px', borderRadius: 16, background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{item.icon}</span>
                        <div>
                          <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: item.color, marginBottom: 3 }}>{item.label}</p>
                          <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em' }}>{item.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
