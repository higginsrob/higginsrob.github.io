import React from 'react';

const highlights = [
  'End-to-end ownership across product, platform, and infrastructure',
  'SDK and developer-facing platforms for partner integrations',
  'Production LLM and ML systems, not demos',
  'Hands-on Staff / Head of Eng leadership with mentoring and standards',
];

const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-8">
            About
          </h2>

          <div className="space-y-5 text-lg text-secondary-600 dark:text-secondary-300 leading-relaxed">
            <p>
              Staff-level software engineer with 10+ years building and owning production systems at
              scale. Early engineer at Vertebrae, I owned cloud infrastructure, microservices, SDKs,
              and merchant integrations for an AR/VR e-commerce platform through Snap&apos;s
              acquisition in 2021.
            </p>
            <p>
              At Snap, I was tech lead for the AR Enterprise Web SDK: cross-cloud pub/sub, merchant
              integrations, and web AR with Three.js and Camera Kit. At Panorama AI I owned the core
              data and ML infrastructure behind LLM products—event ingestion, ETL, predictive
              recommendations, and embeddable client surfaces—and served as Head of Engineering.
            </p>
            <p>
              I look for Staff Product, Staff Platform, and AI Platform roles at product companies,
              remote or Denver hybrid. TypeScript and Node first; architecture and shipping still
              hands-on.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-secondary-700 dark:text-secondary-300"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-silver-300 to-secondary-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
