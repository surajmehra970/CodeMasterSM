'use client';

import React from 'react';
import { practiceData } from '@/data/practiceData';
import { Practice } from '@/types/course';
import PracticeSection from '@/components/PracticeSection';

const PracticePage: React.FC = () => {
  // Use our dedicated practice data for this page
  const practice: Practice = practiceData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Practice Problems</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Master algorithmic thinking with our collection of curated problems across difficulty levels
        </p>
      </div>
      
      <div className="bg-white dark:bg-dark rounded-xl shadow-card overflow-hidden">
        <PracticeSection practice={practice} />
      </div>
    </div>
  );
};

export default PracticePage; 