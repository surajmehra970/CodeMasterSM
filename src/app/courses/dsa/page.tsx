'use client';

import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchCourse, fetchCourseDay, fetchDayProblems } from '@/services/courseService';
import CourseContent from '@/components/CourseContent';
import { Course, CourseDay, Content, Problem } from '@/types/course';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import courseContentMap, { dayToTopicMap, getContentByDay } from '@/data/courseContent';

// Define types for our organized structure
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DayEntry {
  id: string;
  title: string;
  day: number;
  dayNumber: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any;
}

interface Week {
  id: string;
  title: string;
  days: CourseDay[];
}

interface Month {
  id: string;
  title: string;
  target: string;
  weeks: Week[];
}

// Helper function to get local day content
function getLocalDayContent(dayId: string): Content | null {
  const dayNumber = parseInt(dayId.replace('day-', ''));
  
  // Try to get content from our new content organization
  const content = getContentByDay(dayNumber);
  
  if (content) {
    return content;
  }
  
  return null;
}

// Helper function to convert day object to standard format
function convertDayToStandardFormat(dayNumber: number): CourseDay {
  // Use the topic from the dayToTopicMap if available
  const topic = dayToTopicMap[dayNumber] || `Day ${dayNumber}`;
  
  return {
    id: `day-${dayNumber}`,
    dayNumber: dayNumber,
    title: topic,
    description: '',
    topics: [topic],
    estimatedHours: 2
  };
}

// Helper function to get all days from course content
function getAllDays(): CourseDay[] {
  const days: CourseDay[] = [];
  
  // Get all days from the dayToTopicMap
  for (const dayNumber in dayToTopicMap) {
    const day = convertDayToStandardFormat(Number(dayNumber));
    days.push(day);
  }
  
  // Sort days by day number
  days.sort((a, b) => a.dayNumber - b.dayNumber);
  
  return days;
}

