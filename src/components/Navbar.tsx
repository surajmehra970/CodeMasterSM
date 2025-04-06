'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">CodeMaster</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/courses/dsa" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md font-medium">
                  DSA Course
                </Link>
                <Link href="/resources" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md font-medium">
                  Resources
                </Link>
                <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md font-medium">
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="btn-primary">
              Sign In
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/courses/dsa" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-md font-medium">
              DSA Course
            </Link>
            <Link href="/resources" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-md font-medium">
              Resources
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-md font-medium">
              About
            </Link>
            <button className="btn-primary mt-4 w-full">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 