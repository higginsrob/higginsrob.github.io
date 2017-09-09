import { Skill, NavItem } from '@/types';

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'frontend', proficiency: 95 },
  { name: 'React', category: 'frontend', proficiency: 95 },
  { name: 'JavaScript', category: 'frontend', proficiency: 95 },
  { name: 'Three.js', category: 'frontend', proficiency: 88 },
  { name: 'HTML / CSS', category: 'frontend', proficiency: 90 },
  { name: 'Node.js', category: 'backend', proficiency: 95 },
  { name: 'Python', category: 'backend', proficiency: 82 },
  { name: 'Go', category: 'backend', proficiency: 70 },
  { name: 'REST APIs', category: 'backend', proficiency: 92 },
  { name: 'System Design', category: 'backend', proficiency: 90 },
  { name: 'Microservices', category: 'backend', proficiency: 87 },
  { name: 'Event-Driven Architecture', category: 'backend', proficiency: 85 },
  { name: 'PostgreSQL', category: 'data', proficiency: 88 },
  { name: 'BigQuery', category: 'data', proficiency: 80 },
  { name: 'Redshift', category: 'data', proficiency: 78 },
  { name: 'Redis', category: 'data', proficiency: 85 },
  { name: 'SQLite', category: 'data', proficiency: 85 },
  { name: 'MySQL', category: 'data', proficiency: 82 },
  { name: 'MongoDB', category: 'data', proficiency: 78 },
  { name: 'Terraform', category: 'tools', proficiency: 88 },
  { name: 'AWS / GCP', category: 'tools', proficiency: 88 },
  { name: 'Docker / Kubernetes', category: 'tools', proficiency: 85 },
  { name: 'CI/CD', category: 'tools', proficiency: 90 },
  { name: 'Git', category: 'tools', proficiency: 92 },
  { name: 'AI / LLM Systems', category: 'ai', proficiency: 85 },
  { name: 'ML Infrastructure', category: 'ai', proficiency: 82 },
  { name: 'Data Pipelines / ETL', category: 'ai', proficiency: 85 },
  { name: 'Platform Engineering', category: 'other', proficiency: 90 },
  { name: 'SDK & Developer Tools', category: 'other', proficiency: 90 },
  { name: 'Technical Leadership', category: 'other', proficiency: 90 },
];

export const navigation: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/higginsrob',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/higginsrob',
  },
];
