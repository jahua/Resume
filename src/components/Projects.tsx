'use client';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import projectsData from '../data/projects.json';

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.filter(project => project.featured).map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-video relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white text-center">
                {project.title}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-900 text-white text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>View Code</span>
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 