'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeMaster</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-6">
                <Link href="/courses/dsa" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-2 py-1 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                  DSA Course
                </Link>
                <Link href="/resources" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-2 py-1 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                  Resources
                </Link>
                <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-2 py-1 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="btn-outline">
              Sign In
            </button>
            <button className="btn-primary">
              Get Started
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
        <div className="md:hidden bg-white dark:bg-dark shadow-lg rounded-b-xl overflow-hidden">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link href="/courses/dsa" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
              DSA Course
            </Link>
            <Link href="/resources" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
              Resources
            </Link>
            <Link href="/about" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
              About
            </Link>
            <div className="pt-2 flex flex-col gap-2">
              <button className="btn-outline w-full">
                Sign In
              </button>
              <button className="btn-primary w-full">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 