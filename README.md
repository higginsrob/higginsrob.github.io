# Rob Higgins - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This website showcases my work as a full-stack developer and serves as a central hub for my projects and professional information.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with perfect rendering on all devices
- **Dark/Light Theme**: Toggle between dark and light modes with system preference detection
- **Interactive Components**: Smooth animations and transitions throughout
- **Project Showcase**: Filterable project gallery with detailed information
- **Skills Visualization**: Interactive skill cards with proficiency indicators
- **Contact Form**: Functional contact form with validation
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility
- **Performance Optimized**: Fast loading times with code splitting and image optimization

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Redux Toolkit** - State management for theme and UI state
- **Vite** - Fast build tool and development server

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **PostCSS** - CSS processing with autoprefixer

### Deployment
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD pipeline for automated deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/higginsrob/higginsrob.github.io.git
   cd higginsrob.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the website in development mode.

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run deploy` - Deploy to GitHub Pages (requires setup)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header/         # Navigation header with theme toggle
│   ├── Hero/           # Hero section with introduction
│   ├── About/          # About me section
│   ├── Projects/       # Projects showcase with filtering
│   ├── Skills/         # Skills visualization
│   ├── Contact/        # Contact form and information
│   ├── Footer/         # Footer with links and info
│   └── Button.tsx      # Reusable button component
├── store/              # Redux store and slices
│   ├── slices/        # Redux Toolkit slices
│   └── index.ts       # Store configuration
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and hooks
├── data/              # Static data and content
├── styles/            # Global CSS and Tailwind imports
├── App.tsx            # Main app component
└── main.tsx          # Application entry point
```

## 🎨 Customization

### Theme Colors
The color scheme can be customized in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* Primary color palette */ },
      secondary: { /* Secondary color palette */ },
      accent: { /* Accent color palette */ },
    }
  }
}
```

### Content Updates
- **Personal Information**: Update content in `src/data/index.ts`
- **Projects**: Add/modify projects in the `projects` array
- **Skills**: Update the `skills` array with your technologies
- **Contact Info**: Modify social links and contact information

## 🚀 Deployment

### Automatic Deployment
The project is set up with GitHub Actions for automatic deployment to GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Actions automatically builds and deploys the site
3. Site is available at `https://higginsrob.github.io`

### Manual Deployment
```bash
npm run build
npm run deploy
```

## 📱 Performance

The website is optimized for performance with:
- Code splitting and lazy loading
- Optimized bundle size with tree shaking
- Responsive images and asset optimization
- Minimal JavaScript runtime
- Fast CSS with Tailwind's purged output

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Rob Higgins - [rob@example.com](mailto:rob@example.com)

Project Link: [https://github.com/higginsrob/higginsrob.github.io](https://github.com/higginsrob/higginsrob.github.io)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS