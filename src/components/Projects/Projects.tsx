import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/utils';
import { setProjects, setSelectedCategory } from '@/store/slices/projectsSlice';
import { projects } from '@/data';
import ProjectCard from './ProjectCard';

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filteredProjects, selectedCategory } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(setProjects(projects));
  }, [dispatch]);

  const categories = [
    { value: null, label: 'All Projects' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'backend', label: 'Backend' },
    { value: 'mobile', label: 'Mobile' },
  ];

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <section id="projects" className="section-padding bg-secondary-50 dark:bg-secondary-800">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a unique challenge 
            and an opportunity to learn and grow as a developer.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.value || 'all'}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-secondary-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {selectedCategory === null && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 text-center">
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => project.featured)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div>
          {selectedCategory !== null && (
            <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-8 text-center capitalize">
              {selectedCategory} Projects
            </h3>
          )}
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === null ? projects : filteredProjects).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-secondary-700 dark:text-secondary-300 mb-2">
                No projects found
              </h3>
              <p className="text-secondary-500 dark:text-secondary-400">
                Try selecting a different category or check back soon for new projects.
              </p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-white dark:bg-secondary-900 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            Interested in Working Together?
          </h3>
          <p className="text-secondary-600 dark:text-secondary-300 mb-6">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Get In Touch
            </button>
            <a
              href="https://github.com/higginsrob"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              View More on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;