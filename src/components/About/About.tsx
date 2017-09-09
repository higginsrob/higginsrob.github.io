import React, { useState } from 'react';
import Lightbox from '../Lightbox';
import { trackVideoClick } from '@/utils';

interface VideoCard {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
}

const About: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');

  const handleVideoClick = (video: VideoCard) => {
    trackVideoClick(video.title);
    // Convert YouTube watch URL to embed URL
    const embedUrl = video.videoUrl.replace('watch?v=', 'embed/').replace('&t=23s', '?start=23');
    setLightboxUrl(embedUrl);
    setLightboxTitle(video.title);
    setLightboxOpen(true);
  };

  const videos: VideoCard[] = [
    {
      id: 'video1',
      title: 'OneWheel Hockey',
      description: 'Jul 4, 2020. First time trying onewheel hockey and it\'s awesome.  At the same time I captured some 360 footage with a gopro max.  There are some stitching issues, probably due to the case and plastic lens covers I\'m using.I also made a 360 version:    • OneWheel Hockey 360   that is better on mobile devices.  The song is something I recorded a few weeks ago, drummer from logic pro, bass guitar direct in with amp emulator, the rest is actually ukulele.Even the distorted lead sound is my tenor ukulele into a microphone and later run through an amp emulator.',
      videoUrl: 'https://www.youtube.com/watch?v=KYbMAtuYlq8&t=23s',
      thumbnail: 'https://img.youtube.com/vi/KYbMAtuYlq8/maxresdefault.jpg'
    },
    {
      id: 'video2', 
      title: 'Three.js 3d Scene + RTC video stream demo',
      description: 'This was a demo I made while playing with three.js and webgl.  I used 360 photography methods to make 3d scenes of the house I was renting at the time.  I also bought a deck of "One Night Ultimate Werewolf" that I took photos of the cards and instructions to build a virtual version in the scene.',
      videoUrl: 'https://www.youtube.com/watch?v=3H4FygA91GA',
      thumbnail: 'https://img.youtube.com/vi/3H4FygA91GA/maxresdefault.jpg'
    },
    {
      id: 'video3',
      title: 'Overcast', 
      description: 'Rolling around Ruby Hill and Village Greens on a on overcast day.  I forgot my charge and ride cable or I would have stayed at ruby the whole time.  The music is me messing around with loops in LogicX.',
      videoUrl: 'https://www.youtube.com/watch?v=4bQJPnut2L0',
      thumbnail: 'https://img.youtube.com/vi/4bQJPnut2L0/maxresdefault.jpg'
    },
    {
      id: 'video4',
      title: 'Grasshopper',
      description: 'May 13, 2020 Floating inbetween ruby hills and blue skies.Uber generic rock tune is me plugging bass and electric guitars directly into logicX and using it\'s drummer.',
      videoUrl: 'https://www.youtube.com/watch?v=kEs2IB-64J0',
      thumbnail: 'https://img.youtube.com/vi/kEs2IB-64J0/maxresdefault.jpg'
    }
  ];

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
                I'm a fullstack engineer and technical leader passionate about building innovative solutions that solve real problems. 
                My curiosity drives me to continuously explore new technologies and push the boundaries of what's possible. 
                Currently serving as Head of Engineering at Panorama AI, where we're building systems that aggregate and optimize 
                data to securely power LLM and AI agents.
              </p>
              
              <p>
                I've spent the last decade building products that have been experienced by millions of users. As one of the 
                original engineers at Vertebrae, I helped architect and scale the infrastructure that powered our AR/VR 
                e-commerce platform—from cloud infrastructure and microservices to SDKs and developer tools. When Snap acquired 
                Vertebrae in 2021, I transitioned to lead their AR Enterprise Web SDK team.
              </p>
              
              <p>
                I thrive on finding elegant solutions to difficult problems, whether that's architecting cloud infrastructure, 
                building developer tools, creating immersive AR/VR experiences, or leveraging AI to solve complex challenges. 
                Recently, I've been deeply focused on advancing my AI coding capabilities, building a portfolio of innovative 
                projects involving context-assistant SDEs, agent persona managers, and AI-enhanced 3D tools.
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
          <div className="relative overflow-hidden">
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
            
            {/* Background Decoration - Hidden on mobile to prevent overflow */}
            <div className="absolute inset-0 -z-10 transform translate-x-4 translate-y-4 sm:translate-x-8 sm:translate-y-8 hidden sm:block">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-800 dark:to-accent-800 opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Video Cards Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
            Featured <span className="text-gradient">Videos</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => handleVideoClick(video)}
              >
                {/* Video Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                      Click to watch video
                    </div>
                  </div>
                </div>

                {/* Video Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
                    {video.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        url={lightboxUrl}
        title={lightboxTitle}
      />
    </section>
  );
};

export default About;