'use client'

import React, { useRef, useState } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import styles from './ProjectCard.module.css'

interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  category?: string
  complexity?: 'beginner' | 'intermediate' | 'advanced'
}

interface ProjectCardProps {
  project: Project
  delay?: number
}

// Tech stack categorization for dynamic badge colors
const getTechCategory = (tech: string): string => {
  const techLower = tech.toLowerCase()

  // Frontend technologies
  if (
    [
      'react',
      'vue.js',
      'angular',
      'next.js',
      'nuxt.js',
      'svelte',
      'typescript',
      'javascript',
      'html',
      'css',
      'tailwind css',
      'sass',
      'scss',
      'material-ui',
      'chakra ui',
      'styled-components',
    ].includes(techLower)
  ) {
    return 'frontend'
  }

  // Backend technologies
  if (
    [
      'node.js',
      'express.js',
      'fastapi',
      'django',
      'flask',
      'spring boot',
      'laravel',
      'ruby on rails',
      'asp.net',
      'php',
      'python',
      'java',
      'c#',
      'go',
      'rust',
    ].includes(techLower)
  ) {
    return 'backend'
  }

  // Database technologies
  if (
    [
      'postgresql',
      'mysql',
      'mongodb',
      'redis',
      'sqlite',
      'firebase',
      'supabase',
      'prisma',
      'typeorm',
      'sequelize',
    ].includes(techLower)
  ) {
    return 'database'
  }

  // Cloud and DevOps
  if (
    [
      'aws',
      'azure',
      'gcp',
      'vercel',
      'netlify',
      'heroku',
      'docker',
      'kubernetes',
      'terraform',
    ].includes(techLower)
  ) {
    return 'cloud'
  }

  // Tools and others
  if (
    [
      'webpack',
      'vite',
      'rollup',
      'babel',
      'eslint',
      'prettier',
      'jest',
      'cypress',
      'playwright',
      'storybook',
      'figma',
      'adobe xd',
    ].includes(techLower)
  ) {
    return 'tool'
  }

  return 'default'
}

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isIntersecting = useIntersectionObserver(ref, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  })

  React.useEffect(() => {
    if (isIntersecting && !isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isIntersecting, isVisible, delay])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageLoaded(true) // Still show the card even if image fails
  }

  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          <div className={styles.placeholderIcon}>🚀</div>
        </div>
        <img
          src={project.image}
          alt={project.title}
          className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className={styles.overlay}>
          <div className={styles.actions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
                aria-label={`View ${project.title} live demo`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM10 15C7.23858 15 5 12.7614 5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10C15 12.7614 12.7614 15 10 15Z"
                    fill="currentColor"
                  />
                  <path
                    d="M13.5355 6.46447C13.9261 6.85499 13.9261 7.48816 13.5355 7.87868L7.87868 13.5355C7.48816 13.9261 6.85499 13.9261 6.46447 13.5355C6.07394 13.1450 6.07394 12.5118 6.46447 12.1213L12.1213 6.46447C12.5118 6.07394 13.1450 6.07394 13.5355 6.46447Z"
                    fill="currentColor"
                  />
                </svg>
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
                aria-label={`View ${project.title} source code`}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    fill="currentColor"
                  />
                </svg>
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.techStack}>
          {project.techStack.map(tech => (
            <span
              key={tech}
              className={styles.techBadge}
              data-category={getTechCategory(tech)}
              title={`${tech} - ${getTechCategory(tech)} technology`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
