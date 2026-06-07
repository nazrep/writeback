'use client'
import { useEffect, useRef, useState } from 'react'

export function AnimateIn({
  children,
  delay = 0,
  className = '',
  animation = 'fadeUp',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  animation?: 'fadeUp' | 'fadeIn' | 'scaleIn'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const animClass = { fadeUp: 'animate-fade-up', fadeIn: 'animate-fade-in', scaleIn: 'animate-scale-in' }[animation]

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animClass : ''}`}
      style={visible ? { animationDelay: `${delay}ms` } : { opacity: 0 }}
    >
      {children}
    </div>
  )
}
