import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!'

export default function ScrambleText({ text, delay = 0, style, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(text)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    let intervalId
    const timeoutId = setTimeout(() => {
      let frame = 0
      const totalFrames = 26
      intervalId = setInterval(() => {
        frame++
        const revealed = Math.floor((frame / totalFrames) * text.length)
        setDisplay(
          text.split('').map((ch, i) => {
            if (ch === ' ') return ch
            if (i < revealed) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        if (frame >= totalFrames) {
          setDisplay(text)
          clearInterval(intervalId)
        }
      }, 30)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [inView, text, delay])

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  )
}
