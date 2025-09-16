
import { useState, useEffect, useRef } from 'react';
import {
  X,Github, ExternalLink, Star, Calendar, Clock
} from 'lucide-react';

// Simple ProjectModal component since the external import might not exist
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="text-purple-400 text-4xl">
                {typeof project.icon === "string" ? project.icon : "📁"}
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{project.title || "Untitled Project"}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {project?.year || project?.createdAt ? new Date(project.createdAt || project.year).getFullYear() : "N/A"}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {project?.status || "Active"}
                  </span>
                  {project?.category && (
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                      {project.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            {project?.longDescription || project?.description || "No detailed description available."}
          </p>

          {/* Tech + Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project?.tech && Array.isArray(project.tech) && project.tech.length > 0 ? (
                  project.tech.map((tech, index) => (
                    <span
                      key={`tech-${index}`}
                      className="px-3 py-2 bg-purple-600/30 text-purple-300 text-sm rounded-lg"
                    >
                      {tech}
                    </span>
                  ))
                ) : project?.features && Array.isArray(project.features) ? (
                  project.features.slice(0, 4).map((feature, index) => (
                    <span
                      key={`feature-as-tech-${index}`}
                      className="px-3 py-2 bg-purple-600/30 text-purple-300 text-sm rounded-lg"
                    >
                      {feature}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">No technologies listed</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Key Highlights</h3>
              <ul className="space-y-2">
                {project?.highlights && Array.isArray(project.highlights) && project.highlights.length > 0 ? (
                  project.highlights.map((highlight, index) => (
                    <li key={`highlight-${index}`} className="flex items-start text-gray-300">
                      <Star className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{highlight}</span>
                    </li>
                  ))
                ) : project?.features && Array.isArray(project.features) ? (
                  project.features.slice(0, 3).map((feature, index) => (
                    <li key={`feature-as-highlight-${index}`} className="flex items-start text-gray-300">
                      <Star className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm italic">No highlights available</li>
                )}
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project?.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
              >
                <ExternalLink size={20} className="mr-2" />
                Live Demo
              </a>
            )}
            {project?.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white rounded-lg transition-colors font-medium"
              >
                <Github size={20} className="mr-2" />
                View Code
              </a>
            )}
            <button
              onClick={onClose}
              className="flex items-center justify-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;