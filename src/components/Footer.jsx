import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import logo from '../assets/logo.png'

const ease = [0.22, 1, 0.36, 1]

const WA_NUMBER = '917019149074'
const WA_MESSAGE = encodeURIComponent("Hi Weinnovent Studios! I visited your website and I'm interested in your services. Can we connect?")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
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
          {/* Top section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }} className="footer-top-grid">

            {/* Brand column */}
            <div>
              {/* Logo */}
              <div style={{ marginBottom: 20 }}>
                <img
                  src={logo}
                  alt="Weinnovent Studios"
                  style={{ height: 200, width: 'auto', objectFit: 'contain' }}
                />
              </div>

              <p style={{
                fontSize: 13, color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.75, maxWidth: 240, fontStyle: 'italic',
                marginBottom: 24,
              }}>
                Where strategy meets visuals, and brands become unforgettable.
              </p>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {/* Phone */}
                <a href="tel:+917019149074" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>📞</span>
                  +91 70191 49074
                </a>

                {/* WhatsApp */}
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#25d366'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'rgba(37,211,102,0.1)',
                    border: '1px solid rgba(37,211,102,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>💬</span>
                  Chat on WhatsApp
                </a>

                {/* Email */}
                <a href="mailto:hello@weinnovent.com" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>✉️</span>
                  hello@weinnovent.com
                </a>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                  <span style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>📍</span>
                  Bengaluru, Karnataka, India
                </div>
              </div>

              {/* WhatsApp CTA button */}
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(37,211,102,0.35)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 20px', borderRadius: 999,
                  background: '#25d366',
                  color: '#fff', fontSize: 13, fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </motion.a>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 20 }}>Services</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Branding & Identity', 'Social Media Marketing', 'Performance Marketing', 'Content Creation', 'Photography & Video', 'Website Design'].map(s => (
                  <a key={s} href="#services" style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{s}</a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 20 }}>Company</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Why Us', href: '#why' },
                  { label: 'Our Work', href: '#work' },
                  { label: 'Clients', href: '#clients' },
                  { label: 'Contact', href: '#contact' },
                ].map(l => (
                  <a key={l.label} href={l.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{l.label}</a>
                ))}
              </div>

              {/* Social */}
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 16, marginTop: 32 }}>Follow Us</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Instagram', href: 'https://instagram.com/weinnovent' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/company/weinnovent' },
                  { label: 'Facebook', href: 'https://facebook.com/weinnovent' },
                  { label: 'YouTube', href: 'https://youtube.com/@weinnovent' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0C6867'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{s.label} <span style={{ opacity: 0.4, fontSize: 10 }}>↗</span></a>
                ))}
              </div>
            </div>

            {/* CTA column */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0C6867', marginBottom: 20 }}>Start Today</p>

              {/* Glass CTA card */}
              <div style={{
                padding: '28px 24px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
              }}>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3 }}>
                  Ready to grow your brand?
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 20 }}>
                  Free strategy call. No commitment. Just clarity on what your brand needs.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <motion.a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '12px 16px', borderRadius: 12,
                      background: '#25d366', color: '#fff',
                      fontSize: 13, fontWeight: 600, textDecoration: 'none',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Now
                  </motion.a>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '12px 16px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13, fontWeight: 500, textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >Send a Message</motion.a>
                </div>
              </div>

              {/* Trust badge */}
              <div style={{
                marginTop: 16, padding: '12px 16px', borderRadius: 12,
                background: 'rgba(12,104,103,0.08)',
                border: '1px solid rgba(12,104,103,0.15)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 2 }}>6+ Brands Trust Us</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Bengaluru's premium creative studio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16, paddingTop: 32,
          }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
              © 2026 Weinnovent Studios. All rights reserved. · Bengaluru, India
            </p>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {['Privacy Policy', 'Terms of Service'].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
                >{l}</a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 11, fontWeight: 600, color: '#25d366',
                padding: '4px 12px', borderRadius: 999,
                border: '1px solid rgba(37,211,102,0.3)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >💬 WhatsApp</a>
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
