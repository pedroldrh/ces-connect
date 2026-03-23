import { useState, useEffect, useRef } from 'react'
import { useInView } from '../lib/hooks'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export default function TextScramble({ text, className = '', tag: Tag = 'span', style = {} }) {
  const [display, setDisplay] = useState('')
  const [ref, isInView] = useInView()
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isInView || hasRun.current) return
    hasRun.current = true

    let frame = 0
    const totalFrames = 25
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(progress * text.length)

      let result = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' '
        } else if (i < revealed) {
          result += text[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setDisplay(result)

      if (frame >= totalFrames) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 35)

    return () => clearInterval(interval)
  }, [isInView, text])

  return (
    <Tag ref={ref} className={className} style={style}>
      {display || '\u00A0'}
    </Tag>
  )
}
