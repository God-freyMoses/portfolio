'use client'

import { useState } from 'react'
import styles from './ProjectFilter.module.css'

interface FilterOptions {
  category: string
  techStack: string[]
  sortBy: 'title' | 'date' | 'complexity'
  sortOrder: 'asc' | 'desc'
}

interface ProjectFilterProps {
  onFilterChange: (filters: FilterOptions) => void
  availableCategories: string[]
  availableTechStack: string[]
  className?: string
}

export function ProjectFilter({
  onFilterChange,
  availableCategories,
  availableTechStack,
  className = '',
}: ProjectFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    techStack: [],
    sortBy: 'title',
    sortOrder: 'asc',
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleTechStackToggle = (tech: string) => {
    const newTechStack = filters.techStack.includes(tech)
      ? filters.techStack.filter(t => t !== tech)
      : [...filters.techStack, tech]

    updateFilters({ techStack: newTechStack })
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      category: 'all',
      techStack: [],
      sortBy: 'title',
      sortOrder: 'asc',
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const activeFiltersCount =
    (filters.category !== 'all' ? 1 : 0) + filters.techStack.length

  return (
    <div className={`${styles.projectFilter} ${className}`}>
      <div className={styles.filterHeader}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="filter-content"
        >
          <svg
            className={`${styles.filterIcon} ${isExpanded ? styles.expanded : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.5 5.83333H17.5M5.83333 10H14.1667M8.33333 14.1667H11.6667"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Filter & Sort</span>
          {activeFiltersCount > 0 && (
            <span className={styles.filterCount}>{activeFiltersCount}</span>
          )}
          <svg
            className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {activeFiltersCount > 0 && (
          <button
            className={styles.clearButton}
            onClick={clearAllFilters}
            title="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>

      <div
        id="filter-content"
        className={`${styles.filterContent} ${isExpanded ? styles.expanded : ''}`}
      >
        {/* Category Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Category</label>
          <div className={styles.categoryButtons}>
            <button
              className={`${styles.categoryButton} ${filters.category === 'all' ? styles.active : ''}`}
              onClick={() => updateFilters({ category: 'all' })}
            >
              All Projects
            </button>
            {availableCategories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${filters.category === category ? styles.active : ''}`}
                onClick={() => updateFilters({ category })}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Filter */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Technology</label>
          <div className={styles.techStackGrid}>
            {availableTechStack.map(tech => (
              <button
                key={tech}
                className={`${styles.techButton} ${filters.techStack.includes(tech) ? styles.active : ''}`}
                onClick={() => handleTechStackToggle(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sort By</label>
          <div className={styles.sortControls}>
            <select
              value={filters.sortBy}
              onChange={e =>
                updateFilters({
                  sortBy: e.target.value as FilterOptions['sortBy'],
                })
              }
              className={styles.sortSelect}
            >
              <option value="title">Title</option>
              <option value="date">Date</option>
              <option value="complexity">Complexity</option>
            </select>

            <button
              className={`${styles.sortOrderButton} ${filters.sortOrder === 'desc' ? styles.desc : ''}`}
              onClick={() =>
                updateFilters({
                  sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
                })
              }
              title={`Sort ${filters.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2L8 14M8 2L4 6M8 2L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
