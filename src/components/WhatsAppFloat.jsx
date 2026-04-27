import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '917019149074'
const WA_MESSAGE = encodeURIComponent("Hi Weinnovent Studios! I visited your website and I'm interested in your services. Can we connect?")
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`
const ease = [0.22, 1, 0.36, 1]

const WA_SVG = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function WhatsAppFloat() {
  const [showBar, setShowBar] = useState(false)
  const [tooltip, setTooltip] = useState(false)
  const [barDismissed, setBarDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Floating WhatsApp button */}
      <div style={{ position: 'fixed', bottom: barDismissed || !showBar ? 28 : 88, right: 24, zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, transition: 'bottom 0.4s ease' }}>
        <AnimatePresence>
          {tooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease }}
              style={{ background: '#1a1a1a', color: '#fff', fontSize: 12, fontWeight: 500, padding: '8px 14px', borderRadius: 10, whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}
            >
              💬 Free strategy call on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={WA_LINK} target="_blank" rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.5, ease }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onMouseEnter={() => setTooltip(true)}
          onMouseLeave={() => setTooltip(false)}
          style={{ width: 60, height: 60, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(37,211,102,0.45)', cursor: 'pointer', position: 'relative' }}
        >
          <motion.div animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #25d366' }} />
          <WA_SVG size={26} />
        </motion.a>
      </div>

      {/* Sticky bottom sales bar */}
      <AnimatePresence>
        {showBar && !barDismissed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 998, background: 'rgba(10,10,10,0.95)', backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(12,104,103,0.2)', border: '1px solid rgba(12,104,103,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🚀</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 1 }}>Get a FREE brand strategy call today</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>We've helped Bengaluru brands generate 1,500+ leads · Reply in 2 hours</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 999, background: '#25d366', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.3)' }}>
                <WA_SVG size={14} /> WhatsApp Now
              </motion.a>
              <motion.a href="tel:+917019149074"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
                📞 Call
              </motion.a>
              <button onClick={() => setBarDismissed(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 18, cursor: 'pointer', padding: '4px 8px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
