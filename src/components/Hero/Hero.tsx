import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800">
      <div className="container-custom section-padding text-center">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary-400 to-accent-400 p-1">
              <img 
                src="/profile.jpeg" 
                alt="Rob Higgins Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="block text-secondary-900 dark:text-white">Hi, I'm</span>
            <span className="block text-gradient">Rob Higgins</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 mb-8 animate-slide-up animation-delay-200">
            Head of Engineering & AI Systems Architect
          </p>

          {/* Description */}
          <p className="text-lg text-secondary-500 dark:text-secondary-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up animation-delay-400">
            Currently building scalable AI and LLM systems at Panorama AI. Former Tech Lead at Snap Inc on AR Enterprise Shopping web SDK and services. 
            Passionate about AI, AR/VR, cloud architecture, and solving complex technical challenges.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
          <div className="w-6 h-10 border-2 border-secondary-400 dark:border-secondary-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-secondary-400 dark:bg-secondary-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;