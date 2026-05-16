import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  const dotX = useSpring(mx, { stiffness: 700, damping: 40, mass: 0.3 })
  const dotY = useSpring(my, { stiffness: 700, damping: 40, mass: 0.3 })
  const ringX = useSpring(mx, { stiffness: 130, damping: 18, mass: 0.9 })
  const ringY = useSpring(my, { stiffness: 130, damping: 18, mass: 0.9 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const over = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) setHovering(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, [role="button"], input, textarea, select')) setHovering(false)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [mx, my, visible])

  if (!visible) return null

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99999, pointerEvents: 'none',
          width: 6, height: 6, borderRadius: '50%',
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          scale: hovering ? 2.2 : 1,
          background: hovering ? '#c9a96e' : '#0C6867',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring — lags behind, morphs on hover */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          zIndex: 99998, pointerEvents: 'none',
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
        }}
        animate={{
          width: hovering ? 50 : 32,
          height: hovering ? 50 : 32,
          borderRadius: hovering ? '10px' : '50%',
          boxShadow: hovering
            ? '0 0 0 1.5px rgba(201,169,110,0.75)'
            : '0 0 0 1.5px rgba(12,104,103,0.5)',
          opacity: hovering ? 1 : 0.65,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}
