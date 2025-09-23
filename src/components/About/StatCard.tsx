'use client'

import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './StatCard.module.css'

interface StatCardProps {
  label: string
  value: string
  icon: string
  delay?: number
}

export function StatCard({ label, value, icon, delay = 0 }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const isIntersecting = useIntersectionObserver(ref, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  })

  useEffect(() => {
    if (isIntersecting && !isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true)

        // Animate numeric values
        const numericMatch = value.match(/(\d+)/)
        if (numericMatch && numericMatch[1]) {
          const targetNumber = parseInt(numericMatch[1], 10)
          const suffix = value.replace(numericMatch[0], '')
          const steps = 60
          const increment = targetNumber / steps
          let current = 0

          const animate = () => {
            current += increment
            if (current <= targetNumber) {
              setAnimatedValue(Math.floor(current) + suffix)
              requestAnimationFrame(animate)
            } else {
              setAnimatedValue(value)
            }
          }
          animate()
        } else {
          setAnimatedValue(value)
        }
      }, delay)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isIntersecting, isVisible, value, delay])

  return (
    <div
      ref={ref}
      className={`${styles.statCard} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{animatedValue}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  )
}
