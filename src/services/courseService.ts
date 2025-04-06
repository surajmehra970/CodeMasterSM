import { db } from './firebase';
import { 
  collection, doc, setDoc, getDoc,
  getDocs, query, where, writeBatch,
  serverTimestamp, orderBy
} from 'firebase/firestore';
import { 
  Course, Month, Week, Day, 
  Topic, Problem, Content, CourseDay
} from '../types/course';

const COURSE_COLLECTION = 'courses';
const MONTH_COLLECTION = 'months';
const WEEK_COLLECTION = 'weeks';
const DAY_COLLECTION = 'days';
const TOPIC_COLLECTION = 'topics';

/**
 * Fetches a course by ID
 */
export async function fetchCourse(courseId: string): Promise<Course> {
  const courseDoc = await getDoc(doc(db, 'courses', courseId));
  
  if (!courseDoc.exists()) {
    throw new Error(`Course with ID ${courseId} not found`);
  }
  
  return courseDoc.data() as Course;
}

/**
 * Fetches a specific day's content from a course
 */
export async function fetchCourseDay(courseId: string, dayId: string): Promise<Content> {
  const contentDoc = await getDoc(doc(db, 'courses', courseId, 'days', dayId));
  
  if (!contentDoc.exists()) {
    throw new Error(`Day content with ID ${dayId} not found`);
  }
  
  return contentDoc.data() as Content;
}

/**
 * Fetches LeetCode problems for a specific day
 */
export async function fetchDayProblems(courseId: string, dayId: string): Promise<Problem[]> {
  try {
    const problemsDoc = await getDoc(doc(db, 'courses', courseId, 'problems', dayId));
    
    if (!problemsDoc.exists()) {
      return [];
    }
    
    const data = problemsDoc.data();
    return data.problems || [];
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
  
  // Now get all days for this course
  const daysSnapshot = await getDocs(collection(db, 'courses', courseId, 'days'));
  const days = daysSnapshot.docs.map(doc => ({ 
    id: doc.id,
    ...doc.data()
  }));
  
  return {
    ...course,
    days
  };
}

// Fetch only course metadata without the full hierarchy
export async function fetchCourseList(): Promise<Course[]> {
  try {
    const coursesSnapshot = await getDocs(collection(db, COURSE_COLLECTION));
    return coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Course));
  } catch (error) {
    console.error('Error fetching course list:', error);
    return [];
  }
}

// Fetch specific day with its topics
export async function fetchDay(dayId: string): Promise<Day | null> {
  try {
    const dayRef = doc(db, DAY_COLLECTION, dayId);
    const dayDoc = await getDoc(dayRef);
    
    if (!dayDoc.exists()) {
      return null;
    }
    
    const day = dayDoc.data() as Day;
    
    // Get topics for this day
    const topicsQuery = query(
      collection(db, TOPIC_COLLECTION),
      where('dayId', '==', dayId),
      orderBy('order')
    );
    const topicsSnapshot = await getDocs(topicsQuery);
    day.topics = topicsSnapshot.docs.map(doc => doc.data() as Topic);
    
    return day;
  } catch (error) {
    console.error('Error fetching day:', error);
    return null;
  }
}

// Fetch specific topic with full content
export async function fetchTopic(topicId: string): Promise<Topic | null> {
  try {
    const topicRef = doc(db, TOPIC_COLLECTION, topicId);
    const topicDoc = await getDoc(topicRef);
    
    if (!topicDoc.exists()) {
      return null;
    }
    
    return topicDoc.data() as Topic;
  } catch (error) {
    console.error('Error fetching topic:', error);
    return null;
  }
} 