import { useEffect, useRef, useState } from 'react'

// Shared IntersectionObserver — all useInView calls share one observer
const observers = new Map()

function getSharedObserver(rootMargin) {
  const key = rootMargin
  if (observers.has(key)) return observers.get(key)

  const callbacks = new Map()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target)
          if (cb) {
            cb()
            observer.unobserve(entry.target)
            callbacks.delete(entry.target)
          }
        }
      }
    },
    { threshold: 0.1, rootMargin }
  )

  const shared = { observer, callbacks }
  observers.set(key, shared)
  return shared
}

// Scroll-triggered fade-in — uses shared observer
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const rootMargin = options.rootMargin || '0px 0px -40px 0px'
    const { observer, callbacks } = getSharedObserver(rootMargin)

    callbacks.set(el, () => setIsInView(true))
    observer.observe(el)

    return () => {
      observer.unobserve(el)
      callbacks.delete(el)
    }
  }, [])

  return [ref, isInView]
}

// Animated counter with proper cleanup
export function useCounter(target, duration = 1500) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView()
  const hasRun = useRef(false)
  const rafId = useRef(null)

  useEffect(() => {
    if (!isInView || hasRun.current) return
    hasRun.current = true

    const num = parseInt(target.replace(/[^0-9]/g, ''))
    if (isNaN(num)) { setCount(target); return }

    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * num))
      if (progress < 1) {
        rafId.current = requestAnimationFrame(step)
      }
    }
    rafId.current = requestAnimationFrame(step)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [isInView, target, duration])

  const suffix = target.replace(/[0-9]/g, '')
  return [ref, typeof count === 'number' ? count + suffix : count]
}

// Staggered children animation
export function useStagger(count, baseDelay = 80) {
  const [ref, isInView] = useInView()
  return [ref, isInView, (i) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease-out ${i * baseDelay}ms, transform 0.5s ease-out ${i * baseDelay}ms`,
  })]
}
