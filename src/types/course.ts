export interface CodeExample {
  language: string;
  code: string;
  explanation?: string;
}

export interface Section {
  title: string;
  content: string;
  codeExamples?: CodeExample[];
}

export interface HomeworkProblem {
  id: string;
  question: string;
  codeExample?: CodeExample;
  solution?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  link: string;
  description: string;
}

export interface Practice {
  introduction: string;
  questions: {
    easy: PracticeQuestion[];
    medium: PracticeQuestion[];
    hard: PracticeQuestion[];
  };
}

export interface Content {
  introduction: string;
  learningObjectives: string[];
  sections: Section[];
  homework?: HomeworkProblem[];
  quiz?: QuizQuestion[];
  practice?: Practice;
}

export interface Problem {
  id: string;
  name: string;
  link?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  problems: Problem[];
  content?: Content;
}

export interface Day {
  id: string;
  day: number;
  topics: Topic[];
}

export interface Week {
  id: string;
  title: string;
  days: Day[];
}

export interface Month {
  id: string;
  title: string;
  description: string;
  target: string;
  weeks: Week[];
}

// Course day structure
export interface CourseDay {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
  topics: string[];
  estimatedHours: number;
}

// Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  totalDays: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  days?: CourseDay[];
  months?: Month[]; // Keep for backward compatibility
  createdAt?: Date;
  updatedAt?: Date;
} 