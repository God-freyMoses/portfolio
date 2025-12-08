'use client'

import { useMemo, useState } from 'react'
import styles from './FeaturedProjects.module.css'
import { ProjectCard } from './ProjectCard'
import { ProjectFilter } from './ProjectFilter'
import { featuredProjects } from '@/data/projects'

interface FilterOptions {
  category: string
  techStack: string[]
  sortBy: 'title' | 'date' | 'complexity'
  sortOrder: 'asc' | 'desc'
}

interface FeaturedProjectsProps {
  className?: string
}

// Mock project data - in a real app, this would come from a CMS or API

export function FeaturedProjects({ className = '' }: FeaturedProjectsProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    techStack: [],
    sortBy: 'date',
    sortOrder: 'desc',
  })

  // Extract unique categories and tech stack items
  const availableCategories = useMemo(() => {
    const categories = featuredProjects
      .map(project => project.category)
      .filter((category): category is string => Boolean(category))
    return Array.from(new Set(categories))
  }, [])

  const availableTechStack = useMemo(() => {
    const allTech = featuredProjects.flatMap(project => project.techStack)
    return Array.from(new Set(allTech)).sort()
  }, [])

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = featuredProjects.filter(project => {
      // Category filter
      if (filters.category !== 'all' && project.category !== filters.category) {
        return false
      }

      // Tech stack filter
      if (filters.techStack.length > 0) {
        const hasMatchingTech = filters.techStack.some(tech =>
          project.techStack.includes(tech)
        )
        if (!hasMatchingTech) return false
      }

      return true
    })

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'date':
          const dateA = new Date(a.date || '2023-01-01').getTime()
          const dateB = new Date(b.date || '2023-01-01').getTime()
          comparison = dateA - dateB
          break
        case 'complexity':
          const complexityOrder = { beginner: 1, intermediate: 2, advanced: 3 }
          const complexityA = complexityOrder[a.complexity || 'intermediate']
          const complexityB = complexityOrder[b.complexity || 'intermediate']
          comparison = complexityA - complexityB
          break
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [filters])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
  }

  return (
    <div className={`${styles.featuredProjects} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <p className={styles.description}>
          A showcase of my recent work, demonstrating expertise in full-stack
          development, modern web technologies, and user-centered design
          principles.
        </p>
      </div>

      <ProjectFilter
        onFilterChange={handleFilterChange}
        availableCategories={availableCategories}
        availableTechStack={availableTechStack}
      />

      <div className={styles.projectsGrid}>
        {filteredAndSortedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} delay={index * 100} />
        ))}
      </div>

      {filteredAndSortedProjects.length === 0 && (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>🔍</div>
          <h3 className={styles.noResultsTitle}>No projects found</h3>
          <p className={styles.noResultsText}>
            Try adjusting your filters to see more projects.
          </p>
        </div>
      )}

      <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton}>
          <span>View All Projects ({featuredProjects.length})</span>
          <svg
            className={styles.arrow}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16667 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
