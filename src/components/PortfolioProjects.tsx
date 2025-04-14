'use client';

import React, { useState, useEffect } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { PortfolioProject } from '@/types/career';
import { v4 as uuidv4 } from 'uuid';

const PortfolioProjects: React.FC = () => {
  const { userProfile, selectedCareerTrack } = useCareerContext();
  
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: '',
    description: '',
    technologies: [],
    repoUrl: '',
    demoUrl: '',
    thumbnailUrl: '',
    images: [],
    featured: false
  });
  
  // Fetch user's portfolio projects
  useEffect(() => {
    if (!userProfile) return;
    
    // Simulate API fetch for projects
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockProjects: PortfolioProject[] = [
            {
              id: '1',
              userId: userProfile?.id,
              title: 'Personal Portfolio Website',
              description: 'A responsive portfolio website built with modern web technologies to showcase my projects and skills.',
              technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
              repoUrl: 'https://github.com/username/portfolio',
              demoUrl: 'https://portfolio.username.dev',
              thumbnailUrl: 'https://via.placeholder.com/500x300',
              images: [
                'https://via.placeholder.com/1200x800',
                'https://via.placeholder.com/1200x800',
              ],
              completedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
              featured: true
            },
            {
              id: '2',
              userId: userProfile?.id,
              title: 'E-commerce Dashboard',
              description: 'An admin dashboard for e-commerce platforms with sales analytics, inventory management, and order processing.',
              technologies: ['React', 'Redux', 'Material UI', 'Node.js', 'Express', 'MongoDB'],
              repoUrl: 'https://github.com/username/ecommerce-dashboard',
              demoUrl: 'https://ecommerce-dash.username.dev',
              thumbnailUrl: 'https://via.placeholder.com/500x300',
              images: [
                'https://via.placeholder.com/1200x800',
                'https://via.placeholder.com/1200x800',
              ],
              completedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
              featured: false
            }
          ];
          
          setProjects(mockProjects);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [userProfile]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, technologies }));
  };
  
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imagesText = e.target.value;
    const images = imagesText ? imagesText.split(',').map(url => url.trim()) : [];
    setFormData(prev => ({ ...prev, images }));
  };
  
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: PortfolioProject = {
      id: uuidv4(),
      userId: userProfile?.id || 'temp-user-id',
      completedAt: new Date(),
      ...formData
    } as PortfolioProject;
    
    setProjects(prev => [...prev, newProject]);
    resetForm();
    setIsAddingProject(false);
  };
  
  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditingProject) return;
    
    setProjects(prev => prev.map(project => 
      project.id === isEditingProject 
        ? { ...project, ...formData } 
        : project
    ));
    
    resetForm();
    setIsEditingProject(null);
  };
  
  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  };
  
  const startEditing = (project: PortfolioProject) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      repoUrl: project.repoUrl || '',
      demoUrl: project.demoUrl || '',
      thumbnailUrl: project.thumbnailUrl || '',
      images: project.images || [],
      featured: project.featured
    });
    
    setIsEditingProject(project.id);
    setIsAddingProject(true);
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      repoUrl: '',
      demoUrl: '',
      thumbnailUrl: '',
      images: [],
      featured: false
    });
  };
  
  const cancelForm = () => {
    resetForm();
    setIsAddingProject(false);
    setIsEditingProject(null);
  };
  
  if (!userProfile) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Portfolio Projects</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Please complete your profile to manage your portfolio projects.
          </p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Portfolio Projects</h2>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Portfolio Projects</h2>
        <button
          onClick={() => setIsAddingProject(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center"
          disabled={isAddingProject}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>
      
      {isAddingProject ? (
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {isEditingProject ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <form onSubmit={isEditingProject ? handleUpdateProject : handleAddProject} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Technologies* (comma-separated)
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies?.join(', ')}
                onChange={handleTechnologiesChange}
                required
                placeholder="React, Node.js, MongoDB, etc."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Repository URL
                </label>
                <input
                  type="url"
                  id="repoUrl"
                  name="repoUrl"
                  value={formData.repoUrl}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                />
              </div>
              
              <div>
                <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Demo URL
                </label>
                <input
                  type="url"
                  id="demoUrl"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleInputChange}
                  placeholder="https://yourproject.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/thumbnail.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
              />
            </div>
            
            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Additional Images (comma-separated URLs)
              </label>
              <input
                type="text"
                id="images"
                name="images"
                value={formData.images?.join(', ')}
                onChange={handleImagesChange}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Feature this project (shown at the top of your portfolio)
              </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={cancelForm}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                {isEditingProject ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        projects.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You haven't added any projects to your portfolio yet.
            </p>
            <button
              onClick={() => setIsAddingProject(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {projects.some(project => project.featured) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Featured Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects
                    .filter(project => project.featured)
                    .map(project => (
                      <div key={project.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        {project.thumbnailUrl && (
                          <div className="aspect-w-16 aspect-h-9">
                            <img 
                              src={project.thumbnailUrl} 
                              alt={project.title} 
                              className="object-cover w-full h-48"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map(tech => (
                              <span 
                                key={tech} 
                                className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-3">
                            {project.repoUrl && (
                              <a 
                                href={project.repoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 flex items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                View Code
                              </a>
                            )}
                            
                            {project.demoUrl && (
                              <a 
                                href={project.demoUrl} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 flex items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Live Demo
                              </a>
                            )}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Completed on {project.completedAt.toLocaleDateString()}
                            </span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditing(project)}
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {/* All Projects */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">All Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {project.thumbnailUrl && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img 
                          src={project.thumbnailUrl} 
                          alt={project.title} 
                          className="object-cover w-full h-32"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800 dark:text-white">{project.title}</h4>
                        {project.featured && (
                          <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span 
                            key={tech} 
                            className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded text-xs">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2">
                          {project.repoUrl && (
                            <a 
                              href={project.repoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                            >
                              View Code
                            </a>
                          )}
                          
                          {project.demoUrl && (
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditing(project)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default PortfolioProjects; 