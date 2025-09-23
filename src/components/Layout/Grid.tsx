/**
 * Grid Component
 * Responsive CSS Grid and Flexbox layouts
 */

import React from 'react'
import styles from './Grid.module.css'

interface GridProps {
  children: React.ReactNode
  className?: string
  columns?: 1 | 2 | 3 | 4 | 6 | 12 | 'auto-fit' | 'auto-fill'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  responsive?: boolean
}

export function Grid({
  children,
  className = '',
  columns = 'auto-fit',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  responsive = true,
}: GridProps) {
  const gridClasses = [
    styles.grid,
    styles[`columns-${columns}`],
    styles[`gap-${gap}`],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    responsive && styles.responsive,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={gridClasses}>{children}</div>
}

interface FlexProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

export function Flex({
  children,
  className = '',
  direction = 'row',
  wrap = 'wrap',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
}: FlexProps) {
  const flexClasses = [
    styles.flex,
    styles[`direction-${direction}`],
    styles[`wrap-${wrap}`],
    styles[`gap-${gap}`],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={flexClasses}>{children}</div>
}
