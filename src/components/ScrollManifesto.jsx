import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, cubicBezier } from 'framer-motion'

// ── Easing curves ─────────────────────────────────────────────────────────────
// Entrance: fast start → long deceleration (cinematic drift-in)
const expOut   = cubicBezier(0.16, 1, 0.3, 1)
// Subtle scale breath: very gentle ease in-out
const sineInOut = cubicBezier(0.37, 0, 0.63, 1)
// Fade segments
const fadeIn   = cubicBezier(0.4, 0, 0.8, 1)
const fadeOut  = cubicBezier(0.2, 0, 0.6, 1)
const hold     = cubicBezier(0, 0, 1, 1)

// ── Social icon definitions ───────────────────────────────────────────────────
// Each icon has its own opacity rhythm so they feel independent, not in lockstep.
// yRange values are intentionally uneven — makes depth read as real distance.
const SOCIAL_ICONS = [
  {
    id: 'instagram',
    viewBox: '0 0 24 24',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    left: '7%',  top: '22%',
    // Enters a beat early, exits slightly after center — foreground feel
    oStops: [0,    0.13, 0.60, 0.87, 1],
    oVals:  [0,    0.16, 0.22, 0.12, 0],
    yRange: [-80,  80],
    sRange: [0.78, 1.14],
    size: 'w-6 h-6',
  },
  {
    id: 'facebook',
    viewBox: '0 0 24 24',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    left: '89%', top: '28%',
    // Enters later, more restrained — mid-distance feel
    oStops: [0.04, 0.22, 0.64, 0.90, 1],
    oVals:  [0,    0.12, 0.17, 0.09, 0],
    yRange: [-46,  46],
    sRange: [0.84, 1.07],
    size: 'w-5 h-5',
  },
  {
    id: 'linkedin',
    viewBox: '0 0 24 24',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    left: '13%', top: '70%',
    // Slowest drift — feels deepest / farthest back
    oStops: [0.02, 0.18, 0.63, 0.89, 1],
    oVals:  [0,    0.14, 0.20, 0.11, 0],
    yRange: [-96,  96],
    sRange: [0.82, 1.10],
    size: 'w-6 h-6',
  },
  {
    id: 'youtube',
    viewBox: '0 0 24 24',
    path: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z',
    left: '85%', top: '65%',
    // Enters late and holds longer — gives a lingering afterthought feel
    oStops: [0.06, 0.25, 0.67, 0.92, 1],
    oVals:  [0,    0.13, 0.19, 0.10, 0],
    yRange: [-58,  58],
    sRange: [0.87, 1.13],
    size: 'w-7 h-7',
  },
]

