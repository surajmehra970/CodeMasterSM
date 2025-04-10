import React from 'react';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <div className="w-full pt-16">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-primary to-indigo-800 text-white py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              Master DSA in 4 months
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Data Structures <span className="text-secondary">&</span> Algorithms
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              A structured learning path to become proficient in DSA and programming languages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/courses/dsa" 
                className="btn-primary text-lg px-8 py-3">
                Start DSA Course
              </Link>
              <Link href="/resources" 
                className="px-8 py-3 bg-white/10 text-white backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 text-lg">
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-light dark:from-dark to-transparent"></div>
      </section>

      {/* Courses section */}
      <section className="py-20 bg-light dark:bg-dark">
        <div className="container">
          <h2 className="section-title">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* DSA Course Card */}
            <div className="group card hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Data Structures & Algorithms</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Master DSA concepts with a structured 4-month roadmap
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="dark:text-gray-300">Foundations & Problem-Solving</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="dark:text-gray-300">Trees, Graphs & Dynamic Programming</span>
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="dark:text-gray-300">Advanced Algorithms & Interview Prep</span>
                </li>
              </ul>
              <Link href="/courses/dsa" 
                className="btn-primary block text-center">
                View Course
              </Link>
            </div>

            {/* Coming Soon Cards */}
            <div className="card group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-12 top-6 bg-gray-500 text-white px-12 py-1 rotate-45 text-sm font-medium">
                Soon
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">Python Programming</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                From basics to advanced Python concepts
              </p>
              <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center backdrop-blur-sm">
                <span className="text-lg font-medium dark:text-gray-200">Coming Soon</span>
              </div>
              <button disabled className="btn-primary block w-full opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </div>

            <div className="card group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -right-12 top-6 bg-gray-500 text-white px-12 py-1 rotate-45 text-sm font-medium">
                Soon
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">JavaScript Mastery</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete JavaScript and web development course
              </p>
              <div className="mb-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center backdrop-blur-sm">
                <span className="text-lg font-medium dark:text-gray-200">Coming Soon</span>
              </div>
              <button disabled className="btn-primary block w-full opacity-50 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none"></div>
        <div className="container relative">
          <h2 className="section-title">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-6 rounded-2xl bg-white dark:bg-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 mb-6 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                📚
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors dark:text-gray-100">Structured Learning Path</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Carefully designed roadmaps to guide your learning journey step by step
              </p>
            </div>
            <div className="group p-6 rounded-2xl bg-white dark:bg-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 mb-6 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                💻
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors dark:text-gray-100">Practical Problems</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hand-picked problems from LeetCode and other platforms with detailed solutions
              </p>
            </div>
            <div className="group p-6 rounded-2xl bg-white dark:bg-dark hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 mb-6 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors dark:text-gray-100">Interview Preparation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Mock interviews and system design challenges to prepare you for tech interviews
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of students mastering DSA and landing their dream jobs
            </p>
            <Link href="/courses/dsa" 
              className="px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 