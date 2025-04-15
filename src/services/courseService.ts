import { Course, Content, Problem, CourseDay, Day, Topic, Section, CodeExample, HomeworkProblem, QuizQuestion } from '../types/course';
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
function convertDayToStandardFormat(day: Day): CourseDay {
  return {
    id: `day-${day.day}`,
    dayNumber: day.day,
    title: day.topics[0]?.title || `Day ${day.day}`,
    description: day.topics[0]?.description || '',
    topics: day.topics.map((topic: Topic) => topic.title),
    estimatedHours: 2
  };
}

// Helper function to get all days from local data
function getLocalDays(): CourseDay[] {
  const days: CourseDay[] = [];
  
  // Get days from dsaCourse structure
  if (dsaCourse.months) {
    for (const month of dsaCourse.months) {
      if (month.weeks) {
        for (const week of month.weeks) {
          if (week.days) {
            for (const day of week.days) {
              days.push(convertDayToStandardFormat(day));
            }
          }
        }
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
    if (dsaCourse.months) {
      for (const month of dsaCourse.months) {
        if (month.weeks) {
          for (const week of month.weeks) {
            if (week.days) {
              for (const day of week.days) {
                if (day.day === dayNumber && day.topics && day.topics.length > 0) {
                  const topic = day.topics[0];
                  if (topic && topic.content) {
                    const content = topic.content;
                    
                    if (!content) throw new Error(`Day content with ID ${dayId} not found`);
                    
                    return {
                      introduction: content.introduction || "",
                      learningObjectives: content.learningObjectives.map((obj: string) => String(obj)),
                      sections: content.sections.map((section: Section) => ({
                        title: section.title || "",
                        content: section.content || "",
                        codeExamples: section.codeExamples?.map((ex: CodeExample) => ({
                          language: ex.language || "",
                          code: ex.code || "",
                          explanation: ex.explanation
                        })) || []
                      })),
                      homework: content.homework?.map((hw: HomeworkProblem) => ({
                        id: hw.id || "",
                        question: hw.question || "",
                        solution: hw.solution,
                        codeExample: hw.codeExample ? {
                          language: hw.codeExample.language || "",
                          code: hw.codeExample.code || "",
                          explanation: hw.codeExample.explanation
                        } : undefined
                      })) || [],
                      quiz: content.quiz?.map((q: QuizQuestion) => ({
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
    
    if (dsaCourse.months) {
      for (const month of dsaCourse.months) {
        if (month.weeks) {
          for (const week of month.weeks) {
            if (week.days) {
              for (const day of week.days) {
                if (day.day === dayNumber && day.topics && day.topics.length > 0) {
                  const topic = day.topics[0];
                  return topic && topic.problems ? topic.problems : [];
                }
              }
            }
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
  try {
    const course = await fetchCourse(courseId);
    
    // We need to ensure days are properly typed as CourseDay[]
    if (!course.days || course.days.length === 0) {
      const days = getLocalDays();
      return {
        ...course,
        days
      };
    }
    
    // Otherwise, if days exist, make sure they match the CourseDay type
    return {
      ...course,
      days: course.days.map(day => ({
        id: day.id,
        dayNumber: day.dayNumber,
        title: day.title,
        description: day.description || '',
        topics: day.topics || [],
        estimatedHours: day.estimatedHours || 2
      }))
    };
  } catch (error) {
    console.error('Error fetching full course:', error);
    throw error;
  }
}

/**
 * Fetches course metadata without the full hierarchy
 */
export async function fetchCourseList(): Promise<Course[]> {
  try {
    const courseData = await fetchCourse('dsa-course');
    return [courseData];
  } catch (error) {
    console.error('Error fetching course list:', error);
    return [];
  }
}

/**
 * Fetches specific day with its topics
 */
export async function fetchDay(dayId: string): Promise<Day | null> {
  try {
    const dayNumber = parseInt(dayId.replace('day-', ''));
    
    if (dsaCourse.months) {
      for (const month of dsaCourse.months) {
        if (month.weeks) {
          for (const week of month.weeks) {
            if (week.days) {
              for (const day of week.days) {
                if (day.day === dayNumber) {
                  return day;
                }
              }
            }
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
 * Fetches a topic using local data
 */
export async function fetchTopic(courseId: string, topicId: string): Promise<Topic | null> {
  try {
    // Implementation will use the topicId parameter correctly
    console.log(`Fetching topic ${topicId} for course ${courseId}`);
    
    // Look for the topic in the dsaCourse data structure
    if (dsaCourse.months) {
      for (const month of dsaCourse.months) {
        if (month.weeks) {
          for (const week of month.weeks) {
            if (week.days) {
              for (const day of week.days) {
                if (day.topics && day.topics.length > 0) {
                  const topic = day.topics.find(t => t.id === topicId);
                  if (topic) {
                    return topic;
                  }
                }
              }
            }
          }
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
}

// Helper function to flatten sections
function flattenSections(obj: Section): Section[] {
  // Since subsections doesn't exist in the Section interface, we'll just return the object as an array
  return [obj];
}

export function findSectionById(section: Section, id: string): Section | null {
  const sections = flattenSections(section);
  const foundSection = sections.find(s => s.title === id); // Using title instead of id as per Section interface
  return foundSection || null;
}

export function findExampleById(ex: CodeExample, _: string): CodeExample | null {
  // CodeExample doesn't have an id property based on the interface
  // Fallback implementation - we ignore the id parameter since it's not used
  return ex;
}

export function findHomeworkById(hw: HomeworkProblem, id: string): HomeworkProblem | null {
  if (hw.id === id) {
    return hw;
  }
  return null;
}

export function findQuestionById(q: QuizQuestion, id: string): QuizQuestion | null {
  if (q.id === id) {
    return q;
  }
  return null;
}

export function fetchAllTopics(): Topic[] {
  const topics: Topic[] = [];
  
  if (!dsaCourse.months) {
    return topics;
  }

  dsaCourse.months.forEach((month) => {
    if (!month.weeks) return;
    
    month.weeks.forEach((week) => {
      if (!week.days) return;
      
      week.days.forEach((day) => {
        if (!day.topics) return;
        
        day.topics.forEach((topic) => {
          topics.push(topic);
        });
      });
    });
  });

  return topics;
}

export function fetchTopicById(id: string): Topic | null {
  if (!dsaCourse.months) {
    return null;
  }

  let foundTopic: Topic | null = null;

  dsaCourse.months.some((month) => {
    if (!month.weeks) return false;
    
    return month.weeks.some((week) => {
      if (!week.days) return false;
      
      return week.days.some((day) => {
        if (!day.topics) return false;
        
        return day.topics.some((topic) => {
          if (topic.id === id) {
            foundTopic = topic;
            return true;
          }
          return false;
        });
      });
    });
  });

  return foundTopic;
} 