import React from 'react';
import { trackSocialClick } from '@/utils';

const STACK = ['TypeScript', 'Platform', 'Agents', 'Workflows', 'Apps', 'Cloud Services'];

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-metallic animate-gradient-shift overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,212,212,0.35),_transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(163,163,163,0.12),_transparent_55%)] pointer-events-none" />

      <div className="container-custom section-padding text-center relative z-10 pt-28">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 animate-fade-in">
            <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-br from-silver-300 via-silver-100 to-secondary-600 dark:from-silver-500 dark:via-silver-300 dark:to-secondary-900 p-[2px]">
              <img
                src="/profile.jpeg"
                alt="Rob Higgins"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <p className="font-mono text-sm tracking-widest uppercase text-secondary-500 dark:text-silver-400 mb-4 animate-slide-up">
            Denver, CO
          </p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-slide-up text-secondary-900 dark:text-white">
            Rob Higgins
          </h1>

          <p className="text-xl md:text-2xl text-secondary-600 dark:text-silver-300 mb-6 animate-slide-up animation-delay-200 font-display font-semibold">
            Fullstack Software Engineer
          </p>

          <p className="text-base md:text-lg text-secondary-500 dark:text-secondary-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up animation-delay-400">
            Early engineer at Vertebrae through Snap&apos;s acquisition, tech lead for Snap&apos;s AR
            Enterprise Web SDK, then Head of Engineering at Panorama AI owning production LLM and ML
            platforms.
          </p>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 mb-10 animate-slide-up animation-delay-400">
            {STACK.map((item) => (
              <span
                key={item}
                className="font-mono text-xs md:text-sm text-secondary-600 dark:text-silver-400 border-b border-secondary-300/60 dark:border-secondary-600 pb-0.5"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 animate-slide-up animation-delay-600">
            <a
              href="https://github.com/higginsrob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              onClick={() => trackSocialClick('GitHub')}
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/higginsrob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              onClick={() => trackSocialClick('LinkedIn')}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle hidden md:block">
        <div className="w-5 h-8 border border-secondary-400 dark:border-secondary-500 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-secondary-400 dark:bg-secondary-500 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
