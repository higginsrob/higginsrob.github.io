import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch, trackNavigation, trackSocialClick, trackClick } from '@/utils';
import { toggleMobileMenu, closeMobileMenu, setIsScrolled } from '@/store/slices/uiSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { navigation, socialLinks } from '@/data';

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mobileMenuOpen, isScrolled } = useAppSelector((state) => state.ui);
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setIsScrolled(window.scrollY > 20));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  const handleNavClick = (href: string) => {
    dispatch(closeMobileMenu());
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleThemeToggle = (label: string) => {
    const newTheme = mode === 'light' ? 'dark' : 'light';
    trackClick('theme', `${label}${newTheme}`);
    dispatch(toggleTheme());
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-secondary-900/90 backdrop-blur-md border-b border-secondary-200/60 dark:border-secondary-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            className="text-xl font-display font-bold text-secondary-900 dark:text-white tracking-tight"
            onClick={(e) => {
              e.preventDefault();
              trackNavigation('Logo');
              handleNavClick('#home');
            }}
          >
            Rob Higgins
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-white transition-colors duration-200 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  trackNavigation(item.label);
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-white transition-colors duration-200"
                  aria-label={link.name}
                  onClick={() => trackSocialClick(link.name)}
                >
                  <img
                    src={link.name === 'GitHub' ? '/github.svg' : '/linkedin.svg'}
                    alt={link.name}
                    className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity dark:invert"
                  />
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleThemeToggle('toggle_to_')}
              className="p-2 rounded-md bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleThemeToggle('toggle_to_')}
              className="p-2 rounded-md bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300"
              aria-label="Toggle theme"
            >
              {mode === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>

            <button
              type="button"
              onClick={() => dispatch(toggleMobileMenu())}
              className="p-2 rounded-md bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <div
                  className={`h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <div
                  className={`h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <div
                  className={`h-0.5 bg-current transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-secondary-900 border-b border-secondary-200 dark:border-secondary-800 transition-all duration-300 ${
            mobileMenuOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
          }`}
        >
          <div className="px-4 py-6 space-y-3">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-secondary-700 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-white transition-colors font-medium py-2"
                onClick={(e) => {
                  e.preventDefault();
                  trackNavigation(`${item.label} (Mobile)`);
                  handleNavClick(item.href);
                }}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-600 dark:text-secondary-300"
                  aria-label={link.name}
                  onClick={() => trackSocialClick(`${link.name} (Mobile)`)}
                >
                  <img
                    src={link.name === 'GitHub' ? '/github.svg' : '/linkedin.svg'}
                    alt={link.name}
                    className="w-5 h-5 dark:invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
