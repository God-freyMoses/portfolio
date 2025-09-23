/**
 * Page Wrapper Component
 * Reusable page container with consistent spacing and animations
 */

import React from 'react'
import styles from './PageWrapper.module.css'

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'full-width' | 'narrow'
  spacing?: 'default' | 'compact' | 'spacious'
  animate?: boolean
}

export function PageWrapper({
  children,
  className = '',
  variant = 'default',
  spacing = 'default',
  animate = true,
}: PageWrapperProps) {
  const wrapperClasses = [
    styles.wrapper,
    styles[variant],
    styles[spacing],
    animate && styles.animate,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={wrapperClasses}>{children}</div>
}
