'use client';

import React, { useState } from 'react';
import { Content, QuizQuestion, Problem, CodeExample, HomeworkProblem } from '@/types/course';

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

// Declared but not currently used - will be implemented in future versions
export function HomeworkSection(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { homework }: { homework: HomeworkProblem[] }
): JSX.Element {
  return <div>Homework Section (Coming Soon)</div>;
}

// Declared but not currently used - will be implemented in future versions
export function QuizSection(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { quiz }: { quiz: QuizQuestion[] }
): JSX.Element {
  return <div>Quiz Section (Coming Soon)</div>;
}

const LeetCodeSection = ({ problems }: { problems: ExtendedProblem[] }) => {
  const easyProblems = problems.filter(p => p.difficulty === "Easy");
  const mediumProblems = problems.filter(p => p.difficulty === "Medium");
  const hardProblems = problems.filter(p => p.difficulty === "Hard");
  
  const ProblemList = ({ title, items, color, bgColor, borderColor }: { 
    title: string, 
    items: ExtendedProblem[], 
    color: string,
    bgColor: string,
    borderColor: string 
  }) => {
    if (items.length === 0) return null;
    
    return (
      <div className={`mb-8 last:mb-0 p-5 rounded-lg ${bgColor} ${borderColor}`}>
        <h3 className={`text-lg font-bold mb-4 ${color} flex items-center`}>
          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${color} bg-opacity-20 mr-2`}>
            {items.length}
          </span>
          {title}
        </h3>
        <ul className="space-y-3">
          {items.map(problem => (
            <li key={problem.id} className="rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-block w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm font-medium ${color} bg-opacity-10`}>
                      {problem.id}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{problem.name}</span>
                  </div>
                  <div className="flex items-center">
                    {problem.solution && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 mr-2">
                        Solution
                      </span>
                    )}
                  </div>
                </div>
                {problem.question && (
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {problem.question}
                  </div>
                )}
              </div>
              <div className="px-3 py-2 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => window.open(problem.link || `https://leetcode.com/problems/${problem.name.toLowerCase().replace(/\s+/g, '-')}/`, '_blank')}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    LeetCode
                  </button>
                  
                  {problem.solution && (
                    <button 
                      onClick={() => {
                        // Toggle solution visibility
                        const solutionElem = document.getElementById(`solution-${problem.id}`);
                        if (solutionElem) {
                          solutionElem.classList.toggle('hidden');
                        }
                      }}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium rounded bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      View Solution
                    </button>
                  )}
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {problem.difficulty}
                </div>
              </div>
              
              {problem.solution && (
                <div id={`solution-${problem.id}`} className="hidden px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                  <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ 
                    __html: problem.solution?.replace(/```([\s\S]*?)```/g, (match: string, code: string) => {
                      return `<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto text-sm my-2"><code>${code.replace(/^java\n/, '')}</code></pre>`;
                    }) || ''
                  }} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div className="course-content-wrapper">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Practice Problems</h2>
          <div className="flex space-x-3">
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span className="text-gray-600 dark:text-gray-400">Easy</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              <span className="text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span className="text-gray-600 dark:text-gray-400">Hard</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
          <p className="text-gray-700 dark:text-gray-300">
            These problems are selected to help you practice the concepts learned in this lesson. Try to solve them on your own first before viewing the solutions.
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-blue-700 dark:text-blue-300">💡 Tip:</span> Click the LeetCode button to open the problem in a new tab, or view the solution directly here.
          </p>
        </div>
        
        {problems.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="mt-4 text-gray-500 dark:text-gray-400">No practice problems available for this lesson yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <ProblemList 
              title="Easy Problems" 
              items={easyProblems} 
              color="text-green-600 dark:text-green-400" 
              bgColor="bg-green-50 dark:bg-green-900/10" 
              borderColor="border border-green-100 dark:border-green-800" 
            />
            <ProblemList 
              title="Medium Problems" 
              items={mediumProblems} 
              color="text-yellow-600 dark:text-yellow-400" 
              bgColor="bg-yellow-50 dark:bg-yellow-900/10" 
              borderColor="border border-yellow-100 dark:border-yellow-800" 
            />
            <ProblemList 
              title="Hard Problems" 
              items={hardProblems} 
              color="text-red-600 dark:text-red-400" 
              bgColor="bg-red-50 dark:bg-red-900/10" 
              borderColor="border border-red-100 dark:border-red-800" 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default function CourseContent({ content, problems = [] }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'homework' | 'quiz' | 'leetcode'>('content');
  
  const showHomeworkTab = content.homework && content.homework.length > 0;
  const showQuizTab = content.quiz && content.quiz.length > 0;
  const showLeetcodeTab = problems && problems.length > 0;
  
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
            Practice
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
        
        {activeTab === 'leetcode' && (
          <LeetCodeSection problems={problems} />
        )}
      </div>
    </div>
  );
}