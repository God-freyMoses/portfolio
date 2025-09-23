# Design System & CSS Architecture

This directory contains the foundational CSS architecture and design system for the portfolio website.

## File Structure

```
src/styles/
├── design-tokens.css    # Core design tokens (colors, typography, spacing)
├── base.css            # CSS reset and base styles
├── utilities.css       # Utility classes and common patterns
├── css-modules.d.ts    # TypeScript definitions for CSS Modules
└── README.md          # This file
```

## Design Tokens

The design system is built around CSS custom properties (CSS variables) defined in `design-tokens.css`:

- **Colors**: Primary, secondary, neutral, and semantic color scales
- **Typography**: Font families, sizes, weights, and spacing
- **Spacing**: Consistent spacing scale from 1px to 24rem
- **Shadows**: Layered shadow system for depth
- **Border Radius**: Consistent border radius scale
- **Transitions**: Standardized animation timing and easing

## CSS Architecture

### 1. Design Tokens (`design-tokens.css`)

Core variables that define the visual language of the site. All other styles reference these tokens.

### 2. Base Styles (`base.css`)

- Modern CSS reset
- Typography defaults
- Form element styling
- Accessibility features (focus styles, skip links)
- Dark mode support

### 3. Utility Classes (`utilities.css`)

Ready-to-use classes for common patterns:

- Gradients and glassmorphism effects
- Shadow variations
- Animation utilities
- Hover effects
- 3D transforms
- Layout helpers
- Button styles
- Loading states

## CSS Modules Naming Convention

When creating CSS Modules, follow these naming conventions:

```css
/* Component styles */
.componentName {
}
.componentName__element {
}
.componentName--modifier {
}

/* State classes */
.isActive {
}
.isDisabled {
}
.isLoading {
}

/* Utility modifiers */
.small {
}
.large {
}
.primary {
}
.secondary {
}
```

## Usage Examples

### Using Design Tokens

```css
.myComponent {
  color: var(--color-primary-600);
  font-size: var(--text-lg);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-medium);
}
```

### Using Utility Classes

```jsx
<div className="glass-card shadow-dramatic hover-lift">
  <h2 className="gradient-text">Beautiful Card</h2>
  <p className="animate-fade-in-up">With smooth animations</p>
</div>
```

### CSS Modules Example

```css
/* components/Card.module.css */
.card {
  background: var(--color-gray-50);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-soft);
  transition: var(--transition-all);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-dramatic);
}

.card__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-4);
}

.card--featured {
  background: var(--gradient-primary);
  color: white;
}
```

## Responsive Design

The design system includes:

- Fluid typography using `clamp()`
- Responsive container classes
- Mobile-first breakpoint system
- Show/hide utilities for different screen sizes

## Accessibility

Built-in accessibility features:

- High contrast focus indicators
- Reduced motion support
- Screen reader utilities
- Semantic color usage
- WCAG AA compliant contrast ratios

## Dark Mode

Automatic dark mode support using `prefers-color-scheme` media query. Color tokens automatically adjust for dark themes.

## Performance

- CSS custom properties for efficient theming
- Minimal utility classes to reduce bundle size
- Optimized animations with `will-change` where needed
- Efficient selector specificity
