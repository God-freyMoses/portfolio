/**
 * Page Transition Component
 * Smooth page transitions and animations
 */

'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './PageTransition.module.css'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setIsLoading(false)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname, children])

  return (
    <div className={styles.transition}>
      <div
        className={`${styles.content} ${isLoading ? styles.loading : styles.loaded}`}
      >
        {displayChildren}
      </div>

      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}
    </div>
  )
}

interface FadeTransitionProps {
  children: React.ReactNode
  show: boolean
  duration?: number
}

export function FadeTransition({
  children,
  show,
  duration = 300,
}: FadeTransitionProps) {
  const [shouldRender, setShouldRender] = useState(show)

  useEffect(() => {
    if (show) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [show, duration])

  if (!shouldRender) return null

  return (
    <div
      className={`${styles.fadeTransition} ${show ? styles.fadeIn : styles.fadeOut}`}
      style={{ '--duration': `${duration}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface SlideTransitionProps {
  children: React.ReactNode
  show: boolean
  direction?: 'up' | 'down' | 'left' | 'right'
  duration?: number
}

export function SlideTransition({
  children,
  show,
  direction = 'up',
  duration = 300,
}: SlideTransitionProps) {
  const [shouldRender, setShouldRender] = useState(show)

  useEffect(() => {
    if (show) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [show, duration])

  if (!shouldRender) return null

  return (
    <div
      className={`${styles.slideTransition} ${styles[`slide-${direction}`]} ${show ? styles.slideIn : styles.slideOut}`}
      style={{ '--duration': `${duration}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
