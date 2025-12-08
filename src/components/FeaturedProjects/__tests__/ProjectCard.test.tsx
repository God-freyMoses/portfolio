import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ProjectCard } from '../ProjectCard'

// Mock the intersection observer hook
jest.mock('../../../hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => true,
}))

const mockProject = {
  id: '1',
  title: 'Test Project',
  description: 'A test project for unit testing',
  image: 'https://example.com/test-image.jpg',
  techStack: ['React', 'TypeScript', 'Jest'],
  liveUrl: 'https://example.com/live',
  githubUrl: 'https://github.com/test/project',
  featured: true,
  category: 'Frontend',
  complexity: 'intermediate' as const,
}

describe('ProjectCard', () => {
  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(
      screen.getByText('A test project for unit testing')
    ).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Jest')).toBeInTheDocument()
  })

  it('renders action buttons with correct links', () => {
    render(<ProjectCard project={mockProject} />)

    const liveButton = screen.getByLabelText('View Test Project live demo')
    const sourceButton = screen.getByLabelText('View Test Project source code')

    expect(liveButton).toHaveAttribute('href', 'https://example.com/live')
    expect(sourceButton).toHaveAttribute(
      'href',
      'https://github.com/test/project'
    )
    expect(liveButton).toHaveAttribute('target', '_blank')
    expect(sourceButton).toHaveAttribute('target', '_blank')
    expect(liveButton).toHaveAttribute('rel', 'noopener noreferrer')
    expect(sourceButton).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies correct tech stack categories', () => {
    render(<ProjectCard project={mockProject} />)

    const reactBadge = screen.getByText('React')
    const typescriptBadge = screen.getByText('TypeScript')
    const jestBadge = screen.getByText('Jest')

    expect(reactBadge).toHaveAttribute('data-category', 'frontend')
    expect(typescriptBadge).toHaveAttribute('data-category', 'frontend')
    expect(jestBadge).toHaveAttribute('data-category', 'tool')
  })

  it('handles image loading states', async () => {
    render(<ProjectCard project={mockProject} />)

    const image = screen.getByAltText('Test Project')
    expect(image).toBeInTheDocument()

    // Simulate image load
    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toHaveClass('loaded')
    })
  })

  it('renders without optional props', () => {
    const minimalProject = {
      id: '2',
      title: 'Minimal Project',
      description: 'A minimal project',
      image: 'https://example.com/minimal.jpg',
      techStack: ['HTML'],
      featured: false,
    }

    render(<ProjectCard project={minimalProject} />)

    expect(screen.getByText('Minimal Project')).toBeInTheDocument()
    expect(screen.queryByLabelText(/live demo/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/source code/)).not.toBeInTheDocument()
  })

  it('applies visibility animation with delay', async () => {
    const { container } = render(
      <ProjectCard project={mockProject} delay={0} />
    )

    const card = container.firstChild as HTMLElement
    expect(card).toHaveClass('projectCard')

    // The card should become visible after intersection observer triggers
    await waitFor(() => {
      expect(card).toHaveClass('visible')
    })
  })

  it('has proper accessibility attributes', () => {
    render(<ProjectCard project={mockProject} />)

    const liveButton = screen.getByLabelText('View Test Project live demo')
    const sourceButton = screen.getByLabelText('View Test Project source code')

    expect(liveButton).toHaveAttribute('aria-label')
    expect(sourceButton).toHaveAttribute('aria-label')

    const techBadges = screen.getAllByTitle(/technology/)
    expect(techBadges.length).toBeGreaterThan(0)
  })
})
