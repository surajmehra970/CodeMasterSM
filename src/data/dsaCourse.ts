import { Course } from '../types/course';
import { dayToTopicMap } from './courseContent';

/**
 * Main DSA course data structure
 */
export const dsaCourse: Course = {
  id: 'dsa-course',
  title: 'Data Structures and Algorithms',
  description: 'A comprehensive course on data structures and algorithms',
  totalDays: Object.keys(dayToTopicMap).length,
  difficulty: 'Intermediate',
  tags: ['DSA', 'Algorithms', 'Programming'],
  days: Object.keys(dayToTopicMap).map(day => ({
    id: `day-${day}`,
    dayNumber: parseInt(day),
    title: `Day ${day}`,
    description: `Content for Day ${day}`,
    estimatedHours: 2,
    topics: [dayToTopicMap[parseInt(day)] || `Day ${day} Topic`]
  }))
}; 