/**
 * Loading Spinner Component
 * Various loading states and animations
 */

import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  className?: string
}

export function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  className = '',
}: LoadingSpinnerProps) {
  const spinnerClasses = [
    styles.loading,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (variant === 'dots') {
    return (
      <div className={spinnerClasses}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }

  if (variant === 'skeleton') {
    return <div className={spinnerClasses}></div>
  }

  return <div className={spinnerClasses}></div>
}

interface PageLoadingProps {
  message?: string
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className={styles.pageLoading}>
      <div className={styles.pageLoadingContent}>
        <LoadingSpinner size="lg" />
        <p className={styles.pageLoadingMessage}>{message}</p>
      </div>
    </div>
  )
}

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'rectangular',
}: SkeletonProps) {
  const skeletonClasses = [
    styles.skeleton,
    styles[`skeleton-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  }

  return <div className={skeletonClasses} style={style}></div>
}
