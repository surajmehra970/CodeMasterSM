'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const handleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/profile' });
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CodeMaster</span>
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link href="/courses/dsa" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-2 py-1 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                  DSA
                </Link>
                <Link href="/career-mapper" className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary px-2 py-1 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300">
                  Career Mapper
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
            <ThemeSwitcher />
            
            {status === 'loading' ? (
              <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    {session.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt="Profile" 
                        width={36} 
                        height={36} 
                        className="rounded-full"
                        priority
                      />
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {session.user?.name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium hidden lg:block">
                    {session.user?.name?.split(' ')[0] || 'User'}
                  </span>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{session.user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="btn-primary"
              >
                Sign In
              </button>
            )}
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/courses/dsa" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              DSA
            </Link>
            <Link 
              href="/career-mapper" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Career Mapper
            </Link>
            <Link 
              href="/resources" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Resources
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </Link>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 pb-3">
            {status === 'loading' ? (
              <div className="flex items-center px-4">
                <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="ml-3 h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : session ? (
              <>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    {session.user?.image ? (
                      <Image 
                        src={session.user.image} 
                        alt="Profile" 
                        width={36} 
                        height={36} 
                        className="rounded-full"
                        priority
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">
                          {session.user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {session.user?.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {session.user?.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="px-4">
                <button
                  onClick={handleSignIn}
                  className="btn-primary w-full"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 