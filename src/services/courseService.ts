import { Course, Content, Problem, CourseDay } from '../types/course';
import courseContentMap, { dayToTopicMap, getContentByDay } from '../data/courseContent';
import { dsaCourse } from '../data/dsaCourse';

// Helper function to create day entries from courseContentMap
function getDaysFromContentMap(): CourseDay[] {
  const days: CourseDay[] = [];
  const contentDayNumbers = Object.keys(courseContentMap).map(key => parseInt(key));
  
  // Sort day numbers for consistent order
  contentDayNumbers.sort((a, b) => a - b);
  
  for (const dayNumber of contentDayNumbers) {
    const title = dayToTopicMap[dayNumber] || `Day ${dayNumber}`;
    days.push({
      id: `day-${dayNumber}`,
      dayNumber: dayNumber,
      title: title,
      description: '',
      topics: [title],
      estimatedHours: 2
    });
  }
  
  return days;
}

// Helper function to convert day object to standard format
function convertDayToStandardFormat(day: any): CourseDay {
  return {
    id: `day-${day.day}`,
    dayNumber: day.day,
    title: day.topics[0]?.title || `Day ${day.day}`,
    description: day.topics[0]?.description || '',
    topics: day.topics.map((topic: any) => topic.title),
    estimatedHours: 2
  };
}

// Helper function to get all days from local data
function getLocalDays(): CourseDay[] {
  const days: CourseDay[] = [];
  
  // Get days from dsaCourse structure
  for (const month of dsaCourse.months) {
    for (const week of month.weeks) {
      for (const day of week.days) {
        days.push(convertDayToStandardFormat(day));
      }
    }
  }
  
  // Get days from content map
  const contentDays = getDaysFromContentMap();
  
  // Combine both sources without duplicates
  const allDays = new Map<string, CourseDay>();
  
  // First add days from dsaCourse
  days.forEach(day => {
    allDays.set(day.id, day);
  });
  
  // Then add/override with days from content map
  contentDays.forEach(day => {
    allDays.set(day.id, day);
  });
  
  // Convert back to array and sort
  const result = Array.from(allDays.values()).sort((a, b) => a.dayNumber - b.dayNumber);
  
  return result;
}

/**
 * Fetches a course by ID using local data
 */
export async function fetchCourse(courseId: string): Promise<Course> {
  try {
    if (courseId === 'dsa-course') {
      const days = getLocalDays();
      
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
    
    throw new Error(`Course with ID ${courseId} not found`);
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
}

/**
 * Fetches a specific day's content from a course using local data
 */
export async function fetchCourseDay(courseId: string, dayId: string): Promise<Content> {
  try {
    if (courseId !== 'dsa-course') {
      throw new Error(`Course with ID ${courseId} not found`);
    }
    
    const dayNumber = parseInt(dayId.replace('day-', ''));
    
    // First try to get content from courseContentMap (highest priority)
    const content = getContentByDay(dayNumber);
    
    if (content) {
      return content;
    }
    
    // Fallback to searching in dsaCourse structure
    for (const month of dsaCourse.months) {
      for (const week of month.weeks) {
        for (const day of week.days) {
          if (day.day === dayNumber && day.topics.length > 0 && day.topics[0].content) {
            const topic = day.topics[0];
            const content = topic.content;
            
            if (!content) throw new Error(`Day content with ID ${dayId} not found`);
            
            return {
              introduction: content.introduction || "",
              learningObjectives: content.learningObjectives.map(obj => String(obj)),
              sections: content.sections.map(section => ({
                title: section.title || "",
                content: section.content || "",
                codeExamples: section.codeExamples?.map(ex => ({
                  language: ex.language || "",
                  code: ex.code || "",
                  explanation: ex.explanation
                })) || []
              })),
              homework: content.homework?.map(hw => ({
                id: hw.id || "",
                question: hw.question || "",
                solution: hw.solution,
                codeExample: hw.codeExample ? {
                  language: hw.codeExample.language || "",
                  code: hw.codeExample.code || "",
                  explanation: hw.codeExample.explanation
                } : undefined
              })) || [],
              quiz: content.quiz?.map(q => ({
                id: q.id || "",
                question: q.question || "",
                options: q.options || [],
                correctAnswer: q.correctAnswer || 0,
                explanation: q.explanation || ""
              })) || []
            };
          }
        }
      }
    }
    
    throw new Error(`Day content with ID ${dayId} not found`);
  } catch (error) {
    console.error('Error fetching day content:', error);
    throw error;
  }
}

/**
 * Fetches LeetCode problems for a specific day using local data
 */
export async function fetchDayProblems(courseId: string, dayId: string): Promise<Problem[]> {
  try {
    if (courseId !== 'dsa-course') {
      return [];
    }
    
    const dayNumber = parseInt(dayId.replace('day-', ''));
    
    for (const month of dsaCourse.months) {
      for (const week of month.weeks) {
        for (const day of week.days) {
          if (day.day === dayNumber && day.topics.length > 0) {
            return day.topics[0].problems || [];
          }
        }
      }
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching day problems:', error);
    return [];
  }
}

/**
 * Fetches a course by ID with all related data (days and their content)
 */
export async function fetchFullCourse(courseId: string): Promise<Course> {
  const course = await fetchCourse(courseId);
  return course;
}

/**
 * Fetches course metadata without the full hierarchy
 */
export async function fetchCourseList(): Promise<Course[]> {
  try {
    const dsaCourse = await fetchCourse('dsa-course');
    return [dsaCourse];
  } catch (error) {
    console.error('Error fetching course list:', error);
    return [];
  }
}

/**
 * Fetches specific day with its topics
 */
export async function fetchDay(dayId: string): Promise<any | null> {
  try {
    const dayNumber = parseInt(dayId.replace('day-', ''));
    
    for (const month of dsaCourse.months) {
      for (const week of month.weeks) {
        for (const day of week.days) {
          if (day.day === dayNumber) {
            return day;
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching day:', error);
    return null;
  }
}

/**
 * Fetches specific topic with full content
 */
export async function fetchTopic(topicId: string): Promise<any | null> {
  try {
    // Parse the topicId to determine which day and topic to fetch
    return null;
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
} 