import React, { useState } from 'react';
import Lightbox from '../Lightbox';
import { trackImageClick } from '@/utils';

interface ExperienceItem {
  company: string;
  positions: {
    title: string;
    duration: string;
    current?: boolean;
    description: React.ReactNode[];
  }[];
  location: string;
  skills: string[];
  logo?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'Panorama AI',
    positions: [
      {
        title: 'Head of Engineering',
        duration: 'Oct 2024 – Feb 2026',
        description: [
          'Drove platform architecture and technical standards across the engineering org while staying hands-on in production systems.',
          'Owned the data platform powering LLM and ML products: event ingestion, ETL, PostgreSQL, and model inputs.',
          'Built core infrastructure for predictive recommendation models and LLM-based business intelligence.',
        ],
      },
      {
        title: 'Lead Software Engineer',
        duration: 'Dec 2023 – Oct 2024',
        description: [
          'Wrote the predictive recommendations widget in React—embeddable personalized product recommendations for Ashley Homestore shoppers.',
          'Built event ingestion and client integration pipelines that turned behavioral data into structured ML inputs.',
          'Defined data architecture patterns that helped prove LLMs could answer BI questions reliably.',
        ],
      },
    ],
    location: 'Remote',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'LLM / ML', 'ETL', 'Leadership'],
    logo: 'panorama.ai.jpg',
  },
  {
    company: 'Snap Inc.',
    positions: [
      {
        title: 'Software Engineer · AR Enterprise Web SDK Tech Lead',
        duration: 'Jul 2021 – Sep 2023',
        description: [
          'Tech lead for the AR Enterprise Web SDK team after Snap acquired Vertebrae.',
          'Built a pub/sub layer connecting Snap and Vertebrae backends across cloud providers.',
          <>
            Designed and shipped the{' '}
            <a
              href="https://newsroom.snap.com/introducing-ar-enterprise-services"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-secondary-400 hover:text-secondary-900 dark:hover:text-white transition-colors"
            >
              ARES
            </a>{' '}
            Web SDK: API, merchant integrations, event tracking, and experience templating.
          </>,
          'Built Camera Kit web experiences and a Three.js 3D product viewer for interactive exploration and AR placement.',
        ],
      },
    ],
    location: 'Remote',
    skills: ['TypeScript', 'Node.js', 'Three.js', 'SDK Design', 'Pub/Sub', 'PostgreSQL'],
    logo: 'ares.jpg',
  },
  {
    company: 'Vertebrae',
    positions: [
      {
        title: 'Senior Fullstack Software Engineer',
        duration: 'Feb 2016 – Jul 2021',
        description: [
          'Early engineer; built the AR/VR e-commerce platform from scratch through the Snap acquisition.',
          'Owned most cloud infrastructure with Terraform; scaled to millions of users with Docker, serverless, and microservices.',
          'Shipped merchant SDK, CI/CD across repos, event tracking into PostgreSQL, and React/Node merchant tools.',
          'Supported the pre-acquisition security audit and infrastructure path into Snap.',
        ],
      },
    ],
    location: 'Santa Monica, CA · Remote',
    skills: ['React', 'Node.js', 'TypeScript', 'Terraform', 'AWS', 'Docker', 'SDK'],
    logo: 'vertebrae.jpg',
  },
];

const Experience: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');

  const handleLogoClick = (imageUrl: string, companyName: string) => {
    trackImageClick(companyName);
    setLightboxUrl(imageUrl);
    setLightboxTitle(companyName);
    setLightboxOpen(true);
  };

  return (
    <section id="experience" className="section-padding bg-secondary-50 dark:bg-secondary-800/40">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            Experience
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Startup ownership through acquisition, enterprise SDK leadership, then Head of Eng for
            production LLM platforms.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-10">
          {experiences.map((exp, index) => (
            <article
              key={exp.company}
              className="relative pl-8 border-l border-secondary-300 dark:border-secondary-600"
            >
              <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-silver-300 to-secondary-700" />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                    {exp.location}
                  </p>
                </div>
                {exp.logo && (
                  <button
                    type="button"
                    onClick={() => handleLogoClick(`/${exp.logo}`, exp.company)}
                    className="shrink-0 hover:opacity-80 transition-opacity"
                    title={`${exp.company} image`}
                  >
                    <img
                      src={`/${exp.logo}`}
                      alt={`${exp.company}`}
                      className="w-10 h-10 object-contain rounded bg-white dark:bg-secondary-900 p-1 border border-secondary-200 dark:border-secondary-700"
                    />
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {exp.positions.map((position) => (
                  <div key={`${exp.company}-${position.title}`}>
                    <h4 className="text-base font-semibold text-secondary-800 dark:text-silver-200">
                      {position.title}
                    </h4>
                    <p className="font-mono text-xs text-secondary-500 dark:text-secondary-400 mt-1 mb-3">
                      {position.duration}
                    </p>
                    <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                      {position.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[15px] leading-relaxed">
                          <span className="text-silver-500 mt-2 text-[8px]">●</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono text-secondary-600 dark:text-silver-300 bg-secondary-100/80 dark:bg-secondary-900/80 border border-secondary-200 dark:border-secondary-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {index < experiences.length - 1 && <div className="h-2" />}
            </article>
          ))}
        </div>
      </div>

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
