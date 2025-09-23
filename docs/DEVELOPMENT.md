# Development Environment Setup

This document outlines the development environment configuration for the portfolio website.

## Prerequisites

- Node.js 18+
- npm or yarn
- VS Code (recommended)

## Quick Setup

Run the setup script to configure your development environment:

```bash
./scripts/setup-dev.sh
```

## Manual Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy the environment template and configure your local values:

```bash
cp .env.example .env.local
```

Update `.env.local` with your actual values for development.

### 3. VS Code Configuration

The project includes VS Code settings and recommended extensions:

- **Settings**: `.vscode/settings.json` - Configured for optimal development experience
- **Extensions**: `.vscode/extensions.json` - Recommended extensions for the project

Install recommended extensions when prompted by VS Code.

## TypeScript Configuration

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of relative imports
import { Project } from '../../../types/project'

// Use absolute imports
import { Project } from '@/types'
```

Available aliases:

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/styles/*` → `./src/styles/*`
- `@/lib/*` → `./src/lib/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/utils/*` → `./src/utils/*`
- `@/app/*` → `./src/app/*`
- `@/content/*` → `./content/*`
- `@/public/*` → `./public/*`

### Strict Mode

TypeScript is configured with strict mode and additional strict checks:

- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `exactOptionalPropertyTypes: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`
- `noUncheckedIndexedAccess: true`

## Environment Variables

### Client-side Variables (NEXT*PUBLIC*\*)

These variables are available in the browser:

- `NEXT_PUBLIC_SITE_URL` - Site URL
- `NEXT_PUBLIC_SITE_NAME` - Site name
- `NEXT_PUBLIC_SITE_DESCRIPTION` - Site description
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_DEV_MODE` - Development mode flag
- `NEXT_PUBLIC_DEBUG_MODE` - Debug mode flag

### Server-side Variables

These variables are only available on the server:

- `DATABASE_URL` - Database connection string
- `SMTP_*` - Email configuration
- `NEXTAUTH_*` - Authentication configuration
- `RATE_LIMIT_*` - Rate limiting configuration

### Environment Validation

The project includes environment validation:

```typescript
import { validateEnv } from '@/lib/env'

// Validates required environment variables
validateEnv()
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run format:check

# Environment utilities
npm run env:validate
npm run env:example

# Clean build artifacts
npm run clean
```

## VS Code Extensions

### Essential Extensions

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Enhanced TypeScript support
- **Tailwind CSS IntelliSense** - Tailwind CSS support

### Recommended Extensions

- **Auto Rename Tag** - Automatically rename paired HTML/JSX tags
- **Path Intellisense** - Autocomplete filenames
- **CSS Modules** - CSS Modules support
- **GitLens** - Enhanced Git capabilities
- **Error Lens** - Inline error display

## Code Quality

### ESLint Configuration

- Next.js recommended rules
- TypeScript strict rules
- Prettier integration
- Custom rules for the project

### Prettier Configuration

- 2-space indentation
- Single quotes
- Trailing commas
- Semicolons
- Line width: 80 characters

### Husky Git Hooks

- **pre-commit**: Runs lint-staged
- **lint-staged**: Formats and lints staged files

## Troubleshooting

### Path Aliases Not Working

1. Restart TypeScript server in VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Check `tsconfig.json` paths configuration
3. Ensure VS Code is using the workspace TypeScript version

### Environment Variables Not Loading

1. Check `.env.local` exists and has correct values
2. Restart development server
3. Ensure client-side variables have `NEXT_PUBLIC_` prefix

### TypeScript Errors

1. Run `npm run type-check` to see all errors
2. Check for missing type definitions
3. Ensure all imports use correct path aliases

## Next Steps

After setting up the development environment:

1. Review the project structure in `src/`
2. Check the design system in `src/styles/`
3. Start implementing components following the task list
4. Use the configured tools for optimal development experience
