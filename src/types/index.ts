import { ReactNode } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  updated_at: string;
  default_branch: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
  /** First non-badge image from the repo README, if any */
  screenshotUrl?: string | null;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'ai' | 'data' | 'other';
  proficiency: number;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ThemeState {
  mode: 'light' | 'dark';
}

export interface UIState {
  mobileMenuOpen: boolean;
  activeSection: string;
  isScrolled: boolean;
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
