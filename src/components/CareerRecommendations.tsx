'use client';

import React, { useEffect } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { CareerTrack } from '@/types/career';

const CareerRecommendations: React.FC = () => {
  const { 
    recommendedCareers, 
    setRecommendedCareers, 
    selectedCareerTrack, 
    setSelectedCareerTrack,
    isProfileComplete,
    isLoading,
    refreshRecommendations
  } = useCareerContext();

  useEffect(() => {
    // If we have a user profile but no recommendations, fetch them
    if (isProfileComplete && recommendedCareers.length === 0 && !isLoading) {
      refreshRecommendations();
    }
  }, [isProfileComplete, recommendedCareers.length, isLoading, refreshRecommendations]);

  // Placeholder data for development - in production, this would come from the API
  useEffect(() => {
    if (!isProfileComplete || recommendedCareers.length > 0) return;

    // This is temporary mock data - remove when API is implemented
    const mockCareers: CareerTrack[] = [
      {
        id: '1',
        title: 'Full Stack Developer',
        description: 'Build both frontend and backend components of web applications, working with modern frameworks and databases.',
        demandLevel: 'High',
        averageSalary: '$100,000 - $140,000',
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
        recommendedCourses: ['Web Development Bootcamp', 'Modern JavaScript'],
        timeToAchieve: '9 months',
        jobTitles: ['Full Stack Developer', 'Web Developer', 'JavaScript Developer']
      },
      {
        id: '2',
        title: 'Data Scientist',
        description: 'Analyze complex data to help organizations make better decisions using statistical methods and machine learning.',
        demandLevel: 'High',
        averageSalary: '$120,000 - $160,000',
        requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
        recommendedCourses: ['Data Science Foundations', 'Machine Learning Fundamentals'],
        timeToAchieve: '12 months',
        jobTitles: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer']
      },
      {
        id: '3',
        title: 'DevOps Engineer',
        description: 'Bridge the gap between development and operations by implementing CI/CD pipelines and infrastructure automation.',
        demandLevel: 'High',
        averageSalary: '$110,000 - $150,000',
        requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
        recommendedCourses: ['DevOps Essentials', 'Cloud Infrastructure', 'Container Orchestration'],
        timeToAchieve: '8 months',
        jobTitles: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer']
      },
      {
        id: '4',
        title: 'Mobile App Developer',
        description: 'Create applications for iOS and Android platforms, with a focus on user experience and performance.',
        demandLevel: 'Medium',
        averageSalary: '$95,000 - $135,000',
        requiredSkills: ['Swift', 'Kotlin', 'React Native', 'Mobile UI/UX', 'RESTful APIs'],
        recommendedCourses: ['iOS Development with Swift', 'Android Development with Kotlin'],
        timeToAchieve: '10 months',
        jobTitles: ['iOS Developer', 'Android Developer', 'Mobile Application Developer']
      },
      {
        id: '5',
        title: 'Cybersecurity Specialist',
        description: 'Protect systems, networks, and data from cyber threats and implement security measures.',
        demandLevel: 'High',
        averageSalary: '$105,000 - $145,000',
        requiredSkills: ['Network Security', 'Encryption', 'Penetration Testing', 'Security Frameworks', 'Risk Assessment'],
        recommendedCourses: ['Cybersecurity Fundamentals', 'Ethical Hacking', 'Security Compliance'],
        timeToAchieve: '12 months',
        jobTitles: ['Security Engineer', 'Information Security Analyst', 'Cybersecurity Consultant']
      }
    ];

    setRecommendedCareers(mockCareers);
  }, [isProfileComplete, recommendedCareers.length, setRecommendedCareers]);

  if (!isProfileComplete) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Career Recommendations</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Please complete your profile to get personalized career recommendations.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Career Recommendations</h2>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  const handleSelectCareer = (career: CareerTrack) => {
    setSelectedCareerTrack(career);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Recommended Career Paths</h2>

      {selectedCareerTrack ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedCareerTrack.title}</h3>
            <button
              onClick={() => setSelectedCareerTrack(null)}
              className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Back to All Recommendations
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Demand:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  selectedCareerTrack.demandLevel === 'High' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  selectedCareerTrack.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {selectedCareerTrack.demandLevel}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Average Salary:</span>
                <span className="text-sm text-gray-900 dark:text-gray-100">{selectedCareerTrack.averageSalary}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">Time to Achieve:</span>
                <span className="text-sm text-gray-900 dark:text-gray-100">{selectedCareerTrack.timeToAchieve}</span>
              </div>
            </div>
          </div>

          <p className="mb-4 text-gray-700 dark:text-gray-300">{selectedCareerTrack.description}</p>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Required Skills</h4>
            <div className="flex flex-wrap gap-2">
              {selectedCareerTrack.requiredSkills.map(skill => (
                <span 
                  key={skill} 
                  className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Common Job Titles</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {selectedCareerTrack.jobTitles.map(title => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Recommended Courses</h4>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {selectedCareerTrack.recommendedCourses.map(course => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm"
              onClick={() => {
                // In production, this would trigger the roadmap generation
                alert('This would generate your personalized learning roadmap!');
              }}
            >
              Create My Learning Roadmap
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCareers.map(career => (
            <div 
              key={career.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{career.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    career.demandLevel === 'High' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    career.demandLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {career.demandLevel} Demand
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{career.description}</p>
                <div className="mb-3">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                    <span className="font-medium">Salary:</span> {career.averageSalary}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Time:</span> {career.timeToAchieve}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {career.requiredSkills.slice(0, 3).map(skill => (
                    <span 
                      key={skill} 
                      className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {career.requiredSkills.length > 3 && (
                    <span className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded text-xs">
                      +{career.requiredSkills.length - 3} more
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleSelectCareer(career)}
                  className="w-full py-2 px-3 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-200 font-medium rounded-md text-sm transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!selectedCareerTrack && recommendedCareers.length > 0 && (
        <div className="mt-6">
          <button
            onClick={refreshRecommendations}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Recommendations
          </button>
        </div>
      )}
    </div>
  );
};

export default CareerRecommendations; 