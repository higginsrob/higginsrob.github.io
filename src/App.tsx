import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch, applyTheme, getSystemTheme } from '@/utils';
import { setTheme } from '@/store/slices/themeSlice';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import GitHubProjects from './components/GitHubProjects';
import Skills from './components/Skills';
import Footer from './components/Footer';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || getSystemTheme();

    dispatch(setTheme(initialTheme));
    applyTheme(initialTheme);
  }, [dispatch]);

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-200 overflow-x-hidden max-w-full">
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <Experience />
        <GitHubProjects />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default App;
