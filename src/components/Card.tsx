/**
 * Card Component
 * Example component demonstrating CSS Modules usage with the design system
 */

import React from 'react'
import styles from './Card.module.css'

interface CardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  variant?: 'default' | 'featured' | 'glass'
  size?: 'small' | 'default' | 'large' | 'compact'
  isLoading?: boolean
  isActive?: boolean
  isDisabled?: boolean
  className?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  isActive = false,
  isDisabled = false,
  className = '',
  onClick,
}) => {
  const cardClasses = [
    styles.card,
    variant !== 'default' && styles[`card--${variant}`],
    size !== 'default' && styles[`card--${size}`],
    isLoading && styles.isLoading,
    isActive && styles.isActive,
    isDisabled && styles.isDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <header className={styles.card__header}>
          <h3 className={styles.card__title}>{title}</h3>
          {subtitle && <p className={styles.card__subtitle}>{subtitle}</p>}
        </header>
      )}

      <div className={styles.card__content}>
        {typeof children === 'string' ? (
          <p className={styles.card__text}>{children}</p>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default Card