// Helper function to get local course data
function getLocalCourse(): Course {
  // Get days from course content map
  const days = getAllDays();
  
  return {
    id: 'dsa-course',
    title: 'Data Structures & Algorithms',
    description: 'Master the fundamentals of Data Structures and Algorithms to excel in technical interviews and improve your problem-solving skills.',
    imageUrl: '/images/courses/dsa.jpg',
    totalDays: days.length,
    difficulty: 'Intermediate',
    tags: ['DSA', 'Algorithms', 'Programming', 'Interviews'],
    days: days,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// Helper function to get day problems
function getLocalDayProblems(dayId: string): Problem[] {
  const dayNumber = parseInt(dayId.replace('day-', ''));
  const content = getContentByDay(dayNumber);
  
  if (content && content.homework) {
    return content.homework.map(hw => ({
      id: hw.id,
      title: hw.question,
      name: hw.question,
      question: hw.question,
      difficulty: 'Medium',
      solution: hw.solution || ''
    }));
  }
  
  return [];
}

export default function DSACoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedDay, setSelectedDay] = useState<CourseDay | null>(null);
  const [dayContent, setDayContent] = useState<Content | null>(null);
  const [dayProblems, setDayProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>({});
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Function to toggle month expansion
  const toggleMonth = (monthIndex: number) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthIndex]: !prev[monthIndex]
    }));
  };

  // Function to toggle week expansion
  const toggleWeek = (weekKey: string) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekKey]: !prev[weekKey]
    }));
  };

  // Helper function to organize days into months and weeks
  const organizeDaysIntoMonthsAndWeeks = (days: CourseDay[]): Month[] => {
    const sortedDays = [...days].sort((a, b) => a.dayNumber - b.dayNumber);
    
    const getWeekDays = (range: [number, number]) => {
      const [start, end] = range;
      const daysInRange = sortedDays.filter(day => day.dayNumber >= start && day.dayNumber <= end);
      return daysInRange;
    };
    
    // Define exact structure with day assignments
    const organizedMonths = [
      {
        id: "month-1",
        title: "Foundations & Problem-Solving Basics",
        target: "Learn Basics + Solve 100 Problems",
        weeks: [
          { 
            id: "week-1", 
            title: "Math, Arrays & Strings", 
            days: getWeekDays([1, 7])
          },
          { 
            id: "week-2", 
            title: "Linked List, Stack, Queue", 
            days: getWeekDays([8, 14])
          },
          { 
            id: "week-3", 
            title: "Sorting & Searching", 
            days: getWeekDays([15, 20])
          }
        ]
      },
      {
        id: "month-2",
        title: "Trees, Graphs & Dynamic Programming",
        target: "Solve 150 Problems + Improve Speed",
        weeks: [
          { 
            id: "week-4", 
            title: "Trees (BST & Binary Trees)", 
            days: getWeekDays([21, 25])
          },
          { 
            id: "week-5", 
            title: "Graphs (BFS, DFS, Dijkstra)", 
            days: getWeekDays([26, 30])
          },
          { 
            id: "week-6", 
            title: "Dynamic Programming Basics", 
            days: getWeekDays([31, 35])
          }
        ]
      },
      {
        id: "month-3",
        title: "Advanced DSA & Interview-Style Problem Solving",
        target: "Solve 200 Problems + Learn System Design",
        weeks: [
          { 
            id: "week-7", 
            title: "Advanced Graph Algorithms", 
            days: getWeekDays([36, 39])
          },
          { 
            id: "week-8", 
            title: "Advanced DP (LIS, LCS, Matrix DP)", 
            days: getWeekDays([40, 44])
          }
        ]
      },
      {
        id: "month-4",
        title: "Mock Interviews & System Design",
        target: "Mock Interviews & Speed Optimization",
        weeks: [
          { 
            id: "week-9", 
            title: "Interview Preparation (Company-Specific Questions)", 
            days: getWeekDays([45, 47])
          },
          { 
            id: "week-10", 
            title: "System Design Basics", 
            days: getWeekDays([48, 51])
          }
        ]
      }
    ];
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    organizedMonths.forEach((month: Month, i: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      month.weeks.forEach((week: Week, j: number) => {
        // Sort days within weeks by day number
        week.days.sort((a, b) => a.dayNumber - b.dayNumber);
      });
    });
    
    return organizedMonths;
  };

  useEffect(() => {
    const loadCourseData = async () => {
      setLoading(true);
      
      try {
        // Get local course data using our helper function
        const courseData = getLocalCourse();
        setCourse(courseData);
        
        // Initialize with the first day
        if (courseData && courseData.days && courseData.days.length > 0) {
          setSelectedDay(courseData.days[0] || null);
        }
        
        // Initialize expanded months/weeks
        const monthsExpanded: Record<number, boolean> = {};
        const weeksExpanded: Record<string, boolean> = {};
        
        // Default expand the first month and its first week
        monthsExpanded[0] = true;
        weeksExpanded['month-1-week-1'] = true;
        
        setExpandedMonths(monthsExpanded);
        setExpandedWeeks(weeksExpanded);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars  
      } catch (_) {
        setError('Failed to load course data.');
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseData();
  }, []);

  useEffect(() => {
    if (selectedDay && dayContent) {
      const contentEl = document.querySelector('.course-content-wrapper');
      if (contentEl) {
        setContentHeight(contentEl.scrollHeight);
      }
    }
  }, [selectedDay, dayContent]);

  useEffect(() => {
    if (!selectedDay) return;
    
    const loadDayContent = async () => {
      if (!selectedDay) return;
      
      try {
        // Load content for the selected day
        const content = getLocalDayContent(selectedDay.id);
        setDayContent(content);
        
        // Load problems for the selected day
        const problems = getLocalDayProblems(selectedDay.id);
        setDayProblems(problems);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        console.error('Error loading day content');
        setError('Failed to load day content');
      } finally {
        setLoading(false);
      }
    };
    
    setLoading(true);
    loadDayContent();
  }, [selectedDay]);

  const handleDaySelect = (day: CourseDay | undefined) => {
    if (!day) return; // Skip if day is undefined
    if (day.id === selectedDay?.id) return; // Don't reload if it's the same day
    
    setLoading(true);
    // Use setTimeout to ensure loading state is applied before changing selected day
    setTimeout(() => {
      setSelectedDay(day);
    }, 10);
  };

  if (loading && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (_error && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{_error}</p>
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
  const organizedMonths = organizeDaysIntoMonthsAndWeeks(courseDays);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{course.title}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">{course.description}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - Course Schedule */}
        <div className="w-full md:w-72 flex-shrink-0">
          <div className="bg-white dark:bg-dark rounded-xl shadow-card overflow-hidden sticky top-24">
            <div className="px-4 py-4 sm:px-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Course Schedule
              </h3>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
              {organizedMonths.map((month: Month, monthIndex: number) => (
                <div key={month.id} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                  <div className="py-3 px-4">
                    <button
                      onClick={() => toggleMonth(monthIndex)}
                      className="flex items-center w-full text-left font-semibold text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      <span className={`text-primary transition-transform duration-200 ${expandedMonths[monthIndex] ? 'rotate-90' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div className="ml-2">
                        <div>Month {monthIndex + 1}: {month.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">{month.target}</div>
                      </div>
                    </button>
                  </div>
                  
                  {expandedMonths[monthIndex] && (
                    <div className="ml-4 border-l-2 border-gray-100 dark:border-gray-800 pl-4 pb-3 pr-2">
                      {month.weeks.map((week: Week, weekIndex: number) => (
                        <div key={week.id} className="mt-1">
                          <div className="py-2">
                            <button
                              onClick={() => toggleWeek(`month-${monthIndex+1}-week-${weekIndex+1}`)}
                              className="flex items-center w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                              <span className={`text-primary transition-transform duration-200 ${expandedWeeks[`month-${monthIndex+1}-week-${weekIndex+1}`] ? 'rotate-90' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                              <span className="ml-2">Week {weekIndex + 1}: {week.title}</span>
                            </button>
                          </div>
                          
                          {expandedWeeks[`month-${monthIndex+1}-week-${weekIndex+1}`] && (
                            <div className="ml-4 border-l-2 border-gray-100 dark:border-gray-800 pl-4 space-y-1 py-1">
                              {week.days.map((day: CourseDay, 
                                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                              dayIndex: number) => (
                                <div 
                                  key={day.id}
                                  className={`py-2 px-3 cursor-pointer rounded-md transition-all ${
                                    selectedDay?.id === day.id 
                                      ? 'bg-primary text-white font-medium shadow-sm' 
                                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                                  }`}
                                  onClick={() => handleDaySelect(day)}
                                >
                                  <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 ${
                                      selectedDay?.id === day.id 
                                        ? 'bg-white text-primary' 
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}>
                                      {day.dayNumber}
                                    </div>
                                    <div className="truncate">{dayToTopicMap[day.dayNumber] || day.title}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-dark rounded-xl shadow-card overflow-hidden">
            {loading && selectedDay ? (
              <div className="p-8 flex items-center justify-center">
                <div className="relative h-12 w-12">
                  <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-primary/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-primary rounded-full animate-spin"></div>
                </div>
              </div>
            ) : selectedDay && dayContent ? (
              <>
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Day {selectedDay.dayNumber}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedDay.title}
                    </h2>
                    {selectedDay.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{selectedDay.description}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        const currentIndex = courseDays.findIndex(d => d.id === selectedDay.id);
                        if (currentIndex > 0) {
                          handleDaySelect(courseDays[currentIndex - 1]);
                        }
                      }}
                      disabled={courseDays.findIndex(d => d.id === selectedDay.id) === 0}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 
                                  hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      title="Previous Day"
                    >
                      <ArrowLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        const currentIndex = courseDays.findIndex(d => d.id === selectedDay.id);
                        if (currentIndex < courseDays.length - 1) {
                          handleDaySelect(courseDays[currentIndex + 1]);
                        }
                      }}
                      disabled={courseDays.findIndex(d => d.id === selectedDay.id) === courseDays.length - 1}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300
                                  hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      title="Next Day"
                    >
                      <ArrowRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <CourseContent content={dayContent} problems={dayProblems} />
              </>
            ) : (
              <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Select a day from the course schedule to view content</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Choose from the sidebar to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 