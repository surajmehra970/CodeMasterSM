'use client';

import React, { useState, useEffect } from 'react';
import { CareerProvider } from '@/app/CareerContext';
import CareerProfileForm from '@/components/CareerProfileForm';
import CareerRecommendations from '@/components/CareerRecommendations';
import DynamicRoadmap from '@/components/DynamicRoadmap';
import SkillAssessment from '@/components/SkillAssessment';
import AiTutorChat from '@/components/AiTutorChat';
import PortfolioProjects from '@/components/PortfolioProjects';
import JobAlignmentEngine from '@/components/JobAlignmentEngine';
import JobTrends from '@/components/JobTrends';
import { useSearchParams } from 'next/navigation';

const CareerMapperPage: React.FC = () => {
  const searchParams = useSearchParams();
  const editMode = searchParams.get('edit');
  const section = searchParams.get('section');
  
  const [activeTab, setActiveTab] = useState<string>('recommendations');

  useEffect(() => {
    // Set active tab based on query parameter
    const tabParam = searchParams.get('tab');
    if (tabParam && ['recommendations', 'roadmap', 'skills', 'projects', 'jobs', 'mentor', 'trends'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: 'recommendations', label: 'Career Recommendations' },
    { id: 'roadmap', label: 'Learning Roadmap' },
    { id: 'skills', label: 'Skill Assessment' },
    { id: 'projects', label: 'Portfolio Projects' },
    { id: 'jobs', label: 'Job Alignment' },
    { id: 'trends', label: 'Job Trends' },
    { id: 'mentor', label: 'AI Mentor' },
  ];

  return (
    <CareerProvider>
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {editMode === 'profile' ? 'Edit Your Profile' : 'Career Development Platform'}
        </h1>
        
        {editMode === 'profile' ? (
          <div className="max-w-3xl mx-auto">
            <CareerProfileForm initialSection={section} />
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="overflow-x-auto mb-6">
              <div className="flex space-x-2 min-w-max border-b border-gray-200 dark:border-gray-700">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="min-h-[600px]">
              {activeTab === 'recommendations' && (
                <div>
                  <CareerRecommendations />
                </div>
              )}
              
              {activeTab === 'roadmap' && (
                <div>
                  <DynamicRoadmap />
                </div>
              )}
              
              {activeTab === 'skills' && (
                <div>
                  <SkillAssessment />
                </div>
              )}
              
              {activeTab === 'projects' && (
                <div>
                  <PortfolioProjects />
                </div>
              )}
              
              {activeTab === 'jobs' && (
                <div>
                  <JobAlignmentEngine />
                </div>
              )}
              
              {activeTab === 'trends' && (
                <div>
                  <JobTrends />
                </div>
              )}
              
              {activeTab === 'mentor' && (
                <div className="max-w-3xl mx-auto">
                  <AiTutorChat />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </CareerProvider>
  );
};

export default CareerMapperPage; 