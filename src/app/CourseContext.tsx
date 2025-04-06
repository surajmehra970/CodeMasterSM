'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course } from '@/data/dsaCourse';

interface CourseContextType {
  activeCourse: Course | null;
  setActiveCourse: (course: Course) => void;
  activeMonthId: string | null;
  setActiveMonthId: (id: string | null) => void;
  activeWeekId: string | null;
  setActiveWeekId: (id: string | null) => void;
  activeDayId: string | null;
  setActiveDayId: (id: string | null) => void;
  activeTopicId: string | null;
  setActiveTopicId: (id: string | null) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children, initialCourse = null }: { children: ReactNode; initialCourse?: Course | null }) => {
  const [activeCourse, setActiveCourse] = useState<Course | null>(initialCourse);
  const [activeMonthId, setActiveMonthId] = useState<string | null>(null);
  const [activeWeekId, setActiveWeekId] = useState<string | null>(null);
  const [activeDayId, setActiveDayId] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  return (
    <CourseContext.Provider
      value={{
        activeCourse,
        setActiveCourse,
        activeMonthId,
        setActiveMonthId,
        activeWeekId,
        setActiveWeekId,
        activeDayId,
        setActiveDayId,
        activeTopicId,
        setActiveTopicId,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
}; 