'use client';

import React from 'react';
import Link from 'next/link';

const ResourcesPage = () => {
  const resources = [
    {
      title: "Books",
      items: [
        {
          name: "Data Structures and Algorithms Made Easy",
          author: "Narasimha Karumanchi",
          description: "A beginner-friendly introduction to data structures and algorithms.",
          link: "#"
        },
        {
          name: "Cracking the Coding Interview",
          author: "Gayle Laakmann McDowell",
          description: "Classic book for interview preparation with numerous problems and solutions.",
          link: "#"
        },
        {
          name: "Algorithm Design Manual",
          author: "Steven Skiena",
          description: "An extensive guide for deeper understanding of algorithms.",
          link: "#"
        },
      ]
    },
    {
      title: "Online Courses",
      items: [
        {
          name: "CS50 by Harvard",
          author: "Harvard University",
          description: "Excellent course for fundamentals of computer science and programming.",
          link: "https://cs50.harvard.edu/"
        },
        {
          name: "Striver's A2Z DSA Course",
          author: "Striver",
          description: "Comprehensive course covering all DSA topics with practice problems.",
          link: "#"
        },
        {
          name: "NeetCode DSA Crash Course",
          author: "NeetCode",
          description: "Focused course for LeetCode preparation.",
          link: "#"
        },
      ]
    },
    {
      title: "YouTube Channels",
      items: [
        {
          name: "Abdul Bari",
          author: "Abdul Bari",
          description: "Clear and deep explanations of algorithms and data structures.",
          link: "https://www.youtube.com/channel/UCZCFT11CWBi3MHNlGf019nw"
        },
        {
          name: "CodeWithHarry",
          author: "Harry",
          description: "Beginner-friendly DSA tutorials in multiple languages.",
          link: "https://www.youtube.com/c/CodeWithHarry"
        },
        {
          name: "Gaurav Sen",
          author: "Gaurav Sen",
          description: "Focus on system design and advanced algorithms.",
          link: "https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw"
        },
      ]
    },
    {
      title: "Problem Solving Platforms",
      items: [
        {
          name: "LeetCode",
          author: "LeetCode Team",
          description: "Best platform for interview preparation with a large problem set.",
          link: "https://leetcode.com/"
        },
        {
          name: "CodeForces",
          author: "CodeForces Team",
          description: "For competitive programming practice with regular contests.",
          link: "https://codeforces.com/"
        },
        {
          name: "HackerRank",
          author: "HackerRank Team",
          description: "Good for fundamental problems and language proficiency.",
          link: "https://www.hackerrank.com/"
        },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Learning Resources</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Curated resources to help you on your journey to master DSA and programming
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((category, index) => (
          <div key={index} className="card group hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-4 text-primary">{category.title}</h2>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">By {item.author}</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{item.description}</p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-primary hover:text-indigo-600 text-sm group-hover:translate-x-1 transition-all duration-300"
                    >
                      Visit Resource 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white dark:bg-dark rounded-xl shadow-card p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Recommended Learning Path</h2>
        <div className="space-y-6 mt-8">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold">Start with the Basics</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Begin with understanding time complexity and basic data structures like arrays, strings,
                and linked lists. Practice simple problems to build confidence.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold">Master Core Algorithms</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Focus on learning and implementing fundamental algorithms like binary search, 
                sorting algorithms, and basic graph algorithms.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold">Tackle Complex Problems</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Move on to more complex data structures like trees, advanced graphs,
                and dynamic programming. Solve medium and hard problems on platforms like LeetCode.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-4 shadow-md">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold">Practice Under Constraints</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Participate in timed contests and mock interviews. Focus on optimizing your solutions
                and explaining your approach clearly.
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
  );
};

export default ResourcesPage; 