import React from 'react';
import { navigation } from '@/data';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-secondary-900 dark:bg-black text-secondary-300">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white">
              Rob Higgins
            </h3>
            <p className="text-secondary-400 leading-relaxed">
              Head of Engineering building AI systems and scalable solutions 
              that have been experienced by millions of users.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-secondary-400 hover:text-primary-400 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Rob Higgins. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => {
                  const element = document.getElementById('home');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
              >
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;