import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white">
              About <span className="text-gradient">Me</span>
            </h2>
            
            <div className="space-y-4 text-lg text-secondary-600 dark:text-secondary-300 leading-relaxed">
              <p>
                I enjoy finding elegant solutions to difficult problems - it's a curiosity that has led me 
                to focus on a wide variety of fullstack skill sets. Currently serving as Head of Engineering 
                at Panorama AI, where we're building systems that aggregate and optimize data to securely 
                power LLM and AI agents.
              </p>
              
              <p>
                In my time building startups, I have developed scalable, secure and reliable solutions that 
                have been experienced by millions of users, mentored teammates, and drove technical 
                decision-making across multiple engineering teams. I have one successful exit under my belt 
                - I helped build Vertebrae into a product that was acquired by Snap.
              </p>
              
              <p>
                My expertise spans AR/VR development, cloud architecture, and full-stack web engineering. 
                At Snap Inc., I led the development of the ARES Web SDK, building AR experiences for 
                enterprise clients. I'm passionate about proving that LLMs can accurately answer business 
                intelligence questions without hallucinations.
              </p>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-secondary-700 dark:text-secondary-300">Head of Engineering</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-secondary-700 dark:text-secondary-300">Successful Startup Exit</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-secondary-700 dark:text-secondary-300">AR/VR Specialist</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-secondary-700 dark:text-secondary-300">AI & LLM Expert</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="relative z-10">
              {/* Profile Image */}
              <div className="w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900 dark:to-accent-900">
                <img 
                  src="/sup.jpg" 
                  alt="Rob Higgins - About Me" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 transform translate-x-8 translate-y-8">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;