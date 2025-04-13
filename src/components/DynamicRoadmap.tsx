'use client';

import React, { useEffect, useState } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { DynamicRoadmap as DynamicRoadmapType, RoadmapWeek, DailyLearningPlan } from '@/types/career';
import { v4 as uuidv4 } from 'uuid';

const DynamicRoadmap: React.FC = () => {
  const { 
    userProfile, 
    selectedCareerTrack, 
    userRoadmap, 
    setUserRoadmap,
    isLoading,
    refreshRoadmap
  } = useCareerContext();

  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState<string | null>(null);

  useEffect(() => {
    // If we have a selected career track but no roadmap, generate one
    if (selectedCareerTrack && !userRoadmap && !isLoading) {
      refreshRoadmap();
    }
  }, [selectedCareerTrack, userRoadmap, isLoading, refreshRoadmap]);

  useEffect(() => {
    if (userRoadmap && userRoadmap.weeks.length > 0) {
      setActiveWeek(0);
    }
  }, [userRoadmap]);

  // Mock data for development - in production, this would come from the API
  useEffect(() => {
    if (!selectedCareerTrack || userRoadmap) return;

    // Create some mock data for testing
    const createMockRoadmap = () => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 90); // 12-week roadmap

      const weeks: RoadmapWeek[] = [];

      for (let w = 0; w < 12; w++) {
        const dailyPlans: DailyLearningPlan[] = [];

        for (let d = 0; d < 5; d++) {  // 5 days per week
          dailyPlans.push({
            id: uuidv4(),
            dayNumber: d + 1,
            title: `Day ${d + 1}: ${w === 0 ? 'Introduction to' : 'Advanced'} ${selectedCareerTrack.requiredSkills[d % selectedCareerTrack.requiredSkills.length]}`,
            description: `Learn the fundamentals of ${selectedCareerTrack.requiredSkills[d % selectedCareerTrack.requiredSkills.length]} through hands-on exercises and projects.`,
            estimatedHours: 2,
            resources: [
              {
                id: uuidv4(),
                type: 'Video',
                title: `${selectedCareerTrack.requiredSkills[d % selectedCareerTrack.requiredSkills.length]} Fundamentals`,
                url: '#',
                description: 'A comprehensive tutorial covering the basics',
                estimatedTime: 45 // minutes
              },
              {
                id: uuidv4(),
                type: 'Article',
                title: `Getting Started with ${selectedCareerTrack.requiredSkills[d % selectedCareerTrack.requiredSkills.length]}`,
                url: '#',
                description: 'A beginner-friendly introduction',
                estimatedTime: 20 // minutes
              }
            ],
            tasks: [
              {
                id: uuidv4(),
                title: `Complete the ${selectedCareerTrack.requiredSkills[d % selectedCareerTrack.requiredSkills.length]} tutorial`,
                completed: false,
                type: 'Exercise'
              },
              {
                id: uuidv4(),
                title: `Build a small project using ${selectedCareerTrack.requiredSkills[d % selectedCareerTrack.requiredSkills.length]}`,
                completed: false,
                type: 'Project'
              }
            ],
            completed: false
          });
        }

        weeks.push({
          id: uuidv4(),
          weekNumber: w + 1,
          learningObjectives: [
            `Understand the fundamentals of ${selectedCareerTrack.requiredSkills[w % selectedCareerTrack.requiredSkills.length]}`,
            `Build a project using ${selectedCareerTrack.requiredSkills[(w + 1) % selectedCareerTrack.requiredSkills.length]}`,
            `Complete a quiz on ${selectedCareerTrack.requiredSkills[(w + 2) % selectedCareerTrack.requiredSkills.length]}`
          ],
          dailyPlans,
          assessments: ['quiz-1', 'coding-problem-1'],
          project: w % 3 === 0 ? `project-${w}` : undefined
        });
      }

      const mockRoadmap: DynamicRoadmapType = {
        id: uuidv4(),
        userId: userProfile?.id || 'temp-user-id',
        targetCareerTrack: selectedCareerTrack.id,
        startDate,
        endDate,
        weeks,
        lastUpdated: new Date()
      };

      setUserRoadmap(mockRoadmap);
    };

    createMockRoadmap();
  }, [selectedCareerTrack, userRoadmap, setUserRoadmap, userProfile]);

  // Mark a task as completed
  const toggleTaskCompletion = (weekIndex: number, dayId: string, taskId: string) => {
    if (!userRoadmap) return;

    const updatedRoadmap = { ...userRoadmap };
    const week = updatedRoadmap.weeks[weekIndex];
    const dayIndex = week.dailyPlans.findIndex(day => day.id === dayId);
    
    if (dayIndex === -1) return;
    
    const day = week.dailyPlans[dayIndex];
    const taskIndex = day.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) return;
    
    // Toggle task completion status
    day.tasks[taskIndex].completed = !day.tasks[taskIndex].completed;
    
    // Update day completion status based on all tasks
    day.completed = day.tasks.every(task => task.completed);
    
    setUserRoadmap(updatedRoadmap);
  };

  if (!selectedCareerTrack) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Learning Roadmap</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Please select a career track to view your personalized learning roadmap.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Generating Your {selectedCareerTrack.title} Roadmap
        </h2>
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-gray-600 dark:text-gray-400">
            We're creating your personalized learning journey...
          </p>
        </div>
      </div>
    );
  }

  if (!userRoadmap) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Learning Roadmap</h2>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg">
          <p className="text-red-700 dark:text-red-300">
            Failed to generate your roadmap. Please try again later.
          </p>
        </div>
        <button
          onClick={refreshRoadmap}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentWeek = activeWeek !== null ? userRoadmap.weeks[activeWeek] : null;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {selectedCareerTrack.title} Learning Roadmap
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last updated: {new Date(userRoadmap.lastUpdated).toLocaleDateString()}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Weeks Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Roadmap Timeline</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {userRoadmap.weeks.map((week, index) => (
                <button
                  key={week.id}
                  onClick={() => {
                    setActiveWeek(index);
                    setActiveDay(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${
                    activeWeek === index
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="font-medium">Week {week.weekNumber}</div>
                  <div className="text-xs truncate">
                    {week.learningObjectives[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Week Content */}
        <div className="lg:w-3/4">
          {currentWeek && (
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Week {currentWeek.weekNumber} Overview
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Learning Objectives</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    {currentWeek.learningObjectives.map((objective, i) => (
                      <li key={i}>{objective}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {activeDay ? (
                // Display the selected day's content
                (() => {
                  const day = currentWeek.dailyPlans.find(d => d.id === activeDay);
                  if (!day) return null;

                  return (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {day.title}
                        </h3>
                        <button
                          onClick={() => setActiveDay(null)}
                          className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Back to Week View
                        </button>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6">{day.description}</p>

                      <div className="mb-6">
                        <h4 className="font-medium text-gray-800 dark:text-white mb-3">Learning Resources</h4>
                        <div className="space-y-3">
                          {day.resources.map(resource => (
                            <div key={resource.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                                      {resource.type}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                      {resource.estimatedTime} min
                                    </span>
                                  </div>
                                  <h5 className="font-medium text-gray-800 dark:text-white">{resource.title}</h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
                                </div>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="ml-4 px-3 py-1 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 text-sm rounded"
                                >
                                  View
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white mb-3">Tasks</h4>
                        <div className="space-y-2">
                          {day.tasks.map(task => (
                            <div
                              key={task.id}
                              className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm"
                            >
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => activeWeek !== null && toggleTaskCompletion(activeWeek, day.id, task.id)}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <div className="ml-3 flex-grow">
                                <span className={`font-medium ${
                                  task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-white'
                                }`}>
                                  {task.title}
                                </span>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  Type: {task.type}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                // Display week's daily plans
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white mb-3">Daily Learning Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {currentWeek.dailyPlans.map(day => (
                      <div
                        key={day.id}
                        className={`border ${
                          day.completed
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                        } rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
                        onClick={() => setActiveDay(day.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800 dark:text-white">Day {day.dayNumber}</h4>
                          {day.completed && (
                            <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{day.title}</p>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{day.estimatedHours} hours</span>
                          <span>{day.tasks.filter(t => t.completed).length}/{day.tasks.length} tasks done</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {currentWeek.project && (
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 mt-6">
                      <h3 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Week Project</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Build a project that demonstrates your understanding of this week's concepts.
                      </p>
                      <button
                        className="mt-3 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md"
                      >
                        View Project Details
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
        <div className="flex justify-between items-center">
          <button
            onClick={refreshRoadmap}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Roadmap
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md"
          >
            Export Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicRoadmap; 