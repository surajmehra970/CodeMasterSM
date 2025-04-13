export interface CareerTrack {
  id: string;
  title: string;
  description: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  averageSalary: string;
  requiredSkills: string[];
  recommendedCourses: string[];
  timeToAchieve: string; // e.g., "6 months", "1 year"
  jobTitles: string[];
}

export interface UserProfile {
  id: string;
  userId: string;
  currentSkills: string[];
  desiredSkills: string[];
  experience: number; // Years of experience
  education: 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD' | 'Self-Taught';
  interests: string[];
  preferredLearningStyle: 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Mixed';
  timeAvailability: number; // Hours per week
  careerGoals: string[];
  // Additional profile sections for persistence
  educationEntries?: EducationEntry[];
  experienceEntries?: ExperienceEntry[];
  projectEntries?: ProjectEntry[];
  certifications?: Certification[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
  isFullTime: boolean;
}

export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface SkillAssessment {
  id: string;
  userId: string;
  skillId: string;
  skillName: string;
  score: number; // 0-100
  completedAt: Date;
  recommendedResources: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  skillId: string;
  skillName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
}

export interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skillId: string;
  skillName: string;
  constraints: string[];
  sampleInput?: string;
  sampleOutput?: string;
  testCases: TestCase[];
  hints: string[];
  solution?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean; // Whether this test case is visible to the user
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  requiredSkills: string[];
  estimatedHours: number;
  instructions: string;
  deliverables: string[];
  resources: string[];
}

export interface DynamicRoadmap {
  id: string;
  userId: string;
  targetCareerTrack: string;
  startDate: Date;
  endDate: Date;
  weeks: RoadmapWeek[];
  lastUpdated: Date;
}

export interface RoadmapWeek {
  id: string;
  weekNumber: number;
  learningObjectives: string[];
  dailyPlans: DailyLearningPlan[];
  assessments: string[]; // Assessment IDs
  project?: string; // Project ID
}

export interface DailyLearningPlan {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  resources: LearningResource[];
  tasks: LearningTask[];
  completed: boolean;
}

export interface LearningResource {
  id: string;
  type: 'Video' | 'Article' | 'Tutorial' | 'Documentation' | 'Book' | 'Course';
  title: string;
  url: string;
  description: string;
  estimatedTime: number; // in minutes
}

export interface LearningTask {
  id: string;
  title: string;
  completed: boolean;
  type: 'Reading' | 'Exercise' | 'Coding' | 'Quiz' | 'Project';
  resourceId?: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  salaryRange?: string;
  postedDate: Date;
  url: string;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  title: string;
  description: string;
  technologies: string[];
  repoUrl?: string;
  demoUrl?: string;
  thumbnailUrl?: string;
  images?: string[];
  completedAt: Date;
  featured: boolean;
}

export interface MentorSession {
  id: string;
  userId: string;
  topic: string;
  questions: string[];
  responses: MentorResponse[];
  startedAt: Date;
  endedAt?: Date;
}

export interface MentorResponse {
  id: string;
  questionId: string;
  content: string;
  timestamp: Date;
  resources?: string[];
} 