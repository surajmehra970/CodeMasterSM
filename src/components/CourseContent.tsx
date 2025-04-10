'use client';

import React, { useState } from 'react';
import { Content, QuizQuestion, Problem, CodeExample, HomeworkProblem } from '@/types/course';
import { Topic } from '@/data/dsaCourse';

interface CourseContentProps {
  content: Content;
  problems?: Problem[];
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

const HomeworkSection = ({ homework }: { homework: HomeworkProblem[] }) => {
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setOpenSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="space-y-8">
      {homework.map((problem, index) => (
        <div key={problem.id} className="border-b dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
          <h3 className="text-lg font-bold mb-2 dark:text-white">Problem {index + 1}: {problem.question}</h3>
          
          {problem.codeExample && <CodeBlock codeExample={problem.codeExample} />}
          
          {problem.solution && (
            <div className="mt-4">
              <button 
                onClick={() => toggleSolution(problem.id)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer flex items-center"
              >
                <span>{openSolutions[problem.id] ? 'Hide' : 'View'} Solution</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${openSolutions[problem.id] ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openSolutions[problem.id] && (
                <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="dark:text-gray-300" dangerouslySetInnerHTML={{ __html: problem.solution.replace(/```[\s\S]*?```/g, match => {
                    const code = match.slice(3, -3).replace(/^java\n/, '');
                    return `<pre class="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto text-sm my-2 dark:text-gray-300">${code}</pre>`;
                  })}} />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const QuizSection = ({ quiz }: { quiz: QuizQuestion[] }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
  };
  
  const score = quiz.reduce((total, question) => {
    return total + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
  }, 0);
  
  const isQuizComplete = () => {
    return quiz.every(question => userAnswers[question.id] !== undefined);
  };
  
  return (
    <div>
      <div className="space-y-6">
        {quiz.map((question, index) => (
          <div key={question.id} className="border-b dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-bold mb-2 dark:text-white">Q{index + 1}: {question.question}</h3>
            
            <div className="mt-2 space-y-2">
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id={`question-${question.id}-option-${optIndex}`}
                      type="radio"
                      name={`question-${question.id}`}
                      className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded"
                      checked={userAnswers[question.id] === optIndex}
                      onChange={() => handleOptionSelect(question.id, optIndex)}
                      disabled={submitted}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label 
                      htmlFor={`question-${question.id}-option-${optIndex}`} 
                      className={`font-medium ${
                        submitted 
                          ? optIndex === question.correctAnswer 
                            ? 'text-green-600 dark:text-green-400' 
                            : userAnswers[question.id] === optIndex 
                              ? 'text-red-600 dark:text-red-400' 
                              : 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {option}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            {submitted && (
              <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium dark:text-gray-200">
                  Correct Answer: {question.options[question.correctAnswer]}
                </p>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!submitted && (
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!isQuizComplete()}
            className={`px-4 py-2 rounded-lg font-medium ${
              isQuizComplete() 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      )}
      
      {submitted && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
          <p className="text-green-800 dark:text-green-300 font-medium">
            You scored {score} out of {quiz.length} ({Math.round(score / quiz.length * 100)}%)
          </p>
        </div>
      )}
    </div>
  );
};

const LeetCodeSection = ({ problems }: { problems: Problem[] }) => {
  const easyProblems = problems.filter(p => p.difficulty === "Easy");
  const mediumProblems = problems.filter(p => p.difficulty === "Medium");
  const hardProblems = problems.filter(p => p.difficulty === "Hard");
  
  const ProblemList = ({ title, items, color }: { title: string, items: Problem[], color: string }) => {
    if (items.length === 0) return null;
    
    return (
      <div className="mb-6 last:mb-0">
        <h3 className={`text-lg font-bold mb-2 ${color} dark:text-gray-200`}>{title} ({items.length})</h3>
        <ul className="divide-y dark:divide-gray-700">
          {items.map(problem => (
            <li key={problem.id} className="py-2">
              <a 
                href={problem.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <span className="mr-2">{problem.id}.</span>
                <span>{problem.name}</span>
                <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  return (
    <div>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        These problems are selected to help you practice the concepts learned in this lesson. Try to solve them on your own first before looking at solutions.
      </p>
      
      <ProblemList title="Easy Problems" items={easyProblems} color="text-green-600" />
      <ProblemList title="Medium Problems" items={mediumProblems} color="text-yellow-600" />
      <ProblemList title="Hard Problems" items={hardProblems} color="text-red-600" />
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
            LeetCode
          </button>
        )}
      </div>
      
      <div className="p-6 min-h-[500px] dark:text-gray-300">
        {activeTab === 'content' && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Introduction</h3>
              <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content.introduction.replace(/\n/g, '<br />') }} />
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 dark:text-white">Learning Objectives</h3>
              <ul className="list-disc pl-6 space-y-1">
                {content.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
            
            {content.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{section.title}</h3>
                <div className="prose max-w-none mb-4 dark:prose-invert" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                
                {section.codeExamples && section.codeExamples.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {section.codeExamples.map((example, exIndex) => (
                      <div key={exIndex} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 flex items-center justify-between">
                          <span className="font-medium dark:text-gray-200">{example.language}</span>
                        </div>
                        <div className="p-4 overflow-auto">
                          <pre className="text-sm whitespace-pre-wrap dark:text-gray-200">{example.code}</pre>
                        </div>
                        {example.explanation && (
                          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                            {example.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'homework' && content.homework && (
          <div className="space-y-8">
            {content.homework.map((problem, index) => (
              <div key={problem.id} className="border-b dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-bold mb-2 dark:text-white">Problem {index + 1}: {problem.question}</h3>
                
                {problem.codeExample && (
                  <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2">
                      <span className="font-medium dark:text-gray-200">{problem.codeExample.language}</span>
                    </div>
                    <div className="p-4 overflow-auto">
                      <pre className="text-sm dark:text-gray-200">{problem.codeExample.code}</pre>
                    </div>
                  </div>
                )}
                
                {problem.solution && (
                  <div className="mt-4">
                    <details>
                      <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">View Solution</summary>
                      <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="dark:text-gray-300" dangerouslySetInnerHTML={{ __html: problem.solution.replace(/```[\s\S]*?```/g, match => {
                          const code = match.slice(3, -3).replace(/^java\n/, '');
                          return `<pre class="bg-gray-100 dark:bg-gray-900 p-2 rounded overflow-auto text-sm my-2 dark:text-gray-300">${code}</pre>`;
                        })}} />
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'quiz' && content.quiz && (
          <div className="space-y-6">
            {content.quiz.map((question: QuizQuestion, index) => (
              <div key={question.id} className="border-b dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-bold mb-2 dark:text-white">Q{index + 1}: {question.question}</h3>
                
                <div className="mt-2 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={`question-${question.id}-option-${optIndex}`}
                          type="radio"
                          name={`question-${question.id}`}
                          className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={`question-${question.id}-option-${optIndex}`} className="font-medium text-gray-700 dark:text-gray-300">
                          {option}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                <details className="mt-4">
                  <summary className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">View Answer</summary>
                  <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="font-medium dark:text-gray-200">Correct Answer: {question.options[question.correctAnswer]}</p>
                    <p className="mt-2 dark:text-gray-300">{question.explanation}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'leetcode' && problems.length > 0 && (
          <LeetCodeSection problems={problems} />
        )}
      </div>
    </div>
  );
} 