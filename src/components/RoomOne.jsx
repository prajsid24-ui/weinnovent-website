import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function RoomOne() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 40, damping: 20 })

  // Door panels
  const leftDoorX  = useTransform(smooth, [0.1, 0.55], ['0%', '-100%'])
  const rightDoorX = useTransform(smooth, [0.1, 0.55], ['0%',  '100%'])

  // Light glow behind door
  const glowOpacity = useTransform(smooth, [0.15, 0.5], [0, 1])
  const glowScale   = useTransform(smooth, [0.15, 0.6], [0.6, 1.15])
  const glowBlur    = useTransform(smooth, [0.15, 0.55], [40, 90])

  // Room interior
  const roomOpacity   = useTransform(smooth, [0.35, 0.65], [0, 1])
  const roomScale     = useTransform(smooth, [0.35, 0.65], [0.92, 1])

  // Floating lens flare particles
  const particle1Y = useTransform(smooth, [0.3, 0.8], [30, -20])
  const particle2Y = useTransform(smooth, [0.3, 0.8], [20, -35])
  const particle3Y = useTransform(smooth, [0.3, 0.8], [40, -10])

  // Text entrance
  const textY       = useTransform(smooth, [0.55, 0.75], [24, 0])
  const textOpacity = useTransform(smooth, [0.55, 0.75], [0, 1])

  // Door brand text — fades in early, fades out as door opens
  const brandOpacity = useTransform(smooth, [0, 0.08, 0.22, 0.42], [0, 1, 1, 0])
  const brandScale   = useTransform(smooth, [0, 0.08, 0.42], [0.97, 1, 1.015])

  return (
    <section
      ref={ref}
      className="relative h-[280vh] bg-[#050505]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Deep background vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #0a0608 0%, #020202 100%)',
          }}
        />

        {/* Subtle floor perspective lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            className="w-full h-full absolute"
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            style={{ opacity: 0.04 }}
          >
            {[...Array(7)].map((_, i) => (
              <line
                key={i}
                x1={720}
                y1={450}
                x2={i * 240}
                y2={900}
                stroke="white"
                strokeWidth="0.8"
              />
            ))}
            {[...Array(7)].map((_, i) => (
              <line
                key={`r${i}`}
                x1={720}
                y1={450}
                x2={1440 - i * 240}
                y2={900}
                stroke="white"
                strokeWidth="0.8"
              />
            ))}
          </svg>
        </div>

        {/* Door frame — architectural surround */}
        <div
          className="absolute"
          style={{
            width: 320,
            height: 480,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -52%)',
          }}
        >
          {/* Frame border */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 0 6px rgba(255,255,255,0.015), inset 0 0 0 1px rgba(255,255,255,0.03)',
            }}
          />

          {/* Glow emanating from inside */}
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(255,220,150,0.18) 0%, rgba(255,180,80,0.06) 50%, transparent 100%)',
              filter: glowBlur.get ? undefined : undefined,
            }}
          />

          {/* Room interior — visible after door opens */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-sm"
            style={{ opacity: roomOpacity, scale: roomScale }}
          >
            {/* Warm cinematic background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 120% 120% at 50% 20%, rgba(255,210,120,0.12) 0%, rgba(120,80,30,0.08) 45%, rgba(10,8,6,0.95) 100%)',
              }}
            />

            {/* Camera lens aperture ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="rounded-full"
                style={{
                  width: 110,
                  height: 110,
                  border: '1px solid rgba(255,210,120,0.15)',
                  boxShadow: '0 0 40px rgba(255,190,80,0.08), inset 0 0 30px rgba(255,190,80,0.05)',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,200,100,0.06) 0%, transparent 70%)',
                  }}
                >
                  <div
                    className="rounded-full"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'radial-gradient(circle, rgba(255,210,140,0.18) 0%, transparent 80%)',
                      border: '1px solid rgba(255,210,120,0.2)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Floating light particles / lens flares */}
            <motion.div
              className="absolute"
              style={{ top: '28%', left: '22%', y: particle1Y, opacity: roomOpacity }}
            >
              <div
                className="rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: 'rgba(255,220,150,0.7)',
                  boxShadow: '0 0 12px 4px rgba(255,200,100,0.35)',
                }}
              />
            </motion.div>

            <motion.div
              className="absolute"
              style={{ top: '60%', left: '68%', y: particle2Y, opacity: roomOpacity }}
            >
              <div
                className="rounded-full"
                style={{
                  width: 3,
                  height: 3,
                  background: 'rgba(200,220,255,0.6)',
                  boxShadow: '0 0 10px 3px rgba(180,200,255,0.3)',
                }}
              />
            </motion.div>

            <motion.div
              className="absolute"
              style={{ top: '42%', left: '78%', y: particle3Y, opacity: roomOpacity }}
            >
              <div
                className="rounded-full"
                style={{
                  width: 2,
                  height: 2,
                  background: 'rgba(255,230,180,0.8)',
                  boxShadow: '0 0 8px 3px rgba(255,210,120,0.25)',
                }}
              />
            </motion.div>

            {/* Horizontal light streak */}
            <div
              className="absolute"
              style={{
                top: '38%',
                left: 0,
                right: 0,
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(255,210,120,0.12) 30%, rgba(255,210,120,0.06) 70%, transparent)',
              }}
            />
          </motion.div>

          {/* Brand text on closed door — fades out as door opens */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
            style={{ opacity: brandOpacity, scale: brandScale, zIndex: 10 }}
          >
            {/* Top rule */}
            <div
              style={{
                width: 32,
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)',
                marginBottom: 2,
              }}
            />

            {/* Studio name */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.72)',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Weinnovent
            </p>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: 'rgba(255,255,255,0.72)',
                textTransform: 'uppercase',
                lineHeight: 1,
              }}
            >
              Studios
            </p>

            {/* Bottom rule */}
            <div
              style={{
                width: 32,
                height: 1,
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)',
                marginTop: 2,
                marginBottom: 6,
              }}
            />

            {/* Tagline */}
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 8,
                fontWeight: 400,
                letterSpacing: '0.32em',
                color: 'rgba(255,255,255,0.28)',
                textTransform: 'uppercase',
              }}
            >
              Digital · Visual · Impact
            </p>
          </motion.div>

          {/* Door panel — LEFT */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 overflow-hidden rounded-sm"
            style={{ width: '50%', x: leftDoorX, originX: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(105deg, #0c0b0a 0%, #111009 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            />
            {/* Door panel detail lines */}
            <div
              className="absolute"
              style={{
                top: 24, bottom: 24, left: 14, right: 8,
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            />
            <div
              className="absolute"
              style={{
                top: 40, bottom: 40, left: 20, right: 14,
                border: '1px solid rgba(255,255,255,0.025)',
              }}
            />
          </motion.div>

          {/* Door panel — RIGHT */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 overflow-hidden rounded-sm"
            style={{ width: '50%', x: rightDoorX, originX: 1 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(75deg, #111009 0%, #0c0b0a 100%)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            />
            <div
              className="absolute"
              style={{
                top: 24, bottom: 24, left: 8, right: 14,
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            />
            <div
              className="absolute"
              style={{
                top: 40, bottom: 40, left: 14, right: 20,
                border: '1px solid rgba(255,255,255,0.025)',
              }}
            />
          </motion.div>
        </div>

        {/* Ambient glow on floor below door */}
        <motion.div
          className="absolute"
          style={{
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 280,
            height: 60,
            opacity: glowOpacity,
            background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(255,190,80,0.07) 0%, transparent 80%)',
            filter: 'blur(18px)',
          }}
        />

        {/* Text */}
        <motion.div
          className="absolute text-center"
          style={{
            bottom: '14%',
            left: 0,
            right: 0,
            y: textY,
            opacity: textOpacity,
          }}
        >
          <p
            className="text-[11px] tracking-[0.28em] text-white/25 uppercase mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            01 — Photography &amp; Videography
          </p>
          <p
            className="text-[1.55rem] font-semibold tracking-[-0.02em] text-white/80"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Visuals that capture attention.
          </p>
        </motion.div>

        {/* Scroll hint — fades out as user scrolls */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(smooth, [0, 0.12], [1, 0]) }}
        >
          <span
            className="text-[9px] tracking-[0.3em] text-white/20 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

      </div>
    </section>
  )
}
