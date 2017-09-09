import React from 'react';
import { skills } from '@/data';
import { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-center">
        <div className="text-xl mr-2 group-hover:scale-110 transition-transform duration-200">
          {skill.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white">
            {skill.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const skillCategories = [
    { key: 'frontend', label: 'Frontend', icon: '🎨' },
    { key: 'backend', label: 'Backend', icon: '⚙️' },
    { key: 'tools', label: 'Tools & DevOps', icon: '🛠️' },
    { key: 'ai', label: 'AI & Machine Learning', icon: '🤖' },
    { key: 'other', label: 'Other', icon: '🚀' },
  ] as const;

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category);
  };

  return (
    <section id="skills" className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            Technologies and tools I work with regularly.
          </p>
        </div>

        {/* Skills by Category - Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
          {skillCategories.map((category) => {
            const categorySkills = getSkillsByCategory(category.key);
            
            if (categorySkills.length === 0) return null;

            return (
              <div key={category.key} className="bg-secondary-50 dark:bg-secondary-800 rounded-lg overflow-hidden w-full">
                {/* Category Header */}
                <div className="bg-secondary-100 dark:bg-secondary-700 px-4 py-3 mb-4">
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-xl">{category.icon}</span>
                    <h3 className="text-sm font-bold text-secondary-900 dark:text-white">
                      {category.label}
                    </h3>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 gap-2 px-4 pb-4">
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