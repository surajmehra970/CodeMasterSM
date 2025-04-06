'use client';

import { useState, useEffect } from 'react';
import { fetchCourse, fetchCourseDay, fetchDayProblems } from '@/services/courseService';
import CourseContent from '@/components/CourseContent';
import { Course, CourseDay, Content, Problem } from '@/types/course';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DSACoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedDay, setSelectedDay] = useState<CourseDay | null>(null);
  const [dayContent, setDayContent] = useState<Content | null>(null);
  const [dayProblems, setDayProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourse() {
      try {
        setLoading(true);
        const courseData = await fetchCourse('dsa-course');
        setCourse(courseData);
        
        // Set the first day as selected by default if available
        if (courseData.days && courseData.days.length > 0) {
          setSelectedDay(courseData.days[0]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load course data');
        setLoading(false);
        console.error(err);
      }
    }
    
    loadCourse();
  }, []);

  useEffect(() => {
    async function loadDayContent() {
      if (!selectedDay) return;
      
      try {
        setLoading(true);
        // Fetch day content and problems in parallel
        const [content, problems] = await Promise.all([
          fetchCourseDay('dsa-course', selectedDay.id),
          fetchDayProblems('dsa-course', selectedDay.id)
        ]);
        
        setDayContent(content);
        setDayProblems(problems);
        setLoading(false);
      } catch (err) {
        setError('Failed to load day content');
        setLoading(false);
        console.error(err);
      }
    }
    
    loadDayContent();
  }, [selectedDay]);

  const handleDaySelect = (day: CourseDay) => {
    setSelectedDay(day);
  };

  if (loading && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Course not found</p>
        </div>
      </div>
    );
  }

  const courseDays = course.days || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="mt-2 text-lg text-gray-600">{course.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Course Schedule */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Course Schedule</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {courseDays.map((day) => (
                  <li key={day.id}>
                    <button
                      onClick={() => handleDaySelect(day)}
                      className={`w-full px-4 py-4 flex items-start hover:bg-gray-50 text-left ${
                        selectedDay?.id === day.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div>
                        <p className={`text-sm font-medium ${
                          selectedDay?.id === day.id ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          Day {day.dayNumber}: {day.title}
                        </p>
                        {day.topics && (
                          <p className="text-xs text-gray-500 mt-1">
                            {day.topics.join(', ')}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {loading && selectedDay ? (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : selectedDay && dayContent ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Day {selectedDay.dayNumber}: {selectedDay.title}
                  </h2>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        const currentIndex = courseDays.findIndex(d => d.id === selectedDay.id);
                        if (currentIndex > 0) {
                          handleDaySelect(courseDays[currentIndex - 1]);
                        }
                      }}
                      disabled={courseDays.findIndex(d => d.id === selectedDay.id) === 0}
                      className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = courseDays.findIndex(d => d.id === selectedDay.id);
                        if (currentIndex < courseDays.length - 1) {
                          handleDaySelect(courseDays[currentIndex + 1]);
                        }
                      }}
                      disabled={courseDays.findIndex(d => d.id === selectedDay.id) === courseDays.length - 1}
                      className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowRightIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              
              <CourseContent content={dayContent} problems={dayProblems} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">Select a day from the course schedule to view content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 