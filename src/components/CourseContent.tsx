'use client';

import React, { useState } from 'react';
import { Content, QuizQuestion, Problem, CodeExample, HomeworkProblem, PracticeQuestion } from '@/types/course';

// Update Problem interface to include optional solution and question properties
interface ExtendedProblem extends Problem {
  solution?: string;
  question?: string;
}

interface CourseContentProps {
  content: Content;
  problems?: ExtendedProblem[];
}

const CodeBlock = ({ codeExample }: { codeExample: CodeExample }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex items-center justify-between">
        <span className="font-medium dark:text-gray-200">{codeExample.language}</span>
      </div>
      <div className="p-4 overflow-auto">
        <pre className="text-sm whitespace-pre-wrap dark:text-gray-200">{codeExample.code}</pre>
      </div>
      {codeExample.explanation && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
          {codeExample.explanation}
        </div>
      )}
    </div>
  );
};

// Properly implemented HomeworkSection component
export function HomeworkSection({ homework }: { homework: HomeworkProblem[] }): JSX.Element {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="homework-section">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Homework Problems</h2>
      <div className="space-y-6">
        {homework.map((problem) => (
          <div key={problem.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Problem {problem.id}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{problem.question}</p>
            </div>
            
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end">
              <button
                onClick={() => toggleSolution(problem.id)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                {expandedId === problem.id ? 'Hide Solution' : 'Show Solution'}
              </button>
            </div>
            
            {expandedId === problem.id && problem.solution && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ 
                  __html: problem.solution.replace(/```([\s\S]*?)```/g, (match: string, code: string) => {
                    return `<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto text-sm my-2"><code>${code.replace(/^java\n/, '')}</code></pre>`;
                  })
                }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Properly implemented QuizSection component
export function QuizSection({ quiz }: { quiz: QuizQuestion[] }): JSX.Element {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number | null }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: string]: boolean }>({});

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const toggleExplanation = (questionId: string) => {
    setShowExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="quiz-section">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Knowledge Check</h2>
      <div className="space-y-8">
        {quiz.map((question, qIndex) => (
          <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full w-7 h-7 text-center mr-2">
                  {qIndex + 1}
                </span>
                {question.question}
              </h3>
              
              <div className="space-y-2 mt-4">
                {question.options.map((option, oIndex) => (
                  <div 
                    key={oIndex}
                    onClick={() => handleAnswerSelect(question.id, oIndex)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      userAnswers[question.id] === oIndex 
                        ? userAnswers[question.id] === question.correctAnswer
                          ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                          : 'bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-650 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                        userAnswers[question.id] === oIndex 
                          ? userAnswers[question.id] === question.correctAnswer
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}>
                        {userAnswers[question.id] === oIndex && (
                          userAnswers[question.id] === question.correctAnswer 
                            ? <span>✓</span> 
                            : <span>✗</span>
                        )}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {userAnswers[question.id] !== null && userAnswers[question.id] !== undefined && (
              <div className="px-5 py-3 bg-gray-50 dark:bg-gray-750">
                <button 
                  onClick={() => toggleExplanation(question.id)}
                  className="text-blue-600 dark:text-blue-400 text-sm font-medium"
                >
                  {showExplanations[question.id] ? 'Hide Explanation' : 'Show Explanation'}
                </button>
                
                {showExplanations[question.id] && (
                  <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                    <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">Explanation:</p>
                    <p>{question.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Improved LeetCode practice section - modern UI with card view and interactive features
export function PracticeSection({ practice }: { practice: { introduction: string, questions: { easy: PracticeQuestion[], medium: PracticeQuestion[], hard: PracticeQuestion[] } } }): JSX.Element {
  const [activeTab, setActiveTab] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  // Get all questions across all difficulty levels
  const allQuestions = [
    ...practice.questions.easy,
    ...practice.questions.medium,
    ...practice.questions.hard,
  ];

  // Filter questions based on active tab and search term
  const filteredQuestions = allQuestions.filter((question) => {
    const matchesDifficulty = 
      activeTab === 'all' || 
      (activeTab === 'easy' && practice.questions.easy.includes(question)) ||
      (activeTab === 'medium' && practice.questions.medium.includes(question)) ||
      (activeTab === 'hard' && practice.questions.hard.includes(question));
      
    const matchesSearch = 
      searchTerm === '' || 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDifficulty && matchesSearch;
  });

  // Calculate completion statistics
  const totalCount = allQuestions.length;
  const easyCount = practice.questions.easy.length;
  const mediumCount = practice.questions.medium.length;
  const hardCount = practice.questions.hard.length;
  const completedCount = completedProblems.size;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Mark a problem as completed
  const toggleProblemCompletion = (id: string) => {
    setCompletedProblems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Determine difficulty level color
  const getDifficultyColor = (question: PracticeQuestion): string => {
    if (practice.questions.easy.includes(question)) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (practice.questions.medium.includes(question)) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (practice.questions.hard.includes(question)) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    return '';
  };

  // Determine difficulty text
  const getDifficultyText = (question: PracticeQuestion): string => {
    if (practice.questions.easy.includes(question)) return 'Easy';
    if (practice.questions.medium.includes(question)) return 'Medium';
    if (practice.questions.hard.includes(question)) return 'Hard';
    return '';
  };

  return (
    <div className="course-content-wrapper">
      {/* Introduction */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Practice Problems</h2>
        <p className="text-gray-600 dark:text-gray-300">{practice.introduction}</p>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 flex flex-col md:flex-row items-center">
        <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="#E5E7EB" 
                strokeWidth="3" 
                strokeDasharray="100, 100" 
              />
              <path 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="#6366f1" 
                strokeWidth="3" 
                strokeDasharray={`${completionPercentage}, 100`} 
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-xl font-bold text-primary dark:text-primary">{completionPercentage}%</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{completedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="font-medium text-green-600 dark:text-green-400 block">{practice.questions.easy.filter(q => completedProblems.has(q.id)).length}/{easyCount}</span>
              <span className="text-gray-500 dark:text-gray-400">Easy</span>
            </div>
            <div>
              <span className="font-medium text-yellow-600 dark:text-yellow-400 block">{practice.questions.medium.filter(q => completedProblems.has(q.id)).length}/{mediumCount}</span>
              <span className="text-gray-500 dark:text-gray-400">Medium</span>
            </div>
            <div>
              <span className="font-medium text-red-600 dark:text-red-400 block">{practice.questions.hard.filter(q => completedProblems.has(q.id)).length}/{hardCount}</span>
              <span className="text-gray-500 dark:text-gray-400">Hard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
            placeholder="Search problems..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <button 
            className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
            onClick={() => setViewMode('card')}
            aria-label="Card view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button 
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
        <button
          className={`py-2 px-4 text-sm font-medium mr-2 transition-colors duration-200 ${activeTab === 'all' 
            ? 'text-primary border-b-2 border-primary' 
            : 'text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary'}`}
          onClick={() => setActiveTab('all')}
        >
          All <span className="ml-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full">{totalCount}</span>
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium mr-2 transition-colors duration-200 ${activeTab === 'easy' 
            ? 'text-green-600 border-b-2 border-green-600 dark:text-green-400 dark:border-green-400' 
            : 'text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400'}`}
          onClick={() => setActiveTab('easy')}
        >
          Easy <span className="ml-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded-full">{easyCount}</span>
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium mr-2 transition-colors duration-200 ${activeTab === 'medium' 
            ? 'text-yellow-600 border-b-2 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400' 
            : 'text-gray-500 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400'}`}
          onClick={() => setActiveTab('medium')}
        >
          Medium <span className="ml-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-medium px-2 py-0.5 rounded-full">{mediumCount}</span>
        </button>
        <button
          className={`py-2 px-4 text-sm font-medium transition-colors duration-200 ${activeTab === 'hard' 
            ? 'text-red-600 border-b-2 border-red-600 dark:text-red-400 dark:border-red-400' 
            : 'text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400'}`}
          onClick={() => setActiveTab('hard')}
        >
          Hard <span className="ml-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs font-medium px-2 py-0.5 rounded-full">{hardCount}</span>
        </button>
      </div>
      
      {/* Problem Cards / List */}
      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestions.map((question) => (
            <div 
              key={question.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors duration-200">
                    {question.title}
                  </h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(question)}`}>
                    {getDifficultyText(question)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {question.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <a 
                    href={question.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 flex items-center"
                  >
                    Solve
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <button
                    onClick={() => toggleProblemCompletion(question.id)}
                    className={`p-1 rounded-full ${completedProblems.has(question.id) 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                    aria-label={completedProblems.has(question.id) ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {completedProblems.has(question.id) ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredQuestions.map((question) => (
                <tr key={question.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleProblemCompletion(question.id)}
                      className={`p-1 rounded-full ${completedProblems.has(question.id) 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
                      aria-label={completedProblems.has(question.id) ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {completedProblems.has(question.id) ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{question.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getDifficultyColor(question)}`}>
                      {getDifficultyText(question)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{question.description}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a 
                      href={question.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
                    >
                      Solve
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"></path>
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No problems found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
          <button 
            className="text-sm font-medium text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
            onClick={() => {
              setActiveTab('all');
              setSearchTerm('');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function CourseContent({ content }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'homework' | 'quiz' | 'leetcode'>('content');
  
  const showHomeworkTab = content.homework && content.homework.length > 0;
  const showQuizTab = content.quiz && content.quiz.length > 0;
  const showLeetcodeTab = content.practice !== undefined;
  
  return (
    <div className="bg-white dark:bg-dark rounded-xl shadow-md overflow-hidden course-content">
      <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <button 
          className={`py-3 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'content' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        
        {showHomeworkTab && (
          <button 
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'homework' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('homework')}
          >
            Homework
          </button>
        )}
        
        {showQuizTab && (
          <button 
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'quiz' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
        )}
        
        {showLeetcodeTab && (
          <button 
            className={`py-3 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'leetcode' 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('leetcode')}
          >
            LeetCode
          </button>
        )}
      </div>
      
      <div className="p-6">
        {activeTab === 'content' && (
          <div className="prose prose-indigo max-w-none dark:prose-invert">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Introduction</h2>
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: content.introduction }} />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Learning Objectives</h3>
              <ul className="mt-3 list-disc list-inside text-gray-700 dark:text-gray-300">
                {content.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
            
            {content.sections.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{section.title}</h3>
                <div className="mb-4" dangerouslySetInnerHTML={{ __html: section.content }} />
                
                {section.codeExamples && section.codeExamples.length > 0 && (
                  <div className="space-y-4 my-6">
                    {section.codeExamples.map((example, exIndex) => (
                      <CodeBlock key={exIndex} codeExample={example} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'homework' && content.homework && (
          <HomeworkSection homework={content.homework} />
        )}
        
        {activeTab === 'quiz' && content.quiz && (
          <QuizSection quiz={content.quiz} />
        )}
        
        {activeTab === 'leetcode' && content.practice && (
          <PracticeSection practice={content.practice} />
        )}
      </div>
    </div>
  );
}