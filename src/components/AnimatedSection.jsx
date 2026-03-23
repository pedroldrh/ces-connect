import { useInView } from '../lib/hooks'

export default function AnimatedSection({ children, className = '', delay = 0, eager = false }) {
  const [ref, isInView] = useInView(eager ? { rootMargin: '200px 0px 0px 0px' } : {})

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
