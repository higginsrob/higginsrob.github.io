import React, { useState } from 'react';
import Lightbox from '../Lightbox';
import { trackImageClick } from '@/utils';

interface ExperienceItem {
  company: string;
  positions: {
    title: string;
    duration: string;
    current?: boolean;
    description?: string[];
  }[];
  totalDuration: string;
  location: string;
  skills: string[];
  image?: string;
  images?: string[];
}

const Experience: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');

  const handleImageClick = (imageUrl: string, companyName: string) => {
    trackImageClick(companyName);
    setLightboxUrl(imageUrl);
    setLightboxTitle(`${companyName} - Company Image`);
    setLightboxOpen(true);
  };

  const experiences: ExperienceItem[] = [
    {
      company: 'Panorama AI',
      positions: [
        {
          title: 'Head of Engineering',
          duration: 'Oct 2024 - Present',
          current: true,
          description: [
            'Steer large-scale technical initiatives, aligning engineering efforts with business objectives and product roadmap',
            'Drive strategic planning and technical decision-making, establishing architectural patterns and best practices across the engineering organization',
            'Oversee development of systems that aggregate and optimize data to securely power LLM and AI agents, ensuring scalability and reliability',
            'Collaborate cross-functionally with product, data science, and business teams to deliver innovative solutions that solve complex customer challenges',
          ],
        },
        {
          title: 'Lead Software Engineer',
          duration: 'Dec 2023 - Oct 2024',
          description: [
            'Architected and developed the predictive recommendations widget, creating a flexible, embeddable component that delivers personalized product recommendations to Ashley CA users',
            'Built production JavaScript tag system for seamless client integration, enabling real-time data collection',
            'Designed and implemented event emission system that captures user behavior data with high reliability, ensuring data quality for ML models',
            'Developed scalable event ingestion pipeline that processes millions of user interactions, transforming raw behavioral data into structured inputs for predictive recommendation models',
            'Established data architecture patterns that enabled Panorama to prove LLMs can accurately answer business intelligence questions',
          ],
        },
      ],
      totalDuration: '1 yr 11 mos',
      location: 'United States · Remote',
      skills: ['LLMs', 'AI Agents', 'Machine Learning', 'Data Engineering', 'Architecture', 'Leadership', 'Strategy'],
      image: 'panorama.ai.jpg',
    },
    {
      company: 'Snap Inc. (Snapchat)',
      positions: [
        {
          title: 'Software Engineer | AR Enterprise Web SDK Tech Lead',
          duration: 'Jul 2021 - Sep 2023',
          current: false,
          description: [
            'Following Snap\'s acquisition of Vertebrae in July 2021, I transitioned to lead the AR Enterprise Web SDK team',
            'Architected cross-cloud integration systems: Built a robust pub/sub system to seamlessly integrate Snap and Vertebrae backend systems across multiple cloud providers',
            'Led ARES Web SDK development: Architected and developed the complete ARES web SDK, including API design, merchant integration frameworks, and event emission systems',
            'Built Camera Kit enterprise experiences: Led development of ARES camera-kit experience, integrating Snap\'s Camera Kit on the web with enterprise shopping functionality',
            'Developed 3D product visualization platform: Architected and built a Three.js-based 3D product visualization experience, enabling interactive product exploration for millions of users',
          ],
        },
      ],
      totalDuration: '2 yrs 3 mos',
      location: 'United States · Remote',
      skills: ['Shell Scripting', 'Docker', 'Node.js', 'AR/VR', 'Automation', 'Three.js', 'PostgreSQL', 'Software Infrastructure', 'Software Design', 'Web Engineering', 'TypeScript'],
    },
    {
      company: 'Vertebrae Inc',
      positions: [
        {
          title: 'Senior Fullstack Software Engineer',
          duration: 'Feb 2016 - Jul 2021',
          current: false,
          description: [
            'As one of the original software engineers, played a foundational role in building the company\'s AR/VR e-commerce platform from the ground up',
            'Owned, developed, and deployed the majority of cloud infrastructure for the organization, establishing the technical foundation that scaled to serve millions of users',
            'Architected event emitting and ingestion systems that powered all business intelligence and analytics',
            'Built microservices architecture using container and serverless technologies, enabling scalable and cost-effective infrastructure',
            'Built pioneering AR/VR experiences including a 360° video player, 360° image experiences, virtual try-on, and interactive 3D object viewers',
            'Created QR code integration system enabling native AR experiences via Apple QuickLook and Google SceneViewer directly from web',
            'Architected e-commerce integration interface and SDK enabling merchants to host AR experiences',
            'Assisted with company acquisition by Snap (July 2021), including security audits and infrastructure migration',
          ],
        },
      ],
      totalDuration: '5 yrs 6 mos',
      location: 'Santa Monica, CA',
      skills: ['Shell Scripting', 'Docker', 'JavaScript', 'Serverless Computing', 'Node.js', 'DevOps', 'Tooling Design', 'AR/VR', 'Architecture', 'Automation', 'Three.js', 'PostgreSQL', 'Webpack', 'TypeScript', 'React.js'],
      images: ['baby.png', 'vertebrae.jpg'],
    },
  ];

  return (
    <section id="experience" className="section-padding bg-secondary-50 dark:bg-secondary-800">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            A journey through innovative companies building cutting-edge AR, AI, and web technologies.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-700"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.company} className="relative flex items-start space-x-6">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-white dark:bg-secondary-900 rounded-full border-4 border-primary-500 flex items-center justify-center shadow-lg">
                      <div className="w-6 h-6 bg-primary-500 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white dark:bg-secondary-900 rounded-xl shadow-lg p-8">
                    {/* Company Header */}
                    <div className="mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                            {exp.company}
                          </h3>
                          <div className="space-y-6">
                            {exp.positions.map((position, posIndex) => (
                              <div key={posIndex}>
                                <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                  {position.title}
                                </h4>
                                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-3">
                                  {position.duration} · {position.current ? 'Current Position' : exp.totalDuration}
                                </p>
                                {position.description && (
                                  <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                                    {position.description.map((item, descIndex) => (
                                      <li key={descIndex} className="flex items-start space-x-2">
                                        <span className="text-primary-500 mt-2 text-xs">●</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                            <p className="text-secondary-500 dark:text-secondary-400 text-sm mt-2">
                              📍 {exp.location}
                            </p>
                          </div>
                        </div>
                        
                        {/* Company Logo/Image(s) */}
                        {exp.company === 'Panorama AI' && exp.image && (
                          <div className="flex-shrink-0">
                            <button
                              onClick={() => handleImageClick(exp.image!, exp.company)}
                              className="block hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                              title="Click to view full image"
                            >
                              <img
                                src={exp.image}
                                alt={`${exp.company} logo`}
                                className="w-8 h-8 object-contain rounded-md bg-white dark:bg-secondary-800 p-1 border border-secondary-200 dark:border-secondary-700 hover:border-primary-500 transition-colors duration-200"
                              />
                            </button>
                          </div>
                        )}
                        {/* Vertebrae images will be rendered at the end of the card */}
                      </div>
                    </div>

                    {/* Description - Fallback for older entries if needed */}
                    {/* This section is now handled within positions for all entries */}

                    {/* Skills */}
                    <div>
                      <h5 className="text-sm font-semibold text-secondary-900 dark:text-white mb-3">
                        Key Technologies & Skills:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Vertebrae Images - Small clickable thumbnails */}
                    {exp.company === 'Vertebrae Inc' && exp.images && (
                      <div className="flex flex-row gap-2 justify-start items-center mt-4">
                        {exp.images.map((img, idx) => (
                          <button
                            key={img}
                            onClick={() => handleImageClick(img, `${exp.company} - Image ${idx + 1}`)}
                            className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                            title="Click to view full image"
                          >
                            <img
                              src={img}
                              alt={`Vertebrae image ${idx + 1}`}
                              className="w-8 h-8 object-contain rounded-md bg-white dark:bg-secondary-800 p-1 border border-secondary-200 dark:border-secondary-700 hover:border-primary-500 transition-colors duration-200"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

export default Experience;