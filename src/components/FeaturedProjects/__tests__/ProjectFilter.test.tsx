import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { ProjectFilter } from '../ProjectFilter'

const mockCategories = ['Frontend', 'Backend', 'Full-Stack']
const mockTechStack = ['React', 'Node.js', 'TypeScript', 'PostgreSQL']
const mockOnFilterChange = jest.fn()

describe('ProjectFilter', () => {
  beforeEach(() => {
    mockOnFilterChange.mockClear()
  })

  it('renders filter toggle button', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    expect(screen.getByText('Filter & Sort')).toBeInTheDocument()
  })

  it('expands and collapses filter content', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    const toggleButton = screen.getByText('Filter & Sort')
    const filterContent = screen.getByRole('generic', { hidden: true })

    // Initially collapsed
    expect(filterContent).not.toHaveClass('expanded')

    // Click to expand
    fireEvent.click(toggleButton)
    expect(filterContent).toHaveClass('expanded')

    // Click to collapse
    fireEvent.click(toggleButton)
    expect(filterContent).not.toHaveClass('expanded')
  })

  it('renders category filter buttons', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    // Expand filters first
    fireEvent.click(screen.getByText('Filter & Sort'))

    expect(screen.getByText('All Projects')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack')).toBeInTheDocument()
  })

  it('handles category selection', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    // Expand filters
    fireEvent.click(screen.getByText('Filter & Sort'))

    // Click Frontend category
    fireEvent.click(screen.getByText('Frontend'))

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'Frontend',
      })
    )
  })

  it('handles tech stack selection', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    // Expand filters
    fireEvent.click(screen.getByText('Filter & Sort'))

    // Click React tech
    fireEvent.click(screen.getByText('React'))

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        techStack: ['React'],
      })
    )
  })

  it('handles sort options', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    // Expand filters
    fireEvent.click(screen.getByText('Filter & Sort'))

    // Change sort option
    const sortSelect = screen.getByDisplayValue('Title')
    fireEvent.change(sortSelect, { target: { value: 'date' } })

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        sortBy: 'date',
      })
    )
  })

  it('shows active filter count', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    // Expand filters
    fireEvent.click(screen.getByText('Filter & Sort'))

    // Select a category
    fireEvent.click(screen.getByText('Frontend'))

    // Should show filter count
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('clears all filters', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    // Expand filters and select something
    fireEvent.click(screen.getByText('Filter & Sort'))
    fireEvent.click(screen.getByText('Frontend'))

    // Clear all filters
    const clearButton = screen.getByText('Clear All')
    fireEvent.click(clearButton)

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: 'all',
      techStack: [],
      sortBy: 'title',
      sortOrder: 'asc',
    })
  })

  it('has proper accessibility attributes', () => {
    render(
      <ProjectFilter
        onFilterChange={mockOnFilterChange}
        availableCategories={mockCategories}
        availableTechStack={mockTechStack}
      />
    )

    const toggleButton = screen.getByRole('button', { name: /filter & sort/i })
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveAttribute('aria-controls', 'filter-content')

    // Expand and check again
    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
  })
})
