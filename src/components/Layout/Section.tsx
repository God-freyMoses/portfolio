/**
 * Section Component
 * Reusable section container with consistent spacing and grid layouts
 */

import React from 'react'
import styles from './Section.module.css'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  variant?: 'default' | 'hero' | 'feature' | 'content'
  background?: 'default' | 'alternate' | 'dark' | 'gradient'
  spacing?: 'default' | 'compact' | 'spacious'
  fullHeight?: boolean
}

export function Section({
  children,
  id,
  className = '',
  variant = 'default',
  background = 'default',
  spacing = 'default',
  fullHeight = false,
}: SectionProps) {
  const sectionClasses = [
    styles.section,
    styles[variant],
    styles[`bg-${background}`],
    styles[spacing],
    fullHeight && styles.fullHeight,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={sectionClasses}>
      <div className="container">{children}</div>
    </section>
  )
}
