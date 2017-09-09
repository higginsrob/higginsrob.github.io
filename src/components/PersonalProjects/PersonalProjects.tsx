import React, { useState } from 'react';
import Lightbox from '../Lightbox';
import { trackProjectClick, trackImageClick } from '@/utils';

interface PersonalProject {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  npmUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  image: string;
  featured: boolean;
}

const PersonalProjects: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');

  const handleImageClick = (project: PersonalProject) => {
    if (project.liveUrl) {
      trackProjectClick(project.title, 'view_demo_image');
      setLightboxUrl(project.liveUrl);
      setLightboxTitle(project.title);
      setLightboxOpen(true);
    } else if (project.videoUrl) {
      trackProjectClick(project.title, 'view_video_image');
      // Convert YouTube watch URL to embed URL
      const embedUrl = project.videoUrl.replace('watch?v=', 'embed/');
      setLightboxUrl(embedUrl);
      setLightboxTitle(project.title);
      setLightboxOpen(true);
    }
  };

  const handleThumbnailClick = (project: PersonalProject) => {
    if (project.thumbnailUrl) {
      trackImageClick(`${project.title} - Screenshot`);
      setLightboxUrl(project.thumbnailUrl);
      setLightboxTitle(`${project.title} - Screenshot`);
      setLightboxOpen(true);
    }
  };

  const projects: PersonalProject[] = [
    {
      id: 'rc-10remote',
      title: 'Boss RC-10r Midi Remote',
      description: 'A web-based remote control interface for managing and controlling a Boss RC-10r Rhythm Loop Station via MIDI',
      technologies: ['TypeScript', 'HTML5', 'CSS3', 'Web APIs'],
      githubUrl: 'https://github.com/higginsrob/rc-10remote',
      liveUrl: 'https://higginsrob.github.io/rc-10remote',
      image: 'rc-10remote-app.png',
      featured: false,
    },
    {
      id: 'jdom',
      title: 'JDOM.js',
      description: 'Lightweight, zero-dependency DOM builder library with a functional API for creating and manipulating DOM elements with ease. This package has over 600,000 npm installs (since 2016), demonstrating its reliability and adoption in the JavaScript community.',
      technologies: ['JavaScript', 'TypeScript', 'DOM API', 'NPM'],
      githubUrl: 'https://github.com/higginsrob/jdom',
      liveUrl: 'https://higginsrob.github.io/jdom/',
      npmUrl: 'https://www.npmjs.com/package/jdom',
      image: 'jdom-npm.jpg',
      featured: false,
    },
    {
      id: 'audio-separator',
      title: 'Audio Separator + Stem Player',
      description: 'Advanced audio processing tool that separates music into individual stems (vocals, drums, bass, instruments) and provides an interactive stem player for mixing and remixing',
      technologies: ['Audio Processing', 'AI/ML', 'Web Interface'],
      videoUrl: 'https://www.youtube.com/watch?v=4maNzzPvTcE',
      thumbnailUrl: 'app.local.jpg',
      image: 'demux.pg.jpg',
      featured: false,
    },
  ];

  return (
    <section id="projects" className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            Personal <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Side projects and experiments that showcase my passion for building innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-secondary-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Project Image */}
              <div 
                className={`relative h-48 overflow-hidden ${(project.liveUrl || project.videoUrl) ? 'cursor-pointer' : ''}`}
                onClick={() => handleImageClick(project)}
              >
                <img
                  src={project.image}
                  alt={`${project.title} Screenshot`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.liveUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                      Click to view live demo
                    </div>
                  </div>
                )}
                {project.videoUrl && !project.liveUrl && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
                      Click to watch video demo
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-secondary-600 dark:text-secondary-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex items-center space-x-3 flex-wrap gap-y-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProjectClick(project.title, 'view_code')}
                      className="flex items-center space-x-2 px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 rounded-lg text-secondary-700 hover:text-primary-600 hover:border-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:border-primary-400 transition-all duration-200 cursor-pointer"
                    >
                      <img 
                        src="/github.svg" 
                        alt="GitHub" 
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  )}
                  
                  {project.npmUrl && (
                    <a
                      href={project.npmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProjectClick(project.title, 'view_npm')}
                      className="flex items-center space-x-2 px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 rounded-lg text-secondary-700 hover:text-primary-600 hover:border-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:border-primary-400 transition-all duration-200 cursor-pointer"
                    >
                      <span className="text-base">📦</span>
                      <span className="text-sm font-medium">NPM</span>
                    </a>
                  )}
                  
                  {project.videoUrl && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleImageClick(project)}
                        className="flex items-center space-x-2 px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 rounded-lg text-secondary-700 hover:text-primary-600 hover:border-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:border-primary-400 transition-all duration-200 cursor-pointer"
                      >
                        <span className="text-base">📺</span>
                        <span className="text-sm font-medium">Video</span>
                      </button>
                      {project.thumbnailUrl && (
                        <button
                          onClick={() => handleThumbnailClick(project)}
                          className="flex items-center space-x-2 px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 rounded-lg text-secondary-700 hover:text-primary-600 hover:border-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:border-primary-400 transition-all duration-200 cursor-pointer"
                        >
                          <span className="text-base">📸</span>
                          <span className="text-sm font-medium">Screenshot</span>
                        </button>
                      )}
                    </div>
                  )}
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackProjectClick(project.title, 'view_live_demo')}
                      className="flex items-center space-x-2 px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 rounded-lg text-secondary-700 hover:text-primary-600 hover:border-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:border-primary-400 transition-all duration-200 cursor-pointer"
                    >
                      <span>🚀</span>
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Projects Placeholder */}
        <div className="text-center mt-12">
          <p className="text-secondary-500 dark:text-secondary-400 italic">
            More projects coming soon...
          </p>
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

export default PersonalProjects;