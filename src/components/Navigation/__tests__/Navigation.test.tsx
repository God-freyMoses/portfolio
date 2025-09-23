import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import Navigation from '../Navigation'
import type { NavItem } from '../Navigation.types'

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>

// Mock custom nav items
const customNavItems: NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
]

describe('Navigation Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/')
    // Clear localStorage mock
    ;(window.localStorage.getItem as jest.Mock).mockClear()
    ;(window.localStorage.setItem as jest.Mock).mockClear()
    ;(window.localStorage.clear as jest.Mock)()
    // Reset document class
    document.documentElement.className = ''
  })

  afterEach(() => {
    // Reset body overflow
    document.body.style.overflow = 'unset'
  })

  describe('Rendering', () => {
    it('renders navigation with default items', () => {
      render(<Navigation />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
      expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop and mobile
      expect(screen.getAllByText('About')).toHaveLength(2)
      expect(screen.getAllByText('Projects')).toHaveLength(2)
    })

    it('renders navigation with custom items', () => {
      render(<Navigation items={customNavItems} />)

      expect(screen.getAllByText('Home')).toHaveLength(2) // Desktop and mobile
      expect(screen.getAllByText('About')).toHaveLength(2)
      expect(screen.getAllByText('Projects')).toHaveLength(2)
      expect(screen.queryByText('Experience')).not.toBeInTheDocument()
    })

    it('renders logo with correct link', () => {
      render(<Navigation />)

      const logoLink = screen.getByRole('link', { name: /TM/i })
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('applies custom className', () => {
      render(<Navigation className="custom-class" />)

      const nav = screen.getByTestId('navigation')
      expect(nav).toHaveClass('custom-class')
    })
  })

  describe('Desktop Navigation', () => {
    it('renders desktop navigation menu', () => {
      render(<Navigation />)

      const desktopNav = screen.getByTestId('desktop-nav')
      expect(desktopNav).toBeInTheDocument()

      const menubar = screen.getByRole('menubar')
      expect(menubar).toBeInTheDocument()
    })

    it('renders navigation links with correct attributes', () => {
      render(<Navigation items={customNavItems} />)

      const desktopNav = screen.getByTestId('desktop-nav')
      const homeLink = within(desktopNav).getByRole('menuitem', {
        name: 'Home',
      })
      expect(homeLink).toHaveAttribute('href', '#home')
      expect(homeLink).toHaveAttribute('role', 'menuitem')
    })
  })

  describe('Mobile Navigation', () => {
    it('renders mobile menu button', () => {
      render(<Navigation />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      expect(mobileButton).toBeInTheDocument()
      expect(mobileButton).toHaveAttribute('aria-label', 'Open menu')
      expect(mobileButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('opens mobile menu when button is clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      const overlay = screen.getByTestId('mobile-overlay')

      expect(overlay).not.toHaveClass('open')

      await user.click(mobileButton)

      expect(overlay).toHaveClass('open')
      expect(mobileButton).toHaveAttribute('aria-expanded', 'true')
      expect(mobileButton).toHaveAttribute('aria-label', 'Close menu')
    })

    it('closes mobile menu when clicking outside', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      const overlay = screen.getByTestId('mobile-overlay')

      // Open menu
      await user.click(mobileButton)
      expect(overlay).toHaveClass('open')

      // Click outside (on overlay) - simulate mousedown event
      fireEvent.mouseDown(document.body)

      await waitFor(() => {
        expect(overlay).not.toHaveClass('open')
      })
    })

    it('closes mobile menu when pressing Escape', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      const overlay = screen.getByTestId('mobile-overlay')

      // Open menu
      await user.click(mobileButton)
      expect(overlay).toHaveClass('open')

      // Press Escape
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(overlay).not.toHaveClass('open')
      })
    })

    it('prevents body scroll when mobile menu is open', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const mobileButton = screen.getByTestId('mobile-menu-button')

      await user.click(mobileButton)

      expect(document.body.style.overflow).toBe('hidden')
    })
  })

  describe('Theme Toggle', () => {
    it('renders theme toggle button', () => {
      render(<Navigation />)

      const themeToggle = screen.getByTestId('theme-toggle')
      expect(themeToggle).toBeInTheDocument()
      expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark mode')
    })

    it('toggles theme when clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      const themeToggle = screen.getByTestId('theme-toggle')

      await user.click(themeToggle)

      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
      expect(document.documentElement).toHaveClass('dark')
    })

    it('loads saved theme from localStorage', () => {
      ;(window.localStorage.getItem as jest.Mock).mockReturnValue('dark')

      render(<Navigation />)

      expect(document.documentElement).toHaveClass('dark')
    })

    it('respects system preference when no saved theme', () => {
      // Mock prefers-color-scheme: dark
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })

      render(<Navigation />)

      expect(document.documentElement).toHaveClass('dark')
    })
  })

  describe('Smooth Scroll Navigation', () => {
    beforeEach(() => {
      // Mock getElementById
      const mockElement = {
        offsetTop: 100,
      }
      jest
        .spyOn(document, 'getElementById')
        .mockReturnValue(mockElement as HTMLElement)
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('scrolls to section when navigation link is clicked', async () => {
      const user = userEvent.setup()
      render(<Navigation items={customNavItems} />)

      const desktopNav = screen.getByTestId('desktop-nav')
      const homeLink = within(desktopNav).getByRole('menuitem', {
        name: 'Home',
      })

      await user.click(homeLink)

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 20, // 100 - 80 (navbar offset)
        behavior: 'smooth',
      })
    })

    it('closes mobile menu after navigation', async () => {
      const user = userEvent.setup()
      render(<Navigation items={customNavItems} />)

      const mobileButton = screen.getByTestId('mobile-menu-button')
      const overlay = screen.getByTestId('mobile-overlay')

      // Open mobile menu
      await user.click(mobileButton)
      expect(overlay).toHaveClass('open')

      // Click on a navigation link in mobile menu
      const mobileMenu = screen.getByRole('menu')
      const mobileHomeLink = within(mobileMenu).getByRole('menuitem', {
        name: 'Home',
      })
      await user.click(mobileHomeLink)

      await waitFor(() => {
        expect(overlay).not.toHaveClass('open')
      })
    })
  })

  describe('Active Section Highlighting', () => {
    beforeEach(() => {
      // Mock scroll position and element positions
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 150,
      })

      const mockElements = {
        home: { offsetTop: 0 },
        about: { offsetTop: 200 },
        projects: { offsetTop: 400 },
      }

      jest.spyOn(document, 'getElementById').mockImplementation(id => {
        return mockElements[id as keyof typeof mockElements] as HTMLElement
      })
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('highlights active section based on scroll position', () => {
      render(<Navigation items={customNavItems} />)

      // Trigger scroll event
      fireEvent.scroll(window)

      const desktopNav = screen.getByTestId('desktop-nav')
      const aboutLink = within(desktopNav).getByRole('menuitem', {
        name: 'About',
      })
      expect(aboutLink).toHaveClass('active')
      expect(aboutLink).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      render(<Navigation />)

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Main navigation')

      const menubar = screen.getByRole('menubar')
      expect(menubar).toBeInTheDocument()

      const menuItems = screen.getAllByRole('menuitem')
      expect(menuItems.length).toBeGreaterThan(0)
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Navigation />)

      // Tab through elements - logo first, then first nav link
      await user.tab() // Logo
      await user.tab() // First nav link

      const desktopNav = screen.getByTestId('desktop-nav')
      const firstLink = within(desktopNav).getByRole('menuitem', {
        name: 'Home',
      })
      expect(firstLink).toHaveFocus()
    })

    it('has proper focus indicators', () => {
      render(<Navigation />)

      const themeToggle = screen.getByTestId('theme-toggle')
      themeToggle.focus()

      expect(themeToggle).toHaveFocus()
    })
  })

  describe('Scroll Detection', () => {
    it('adds scrolled class when scrolled', () => {
      render(<Navigation />)

      const nav = screen.getByTestId('navigation')
      expect(nav).not.toHaveClass('scrolled')

      // Mock scroll position
      Object.defineProperty(window, 'scrollY', {
        writable: true,
        value: 50,
      })

      fireEvent.scroll(window)

      expect(nav).toHaveClass('scrolled')
    })
  })
})