// ── Single floating icon ──────────────────────────────────────────────────────
function FloatingIcon({ icon, progress }) {
  // Y: smooth linear drift — depth comes from differing travel distances
  const y = useTransform(progress, [0, 1], icon.yRange, { ease: sineInOut })
  // Scale: arcs through mid-peak for a subtle breathing quality
  const scale = useTransform(
    progress,
    [0, 0.5, 1],
    [icon.sRange[0], icon.sRange[1], icon.sRange[0]],
    { ease: sineInOut }
  )
  // Opacity: individual rhythm per icon (see oStops/oVals in definition)
  const opacity = useTransform(
    progress,
    icon.oStops,
    icon.oVals,
    { ease: [fadeIn, hold, hold, fadeOut] }
  )

  return (
    <motion.div
      aria-hidden="true"
      style={{ y, scale, opacity, position: 'absolute', left: icon.left, top: icon.top }}
    >
      <svg viewBox={icon.viewBox} className={`${icon.size} fill-white`}>
        <path d={icon.path} />
      </svg>
    </motion.div>
  )
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function ScrollManifesto() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Lower stiffness → more lag → content trails scroll for a dreamy, cinematic weight.
  // Higher damping prevents oscillation while preserving the heavy feel.
  const p = useSpring(scrollYProgress, { stiffness: 32, damping: 28, restDelta: 0.0005 })

  // ── Primary violet glow — large, slow, breathes with depth ──
  const glowY       = useTransform(p, [0, 1], [110, -110], { ease: sineInOut })
  const glowScale   = useTransform(p, [0, 0.45, 1], [0.62, 1.32, 0.82], { ease: sineInOut })
  const glowOpacity = useTransform(
    p,
    [0, 0.20, 0.62, 1],
    [0, 1,    1,    0],
    { ease: [fadeIn, hold, fadeOut] }
  )

  // ── Secondary blue glow — offset, independent depth plane ───
  const glow2Y      = useTransform(p, [0, 1], [140, -55], { ease: sineInOut })
  const glow2Opacity = useTransform(
    p,
    [0, 0.26, 0.66, 1],
    [0, 0.48,  0.48, 0],
    { ease: [fadeIn, hold, fadeOut] }
  )

  // ── Label — lightest element, earliest arrival ───────────────
  // Spread over 38% of scroll range for slow drift-in
  const labelY       = useTransform(p, [0.03, 0.41], [26, 0], { ease: expOut })
  const labelOpacity = useTransform(
    p,
    [0.03, 0.26, 0.68, 0.93],
    [0,    1,    1,    0],
    { ease: [fadeIn, hold, fadeOut] }
  )

  // ── Headline line 1 — mid-plane, arrives a beat after label ──
  // 42% window = noticeably slower than before
  const line1Y       = useTransform(p, [0.07, 0.49], [68, 0], { ease: expOut })
  const line1Opacity = useTransform(
    p,
    [0.07, 0.30, 0.68, 0.93],
    [0,    1,    1,    0],
    { ease: [fadeIn, hold, fadeOut] }
  )

  // ── Headline line 2 — deep-plane: larger Y, starts later ─────
  // Bigger travel distance + delayed start = feels farther back in Z
  const line2Y       = useTransform(p, [0.11, 0.55], [100, 0], { ease: expOut })
  const line2Opacity = useTransform(
    p,
    [0.11, 0.34, 0.68, 0.93],
    [0,    1,    1,    0],
    { ease: [fadeIn, hold, fadeOut] }
  )
  // Subtle scale arc reinforces the depth illusion on the gradient word
  const line2Scale   = useTransform(
    p,
    [0.11, 0.50, 0.82],
    [0.91, 1.00, 1.025],
    { ease: sineInOut }
  )

  // ── Divider — draws after headline settles ───────────────────
  const ruleScaleX  = useTransform(p, [0.22, 0.56], [0, 1], { ease: expOut })
  const ruleOpacity = useTransform(
    p,
    [0.22, 0.44, 0.68, 0.92],
    [0,    1,    1,    0],
    { ease: [fadeIn, hold, fadeOut] }
  )

  // ── Subtext — last to arrive, lingers longest before exit ────
  const subY       = useTransform(p, [0.28, 0.62], [42, 0], { ease: expOut })
  const subOpacity = useTransform(
    p,
    [0.28, 0.52, 0.70, 0.94],
    [0,    1,    1,    0],
    { ease: [fadeIn, hold, fadeOut] }
  )

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 0: static background depth ──────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,10,30,0.95) 0%, #050505 70%)',
        }}
      />

      {/* ── Layer 1a: primary violet glow ────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale: glowScale, opacity: glowOpacity }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[720px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, rgba(99,102,241,0.10) 45%, transparent 72%)',
            filter: 'blur(64px)',
          }}
        />
      </motion.div>

      {/* ── Layer 1b: secondary blue glow ────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ y: glow2Y, opacity: glow2Opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute top-1/3 left-2/3 w-[380px] h-[320px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 70%)',
            filter: 'blur(52px)',
          }}
        />
      </motion.div>

      {/* ── Layer 2: floating social icons ───────────────── */}
      {SOCIAL_ICONS.map(icon => (
        <FloatingIcon key={icon.id} icon={icon} progress={p} />
      ))}

      {/* ── Layer 3: core content ─────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">

        {/* Studio label */}
        <motion.div style={{ y: labelY, opacity: labelOpacity }} className="mb-9">
          <span
            className="text-[9px] tracking-[0.35em] text-white/22 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Weinnovent Studios &nbsp;·&nbsp; Est. 2024
          </span>
        </motion.div>

        {/* Headline — two lines on distinct depth planes */}
        <div className="overflow-visible mb-10 space-y-1">
          <motion.div style={{ y: line1Y, opacity: line1Opacity }}>
            <h2
              className="block text-[clamp(3rem,7.2vw,7.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              We make the
            </h2>
          </motion.div>

          <motion.div style={{ y: line2Y, opacity: line2Opacity, scale: line2Scale }}>
            <h2
              className="block text-[clamp(3rem,7.2vw,7.8rem)] font-bold leading-[0.98] tracking-[-0.04em]"
              style={{
                fontFamily: 'var(--font-display)',
                background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 38%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              world stop.
            </h2>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-36 h-px mb-10 overflow-hidden">
          <motion.div
            style={{
              scaleX: ruleScaleX,
              opacity: ruleOpacity,
              transformOrigin: 'left center',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(167,139,250,0.7) 0%, rgba(96,165,250,0.25) 100%)',
            }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          style={{ y: subY, opacity: subOpacity }}
          className="text-[14.5px] md:text-[15.5px] text-white/38 leading-[1.85] max-w-[340px] md:max-w-[400px]"
        >
          Brands built to be felt. Stories designed to be
          remembered. Presence engineered to last.
        </motion.p>

      </div>

      {/* ── Edge fades ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent, #050505)' }}
      />
    </section>
  )
}
