/**
 * Main Layout Component
 * Root layout structure with header, main content, and footer
 */

import React from 'react'
import Navigation from '../Navigation'
import { Footer } from './Footer'
import styles from './Layout.module.css'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className={`${styles.layout} ${className}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className={styles.header}>
        <Navigation />
      </header>

      <main id="main-content" className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  )
}
