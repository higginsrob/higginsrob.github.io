import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch, applyTheme, getSystemTheme } from '@/utils';
import { setTheme } from '@/store/slices/themeSlice';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import PersonalProjects from './components/PersonalProjects';
import Gallery from './components/Gallery';
import Skills from './components/Skills';
import Footer from './components/Footer';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || getSystemTheme();
    
    dispatch(setTheme(initialTheme));
    applyTheme(initialTheme);
  }, [dispatch]);

  // Apply theme changes
  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-200">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Experience />
        <PersonalProjects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default App;