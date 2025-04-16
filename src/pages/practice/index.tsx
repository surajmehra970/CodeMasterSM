import React from 'react';
import PracticeSection from '@/components/PracticeSection';
import Layout from '@/components/Layout';
import { Practice } from '@/types/course';
import systemDesignPatternsContent from '@/data/courseContent/day51';
import styles from './styles.module.css';

const PracticePage: React.FC = () => {
  // Use the practice section from the system design patterns content as an example
  const practice: Practice = systemDesignPatternsContent.practice as Practice;

  return (
    <Layout title="Practice Problems - SelfLearning Platform">
      <h1 className={`${styles.heading} text-3xl font-bold text-gray-900 dark:text-white mb-8`}>
        LeetCode Practice Problems
      </h1>
      <div className={styles.practicePageContainer}>
        <PracticeSection practice={practice} />
      </div>
    </Layout>
  );
};

export default PracticePage; 