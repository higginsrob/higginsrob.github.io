import React from 'react';
import { skills } from '@/data';
import { Skill } from '@/types';

const SkillCard: React.FC<{ skill: Skill }> = ({ skill }) => (
  <div className="surface rounded-md px-3 py-2.5 transition-colors duration-200 hover:border-secondary-400 dark:hover:border-silver-500">
    <span className="text-sm font-medium text-secondary-900 dark:text-white">{skill.name}</span>
  </div>
);

const Skills: React.FC = () => {
  const skillCategories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend & Systems' },
    { key: 'data', label: 'Data' },
    { key: 'tools', label: 'Cloud & DevOps' },
    { key: 'ai', label: 'AI' },
    { key: 'other', label: 'Leadership & Platform' },
  ] as const;

  return (
    <section id="skills" className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            Skills
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            TypeScript and Node first, with platform, cloud, and production LLM depth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category.key);
            if (categorySkills.length === 0) return null;

            return (
              <div key={category.key} className="space-y-3">
                <h3 className="font-mono text-xs tracking-widest uppercase text-secondary-500 dark:text-silver-400">
                  {category.label}
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
