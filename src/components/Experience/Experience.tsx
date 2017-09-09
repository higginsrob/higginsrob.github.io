import React from 'react';

interface ExperienceItem {
  company: string;
  positions: {
    title: string;
    duration: string;
    current?: boolean;
  }[];
  totalDuration: string;
  location: string;
  description: string[];
  skills: string[];
  image?: string;
  images?: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'Panorama AI',
      positions: [
        {
          title: 'Head of Engineering',
          duration: 'Oct 2024 - Present',
          current: true,
        },
        {
          title: 'Lead Software Engineer',
          duration: 'Dec 2023 - Oct 2024',
        },
      ],
      totalDuration: '1 yr 11 mos',
      location: 'United States · Remote',
      description: [
        'Leading engineering efforts to build systems that aggregate and optimize data to securely power LLM and AI agents.',
        'Focused on proving that LLMs can accurately answer business intelligence questions without hallucinations.',
      ],
      skills: ['LLMs', 'AI Agents', 'Machine Learning', 'Data Engineering', 'Python'],
      image: 'panorama.ai.jpg',
    },
    {
      company: 'Snap Inc. (Snapchat)',
      positions: [
        {
          title: 'Software Engineer | AR Enterprise Web SDK Tech Lead',
          duration: 'Jul 2021 - Sep 2023',
        },
      ],
      totalDuration: '2 yrs 3 mos',
      location: 'United States · Remote',
      description: [
        'July 2021 Vertebrae was acquired by Snap',
        'Built a pub/sub system to integrate Snap and Vertebrae backend systems across multiple cloud providers',
        'Lead developer of ARES web SDK (API, merchant integration, event emission, experience templating and injection)',
        'Lead developer of ARES camera-kit experience (Snap\'s camera-kit on the web + enterprise shopping integration)',
        'Lead developer of 3D product visualization experience (Three.js based experience)',
      ],
      skills: ['Shell Scripting', 'Docker', 'Node.js', 'AR/VR', 'Automation', 'Three.js', 'PostgreSQL', 'Software Infrastructure', 'Software Design', 'Web Engineering', 'TypeScript'],
    },
    {
      company: 'Vertebrae Inc',
      positions: [
        {
          title: 'Senior Fullstack Software Engineer',
          duration: 'Feb 2016 - Jul 2021',
        },
      ],
      totalDuration: '5 yrs 6 mos',
      location: 'Santa Monica, CA',
      description: [
        'As one of the original software engineers at Vertebrae, I had the opportunity to fulfill a senior leadership role building new products.',
        'Owned, developed and deployed most of the cloud infrastructure for the organization',
        'Worked cross-functionally with nearly all projects in the organization',
        'Drove technical decision-making across multiple teams',
        'Mentored junior team members',
        'Built AR/VR experiences including 360 video player, Virtual Try On experience on web, Interactive 3D Object experience on web',
        'Developed QR code integration for Apple QuickLook and Google SceneViewer for native AR experiences from the web',
        'Built Ad-Tech integration interface, E-commerce integration interface and SDK',
        'Developed production JS SDK distribution system and CI/CD (GitHub Actions) for all repos',
        'Wrote microservices using container and serverless technologies',
        'Assisted with acquisition of the company by Snap in July 2021, including security audits and infrastructure migration',
      ],
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
                          <div className="space-y-2">
                            {exp.positions.map((position, posIndex) => (
                              <div key={posIndex}>
                                <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                  {position.title}
                                </h4>
                                <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                                  {position.duration} · {position.current ? 'Current Position' : exp.totalDuration}
                                </p>
                              </div>
                            ))}
                            <p className="text-secondary-500 dark:text-secondary-400 text-sm">
                              📍 {exp.location}
                            </p>
                          </div>
                        </div>
                        
                        {/* Company Logo/Image(s) */}
                        {exp.company === 'Panorama AI' && exp.image && (
                          <div className="flex-shrink-0">
                            <a
                              href="https://panorama.ai"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block hover:opacity-80 transition-opacity duration-200"
                            >
                              <img
                                src={exp.image}
                                alt={`${exp.company} logo`}
                                className="w-[200px] h-auto object-contain rounded-lg bg-white dark:bg-secondary-800 p-3 border border-secondary-200 dark:border-secondary-700"
                              />
                            </a>
                          </div>
                        )}
                        {/* Vertebrae images will be rendered at the end of the card */}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <ul className="space-y-2 text-secondary-700 dark:text-secondary-300">
                        {exp.description.map((item, descIndex) => (
                          <li key={descIndex} className="flex items-start space-x-2">
                            <span className="text-primary-500 mt-2 text-xs">●</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

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

                    {/* Vertebrae Images at the end of the card, side by side */}
                    {exp.company === 'Vertebrae Inc' && exp.images && (
                      <div className="flex flex-row gap-4 justify-center items-center mt-8">
                        {exp.images.map((img, idx) => (
                          <img
                            key={img}
                            src={img}
                            alt={`Vertebrae image ${idx + 1}`}
                            className="w-[200px] h-auto object-contain rounded-lg bg-white dark:bg-secondary-800 p-3 border border-secondary-200 dark:border-secondary-700"
                          />
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
    </section>
  );
};

export default Experience;