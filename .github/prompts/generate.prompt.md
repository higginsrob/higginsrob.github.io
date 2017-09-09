# Generate Rob Higgins Portfolio Website

Create a complete portfolio website for Rob Higgins that showcases his work and skills as a developer. This should be a modern, professional, and responsive website built with the specified tech stack.

## Project Requirements

### Tech Stack
- **React** - Frontend library for building the user interface
- **Vite** - Modern build tool for fast development and optimized production builds
- **TypeScript** - For type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Redux Toolkit** - State management for application state

### Project Structure
Create a well-organized project structure with the following:

```
higginsrob.github.io/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Projects/
│   │   ├── Skills/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── pages/
│   ├── store/
│   │   ├── slices/
│   │   └── index.ts
│   ├── types/
│   ├── utils/
│   ├── assets/
│   ├── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── index.html
└── README.md
```

### Core Features

#### 1. Header/Navigation
- Clean, modern navigation bar
- Responsive mobile menu
- Smooth scrolling to sections
- Logo or name branding

#### 2. Hero Section
- Professional introduction
- Eye-catching design
- Call-to-action buttons
- Professional photo placeholder

#### 3. About Section
- Personal background and story
- Professional experience highlights
- Downloadable resume/CV link
- Personal interests or hobbies

#### 4. Projects Section
- Showcase of development projects
- Project cards with:
  - Project title and description
  - Technologies used
  - Live demo links
  - GitHub repository links
  - Screenshots or placeholder images
- Filter by technology or project type
- Responsive grid layout

#### 5. Skills Section
- Technical skills with proficiency indicators
- Categorized by frontend, backend, tools, etc.
- Visual representation (progress bars, icons, or badges)

#### 6. Contact Section
- Contact form with validation
- Social media links
- Professional email
- Location information
- Links to LinkedIn, GitHub, etc.

#### 7. Footer
- Copyright information
- Additional navigation links
- Social media icons

### Technical Requirements

#### Vite Configuration
- Set up Vite with React and TypeScript
- Configure path aliases for cleaner imports
- Set up development and production builds
- Configure for GitHub Pages deployment

#### TypeScript Setup
- Strict TypeScript configuration
- Type definitions for all components and data
- Interface definitions for project data, skills, etc.
- Proper typing for Redux store and actions

#### Tailwind CSS
- Custom color palette that reflects professional branding
- Responsive design breakpoints
- Dark/light theme support (optional but recommended)
- Custom utility classes for consistent spacing and typography

#### Redux Toolkit Store
- Theme slice (for dark/light mode)
- UI slice (for mobile menu state, modals, etc.)
- Projects slice (if projects data is fetched dynamically)
- Proper TypeScript integration with Redux

#### Performance Optimizations
- Lazy loading for components
- Image optimization
- Code splitting
- SEO meta tags

### Content Guidelines
- Use placeholder content that is professional and appropriate
- Include sample projects that demonstrate full-stack capabilities
- Skills should reflect modern web development technologies
- Contact information should be placeholder/example data

### Deployment Setup
- Configure for GitHub Pages deployment
- Set up GitHub Actions workflow for automatic deployment
- Proper base URL configuration for GitHub Pages

### Code Quality
- Consistent code formatting (Prettier configuration)
- ESLint rules for TypeScript and React
- Component-based architecture
- Reusable utility functions
- Clean, readable code with proper commenting

### Accessibility
- Semantic HTML structure
- Proper ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Alt text for images

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible layouts that work across all screen sizes
- Touch-friendly interactive elements

## Implementation Notes

1. **Start with project setup**: Initialize Vite + React + TypeScript project
2. **Configure build tools**: Set up Tailwind CSS, ESLint, Prettier
3. **Create base structure**: Set up routing, store, and basic layout
4. **Implement components**: Build each section incrementally
5. **Add interactivity**: Forms, animations, state management
6. **Optimize and deploy**: Performance optimization and GitHub Pages setup

## Expected Deliverables

- Complete, functional portfolio website
- Professional design and user experience
- Responsive across all devices
- Clean, maintainable codebase
- Proper documentation in README
- Deployment configuration for GitHub Pages
- All specified technologies properly integrated

The final result should be a portfolio website that effectively showcases Rob Higgins as a professional developer and serves as a strong representation of his technical skills and attention to detail.