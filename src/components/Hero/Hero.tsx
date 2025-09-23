/**
 * Hero Component
 * Advanced hero section with parallax scrolling, animated gradients, and particle system
 */

'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './Hero.module.css'
import { ParticleSystem } from './ParticleSystem'

interface HeroProps {
  title: string
  subtitle: string
  description: string
  ctaText: string
  ctaHref: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  backgroundImage?: string
  showParticles?: boolean
}

export function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  showParticles = true,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Intersection Observer for staggered animations
  const isIntersecting = useIntersectionObserver(heroRef, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  })

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger animations when in view
  useEffect(() => {
    if (isIntersecting && !isVisible) {
      setIsVisible(true)
    }
  }, [isIntersecting, isVisible])

  // Apply parallax transform
  useEffect(() => {
    if (backgroundRef.current) {
      const parallaxSpeed = 0.5
      backgroundRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`
    }
  }, [scrollY])

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Hero section">
      {/* Parallax Background */}
      <div ref={backgroundRef} className={styles.background} aria-hidden="true">
        {/* Animated Gradient Mesh */}
        <div className={styles.gradientMesh}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gradientOrb3}></div>
          <div className={styles.gradientOrb4}></div>
        </div>

        {/* Background Image */}
        {backgroundImage && (
          <div className={styles.backgroundImage}>
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              quality={90}
              sizes="100vw"
              className={styles.image}
            />
          </div>
        )}

        {/* Particle System */}
        {showParticles && (
          <div className={styles.particles}>
            <ParticleSystem />
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div
            className={`${styles.textContent} ${isVisible ? styles.animate : ''}`}
          >
            {/* Subtitle */}
            <div className={styles.subtitle}>
              <span className={styles.subtitleText}>{subtitle}</span>
            </div>

            {/* Main Title */}
            <h1 className={styles.title}>
              <span className={styles.titleLine1}>
                {title
                  .split(' ')
                  .slice(0, Math.ceil(title.split(' ').length / 2))
                  .join(' ')}
              </span>
              <span className={styles.titleLine2}>
                {title
                  .split(' ')
                  .slice(Math.ceil(title.split(' ').length / 2))
                  .join(' ')}
              </span>
            </h1>

            {/* Description */}
            <p className={styles.description}>{description}</p>

            {/* Call to Action Buttons */}
            <div className={styles.actions}>
              <a
                href={ctaHref}
                className={styles.primaryCta}
                aria-label={ctaText}
              >
                <span>{ctaText}</span>
                <svg
                  className={styles.ctaIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4.5 10h11m-5.5-5.5L15.5 10l-5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {secondaryCtaText && secondaryCtaHref && (
                <a
                  href={secondaryCtaHref}
                  className={styles.secondaryCta}
                  aria-label={secondaryCtaText}
                >
                  <span>{secondaryCtaText}</span>
                </a>
              )}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={styles.scrollIndicator} aria-hidden="true">
            <div className={styles.scrollMouse}>
              <div className={styles.scrollWheel}></div>
            </div>
            <span className={styles.scrollText}>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className={styles.overlay} aria-hidden="true"></div>
    </section>
  )
}
