'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './SkillBadge.module.css'

interface SkillBadgeProps {
  name: string
  level: number
  category: string
  delay?: number
}

const categoryColors = {
  Frontend: 'var(--color-primary-500)',
  Backend: 'var(--color-success-500)',
  Language: 'var(--color-secondary-500)',
  Framework: 'var(--color-info-500)',
  Database: 'var(--color-warning-500)',
  Cloud: 'var(--color-error-500)',
  DevOps: 'var(--color-gray-600)',
  Design: 'var(--color-secondary-600)',
}

export function SkillBadge({
  name,
  level,
  category,
  delay = 0,
}: SkillBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedLevel, setAnimatedLevel] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const isIntersecting = useIntersectionObserver(ref, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px',
  })

  useEffect(() => {
    if (isIntersecting && !isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        // Animate the progress bar
        const steps = 60
        const increment = level / steps
        let current = 0

        const animate = () => {
          current += increment
          if (current <= level) {
            setAnimatedLevel(Math.min(current, level))
            requestAnimationFrame(animate)
          } else {
            setAnimatedLevel(level)
          }
        }
        animate()
      }, delay)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isIntersecting, isVisible, level, delay])

  const categoryColor =
    categoryColors[category as keyof typeof categoryColors] ||
    'var(--color-gray-500)'

  return (
    <div
      ref={ref}
      className={`${styles.skillBadge} ${isVisible ? styles.visible : ''}`}
      style={{ '--category-color': categoryColor } as React.CSSProperties}
    >
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h4 className={styles.name}>{name}</h4>
          <span className={styles.category}>{category}</span>
        </div>
        <span className={styles.percentage}>{Math.round(animatedLevel)}%</span>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressBar}
            style={{ width: `${animatedLevel}%` }}
          />
        </div>
      </div>
    </div>
  )
}
