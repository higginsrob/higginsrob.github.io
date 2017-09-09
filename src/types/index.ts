import { ReactNode } from 'react';

// Types for project data
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'frontend' | 'fullstack' | 'backend' | 'mobile';
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

// Types for skills
export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai' | 'other';
  proficiency: number; // 1-100
  icon?: string;
}

// Types for contact form
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Types for navigation
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Redux store types
export interface RootState {
  theme: ThemeState;
  ui: UIState;
  projects: ProjectsState;
}

export interface ThemeState {
  mode: 'light' | 'dark';
}

export interface UIState {
  mobileMenuOpen: boolean;
  activeSection: string;
  isScrolled: boolean;
}

export interface ProjectsState {
  projects: Project[];
  filteredProjects: Project[];
  selectedCategory: string | null;
  isLoading: boolean;
}

// Component prop types
export interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  className?: string;
}