import React, { useEffect, useState } from 'react';
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
import AIChat from './components/AIChat';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
    <div className="min-h-screen bg-white dark:bg-secondary-900 transition-colors duration-200 overflow-x-hidden max-w-full">
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <PersonalProjects />
        <Experience />
        <Skills />
        <Gallery />
      </main>
      <Footer />
      
      {/* AI Chat Component */}
      <AIChat 
        isOpen={isChatOpen} 
        onToggle={() => setIsChatOpen(!isChatOpen)} 
      />
    </div>
  );
};

export default App;