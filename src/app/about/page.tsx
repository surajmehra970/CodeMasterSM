'use client';

import React from 'react';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">About CodeMaster</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your structured learning path to master data structures, algorithms, and programming languages
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4 relative">
            <span className="relative z-10">Our Mission</span>
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            CodeMaster was created with a simple mission: to provide a structured, comprehensive
            learning path for mastering data structures, algorithms, and programming languages.
            We believe that learning DSA doesn't have to be overwhelming or confusing.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Our goal is to break down complex concepts into manageable daily tasks,
            helping you build strong foundations and gradually progress towards
            advanced topics. Whether you're preparing for coding interviews or
            simply want to become a better programmer, we've got you covered.
          </p>

          <h2 className="text-2xl font-bold mt-10 mb-4 relative">
            <span className="relative z-10">What Makes Us Different</span>
            <span className="absolute bottom-0 left-0 w-12 h-1 bg-primary"></span>
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex">
              <span className="text-primary mr-2">✓</span>
              <span><strong>Structured Roadmap:</strong> We provide a day-by-day learning plan that takes you from basics to advanced topics</span>
            </li>
            <li className="flex">
              <span className="text-primary mr-2">✓</span>
              <span><strong>Practical Focus:</strong> Each concept is accompanied by handpicked problems from platforms like LeetCode</span>
            </li>
            <li className="flex">
              <span className="text-primary mr-2">✓</span>
              <span><strong>Progress Tracking:</strong> Monitor your progress and stay motivated as you complete each day's materials</span>
            </li>
            <li className="flex">
              <span className="text-primary mr-2">✓</span>
              <span><strong>Multiple Courses:</strong> Start with DSA and explore other programming languages and concepts</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-dark rounded-xl shadow-card p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Get Started</h2>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold">Choose Your Course</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Start with our Data Structures & Algorithms course, which provides a comprehensive
                  4-month roadmap to mastery.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold">Follow the Daily Plan</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Each day covers specific topics with theory and practice problems.
                  Spend 1-2 hours daily for consistent progress.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold">Solve Problems</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Apply what you've learned by solving the recommended problems.
                  This reinforces concepts and builds problem-solving skills.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold">Track Your Progress</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Mark topics as completed and review them periodically to
                  ensure long-term retention.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/courses/dsa" className="btn-primary inline-block px-8 py-3">
              Start Learning Now
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center shadow-lg border border-primary/20">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ready to Master DSA?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Join thousands of learners who have used our structured approach to ace technical interviews
          and become better programmers. Start your journey today!
        </p>
        <Link href="/courses/dsa" className="btn-primary inline-block px-8 py-3 text-lg hover:-translate-y-1 transition-transform duration-300">
          Begin Your DSA Journey
        </Link>
      </div>
    </div>
  );
};

export default AboutPage; 