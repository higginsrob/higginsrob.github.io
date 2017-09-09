import React from 'react';
import { navigation, socialLinks } from '@/data';
import { trackNavigation, trackSocialClick } from '@/utils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string, label: string) => {
    trackNavigation(`${label} (Footer)`);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="container-custom">
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3 md:col-span-1">
            <h3 className="text-xl font-display font-bold text-white">Rob Higgins</h3>
            <p className="text-secondary-400 leading-relaxed text-sm">
              Fullstack Software Engineer. TypeScript, Node, React. Open to Staff Product, Platform, and
              AI Platform roles—Denver or remote.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs tracking-widest uppercase text-silver-400">Navigate</h4>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-secondary-400 hover:text-silver-200 transition-colors duration-200 text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.label);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs tracking-widest uppercase text-silver-400">Contact</h4>
            <div className="space-y-2 text-sm">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-secondary-400 hover:text-silver-200 transition-colors"
                  onClick={() => trackSocialClick(`${link.name} (Footer)`)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-500 text-sm">
            © {currentYear} Rob Higgins
          </p>
          <button
            type="button"
            onClick={() => {
              trackNavigation('Back to Top (Footer)');
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-secondary-400 hover:text-silver-200 transition-colors duration-200 text-sm"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
