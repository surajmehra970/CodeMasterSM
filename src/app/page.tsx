import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-primary to-indigo-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Master Data Structures & Algorithms</h1>
            <p className="text-xl mb-8">
              A structured learning path to become proficient in DSA and programming languages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses/dsa" 
                className="btn-primary text-lg px-6 py-3">
                Start DSA Course
              </Link>
              <button className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors text-lg">
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses section */}
      <section className="py-16 bg-light dark:bg-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DSA Course Card */}
            <div className="card">
              <h3 className="text-2xl font-bold mb-2">Data Structures & Algorithms</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master DSA concepts with a structured 4-month roadmap
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Foundations & Problem-Solving
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Trees, Graphs & Dynamic Programming
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Advanced Algorithms & Interview Prep
                </li>
              </ul>
              <Link href="/courses/dsa" 
                className="btn-primary block text-center">
                View Course
              </Link>
            </div>

            {/* Coming Soon Cards */}
            <div className="card opacity-70">
              <h3 className="text-2xl font-bold mb-2">Python Programming</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                From basics to advanced Python concepts
              </p>
              <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-center">
                <span className="text-lg font-medium">Coming Soon</span>
              </div>
              <button disabled className="btn-primary block w-full opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </div>

            <div className="card opacity-70">
              <h3 className="text-2xl font-bold mb-2">JavaScript Mastery</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete JavaScript and web development course
              </p>
              <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-center">
                <span className="text-lg font-medium">Coming Soon</span>
              </div>
              <button disabled className="btn-primary block w-full opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center text-2xl">
                📚
              </div>
              <h3 className="text-xl font-bold mb-2">Structured Learning Path</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Carefully designed roadmaps to guide your learning journey
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center text-2xl">
                💻
              </div>
              <h3 className="text-xl font-bold mb-2">Practical Problems</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hand-picked problems from LeetCode and other platforms
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-2">Interview Preparation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mock interviews and system design challenges
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 