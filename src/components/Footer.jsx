import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import logo from '../assets/logo.png'

const ease = [0.22, 1, 0.36, 1]
const WA_NUMBER = '917019149074'
const WA_MESSAGE = encodeURIComponent("Hi Weinnovent Studios! I visited your website and I'm interested in your services. Can we connect?")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

const WA_SVG = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0d1a18 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(12,104,103,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 24px 40px', position: 'relative', zIndex: 1 }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1.2fr', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="footer-top-grid">

            {/* Brand col */}
            <div>
              <img src={logo} alt="Weinnovent Studios — Digital Marketing Agency Bengaluru"
                style={{ height: 200, width: 'auto', objectFit: 'contain', marginBottom: 16, display: 'block' }} />

              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 240, fontStyle: 'italic', marginBottom: 24 }}>
                North Bengaluru's premium digital marketing studio. We build brands that generate real revenue.
              </p>

              {/* Contact details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <a href="tel:+917019149074" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>📞</span>
                  +91 70191 49074
                </a>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25d366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>💬</span>
                  Chat on WhatsApp
                </a>
                <a href="mailto:hello@weinnovent.com"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✉️</span>
                  hello@weinnovent.com
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>📍</span>
                  North Bengaluru, Karnataka
                </div>
              </div>

              {/* WhatsApp button */}
              <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(37,211,102,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: '#25d366', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.25)' }}>
                <WA_SVG /> WhatsApp Us Now
              </motion.a>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 20 }}>Services</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                {['Branding & Identity', 'Social Media Marketing', 'Performance Marketing', 'Content Creation', 'Photography & Video', 'Website Design'].map(s => (
                  <a key={s} href="#services" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>{s}</a>
                ))}
              </div>
            </div>

            {/* Company + Social */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 20 }}>Company</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 32 }}>
                {[{ l: 'Why Us', h: '#why' }, { l: 'Our Work', h: '#work' }, { l: 'Clients', h: '#clients' }, { l: 'Contact', h: '#contact' }].map(i => (
                  <a key={i.l} href={i.h} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>{i.l}</a>
                ))}
              </div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 16 }}>Follow Us</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { l: 'Instagram', h: 'https://instagram.com/weinnovent' },
                  { l: 'LinkedIn', h: 'https://linkedin.com/company/weinnovent' },
                  { l: 'Facebook', h: 'https://facebook.com/weinnovent' },
                  { l: 'YouTube', h: 'https://youtube.com/@weinnovent' },
                ].map(s => (
                  <a key={s.l} href={s.h} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 5 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0C6867'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{s.l} <span style={{ opacity: 0.4, fontSize: 10 }}>↗</span></a>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 20 }}>Start Today</p>
              <div style={{ padding: '24px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)', marginBottom: 12 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.35 }}>Ready to 10x your brand?</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 18 }}>Free strategy call. No fluff. Just a clear plan to grow your revenue.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 12, background: '#25d366', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                    <WA_SVG /> WhatsApp Now
                  </motion.a>
                  <motion.a href="tel:+917019149074"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                    📞 Call: +91 70191 49074
                  </motion.a>
                </div>
              </div>

              {/* Trust badge */}
              <div style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(12,104,103,0.08)', border: '1px solid rgba(12,104,103,0.15)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 2 }}>1,500+ Leads Generated</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Trusted by Bengaluru brands</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 28 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
              © 2026 Weinnovent Studios · Digital Marketing Agency · North Bengaluru, Karnataka, India
            </p>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>{l}</a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, fontWeight: 600, color: '#25d366', padding: '4px 12px', borderRadius: 999, border: '1px solid rgba(37,211,102,0.3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                <WA_SVG /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .footer-top-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-top-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
