import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Glass bg */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d1a18 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 24px 40px', position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          {/* Top */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 40, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              {/* Logo glass pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '10px 20px', borderRadius: 999, marginBottom: 16,
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#0C6867', boxShadow: '0 0 8px rgba(12,104,103,0.8)' }} />
                <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Weinnovent Studios</span>
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: 220, fontStyle: 'italic' }}>
                Where strategy meets visuals, and brands become unforgettable.
              </p>
            </div>

            {/* Quick links in glass cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }} className="footer-cols">
              {[
                { title: 'Services', links: [{ label: 'Branding', href: '#services' }, { label: 'Social Media', href: '#services' }, { label: 'Performance', href: '#services' }, { label: 'Photography', href: '#services' }, { label: 'Website Design', href: '#services' }] },
                { title: 'Company', links: [{ label: 'Why Us', href: '#why' }, { label: 'Our Work', href: '#work' }, { label: 'Clients', href: '#clients' }, { label: 'Contact', href: '#contact' }] },
                { title: 'Connect', links: [{ label: 'Instagram', href: 'https://instagram.com/weinnovent' }, { label: 'LinkedIn', href: 'https://linkedin.com/company/weinnovent' }, { label: 'Facebook', href: 'https://facebook.com/weinnovent' }, { label: 'YouTube', href: 'https://youtube.com/@weinnovent' }] },
              ].map(col => (
                <div key={col.title}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 16 }}>{col.title}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {col.links.map(l => (
                      <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined}
                        rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                      >{l.label}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 32 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2026 Weinnovent Studios. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 24 }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                >{l}</a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`@media (max-width: 768px) { .footer-cols { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </footer>
  )
}
