import { db } from '../src/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { dsaCourse } from '../src/data/dsaCourse';

// Function to sanitize data for Firebase
function sanitizeData(obj: any): any {
  if (obj === null || obj === undefined) {
    return null;
  }
  
  if (typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeData(item));
  }
  
  // Convert special objects like Date to something Firebase can store
  if (obj instanceof Date) {
    return obj.toISOString();
  }
  
  // Handle each property of the object
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    // Skip functions and undefined values
    if (typeof value === 'function' || value === undefined) {
      continue;
    }
    
    // Recursively sanitize the value
    result[key] = sanitizeData(value);
  }
  
  return result;
}

// Mapping between old and new data structure
async function migrateDSACourseData() {
  console.log('Starting migration of DSA course data to Firebase...');
  
  try {
    // Create the course document
    const courseId = 'dsa-course';
    const courseRef = doc(db, 'courses', courseId);
    
    // Extract days from the course structure
    const days = [];
    
    for (const month of dsaCourse.months) {
      for (const week of month.weeks) {
        for (const day of week.days) {
          // Create a day entry for the course
          days.push({
            id: `day-${day.day}`,
            dayNumber: day.day,
            title: day.topics[0]?.title || `Day ${day.day}`,
            description: day.topics[0]?.description || '',
            topics: day.topics.map(topic => topic.title),
            estimatedHours: 2 // Default estimated hours
          });
          
          // For each day, create a day document with content
          if (day.topics.length > 0) {
            const topic = day.topics[0];
            const dayId = `day-${day.day}`;
            
            // Create the problems document
            if (topic.problems && topic.problems.length > 0) {
              try {
                const problemsDocRef = doc(db, 'courses', courseId, 'problems', dayId);
                const sanitizedProblems = sanitizeData({
                  dayId: dayId,
                  problems: topic.problems
                });
                
                await setDoc(problemsDocRef, sanitizedProblems);
                console.log(`Migrated ${topic.problems.length} LeetCode problems for day ${day.day}`);
              } catch (err) {
                console.error(`Error saving problems for day ${day.day}:`, err);
              }
            }
            
            // Create the content document
            if (topic.content) {
              try {
                const content = topic.content;
                const dayDocRef = doc(db, 'courses', courseId, 'days', dayId);
                
                const sanitizedContent = sanitizeData({
                  id: dayId,
                  dayId: dayId,
                  introduction: content.introduction,
                  learningObjectives: content.learningObjectives,
                  sections: content.sections,
                  homework: content.homework || [],
                  quiz: content.quiz || []
                });
                
                await setDoc(dayDocRef, sanitizedContent);
                console.log(`Migrated content for day ${day.day}`);
              } catch (err) {
                console.error(`Error saving content for day ${day.day}:`, err);
              }
            }
          }
        }
      }
    }
    
    // Create the course document with days
    try {
      const sanitizedCourse = sanitizeData({
        id: courseId,
        title: 'Data Structures & Algorithms',
        description: 'Master the fundamentals of Data Structures and Algorithms to excel in technical interviews and improve your problem-solving skills.',
        imageUrl: '/images/courses/dsa.jpg',
        totalDays: days.length,
        difficulty: 'Intermediate',
        tags: ['DSA', 'Algorithms', 'Programming', 'Interviews'],
        days: days,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      await setDoc(courseRef, sanitizedCourse);
      console.log('Course data migrated successfully!');
    } catch (err) {
      console.error('Error saving course data:', err);
    }
    
  } catch (error) {
    console.error('Error migrating course data:', error);
  }
}

// Run the migration
migrateDSACourseData().then(() => {
  console.log('Migration completed');
  process.exit(0);
}).catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
}); 