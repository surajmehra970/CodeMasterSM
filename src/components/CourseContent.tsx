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
    <div className="my-4">
      <div className="bg-gray-800 text-white p-4 rounded-t-md">
        <span className="text-xs font-mono">{codeExample.language}</span>
      </div>
      <pre className="bg-gray-900 text-white p-4 overflow-x-auto rounded-b-md">
        <code>{codeExample.code}</code>
      </pre>
      {codeExample.explanation && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{codeExample.explanation}</p>
      )}
    </div>
  );
};

const HomeworkSection = ({ homework }: { homework: HomeworkProblem[] }) => {
  const [showSolutions, setShowSolutions] = useState<Record<string, boolean>>({});

  const toggleSolution = (id: string) => {
    setShowSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Homework</h3>
      <div className="space-y-6">
        {homework.map((problem, index) => (
          <div key={problem.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-lg">Question {index + 1}</h4>
            <p className="my-2">{problem.question}</p>
            
            {problem.codeExample && (
              <CodeBlock codeExample={problem.codeExample} />
            )}
            
            <div className="mt-4">
              <button 
                onClick={() => toggleSolution(problem.id)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {showSolutions[problem.id] ? 'Hide Solution' : 'Show Solution'}
              </button>
              
              {showSolutions[problem.id] && problem.solution && (
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <h5 className="font-semibold mb-2">Solution:</h5>
                  <div dangerouslySetInnerHTML={{ __html: problem.solution.replace(/```(\w+)\n/g, '<pre class="bg-gray-900 text-white p-4 overflow-x-auto rounded-md mt-2"><code>').replace(/```/g, '</code></pre>') }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuizSection = ({ quiz }: { quiz: QuizQuestion[] }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    if (!submitted) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: optionIndex
      }));
    }
  };

  const handleSubmit = () => {
    const totalQuestions = quiz.length;
    let correctAnswers = 0;
    
    quiz.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    setScore((correctAnswers / totalQuestions) * 100);
    setSubmitted(true);
  };

  const isQuizComplete = () => {
    return quiz.every(question => selectedAnswers[question.id] !== undefined);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Quiz</h3>
      
      {submitted && score !== null && (
        <div className={`p-4 mb-4 rounded-md ${score >= 70 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
          <h4 className="font-bold">Your Score: {score.toFixed(0)}%</h4>
          <p>{score >= 70 ? 'Great job! You passed the quiz.' : 'Keep studying and try again!'}</p>
        </div>
      )}
      
      <div className="space-y-6">
        {quiz.map((question, qIndex) => (
          <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="font-bold text-lg">Question {qIndex + 1}</h4>
            <p className="my-2">{question.question}</p>
            
            <div className="mt-4 space-y-2">
              {question.options.map((option, oIndex) => (
                <div 
                  key={oIndex}
                  className={`p-3 rounded-md cursor-pointer border transition-colors ${
                    selectedAnswers[question.id] === oIndex 
                      ? submitted 
                        ? oIndex === question.correctAnswer 
                          ? 'bg-green-100 dark:bg-green-900 border-green-500'
                          : 'bg-red-100 dark:bg-red-900 border-red-500'
                        : 'bg-primary bg-opacity-10 border-primary'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => handleOptionSelect(question.id, oIndex)}
                >
                  {option}
                </div>
              ))}
            </div>
            
            {submitted && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <p className="font-semibold">{
                  selectedAnswers[question.id] === question.correctAnswer 
                    ? '✅ Correct!' 
                    : `❌ Incorrect. The correct answer is: ${question.options[question.correctAnswer]}`
                }</p>
                <p className="mt-1 text-sm">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!submitted && (
        <button 
          onClick={handleSubmit}
          disabled={!isQuizComplete()}
          className={`mt-6 px-6 py-3 bg-primary text-white rounded-md transition-colors ${
            isQuizComplete() ? 'hover:bg-indigo-700' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
};

const LeetCodeSection = ({ problems }: { problems: Problem[] }) => {
  // Group problems by difficulty
  const easy = problems.filter(p => p.difficulty === 'Easy');
  const medium = problems.filter(p => p.difficulty === 'Medium');
  const hard = problems.filter(p => p.difficulty === 'Hard');

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">LeetCode Practice Problems</h3>
      
      {/* Show problems by difficulty */}
      {easy.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1 rounded-full mr-2">Easy</span>
            <span>Beginner Problems</span>
          </h4>
          <div className="space-y-3">
            {easy.map(problem => (
              <div 
                key={problem.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h5 className="font-medium">{problem.name}</h5>
                {problem.link && (
                  <div className="mt-2">
                    <a 
                      href={problem.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center"
                    >
                      Solve on LeetCode
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {medium.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs px-2 py-1 rounded-full mr-2">Medium</span>
            <span>Intermediate Problems</span>
          </h4>
          <div className="space-y-3">
            {medium.map(problem => (
              <div 
                key={problem.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h5 className="font-medium">{problem.name}</h5>
                {problem.link && (
                  <div className="mt-2">
                    <a 
                      href={problem.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center"
                    >
                      Solve on LeetCode
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {hard.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3 flex items-center">
            <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-2 py-1 rounded-full mr-2">Hard</span>
            <span>Advanced Problems</span>
          </h4>
          <div className="space-y-3">
            {hard.map(problem => (
              <div 
                key={problem.id} 
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h5 className="font-medium">{problem.name}</h5>
                {problem.link && (
                  <div className="mt-2">
                    <a 
                      href={problem.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm flex items-center"
                    >
                      Solve on LeetCode
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CourseContent({ content, problems = [] }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'homework' | 'quiz' | 'leetcode'>('content');
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'content'
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        
        {content.homework && content.homework.length > 0 && (
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'homework'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('homework')}
          >
            Homework
          </button>
        )}
        
        {content.quiz && content.quiz.length > 0 && (
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'quiz'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('quiz')}
          >
            Quiz
          </button>
        )}
        
        {problems.length > 0 && (
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'leetcode'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('leetcode')}
          >
            LeetCode
          </button>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'content' && (
          <div>
            {/* Introduction */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Introduction</h3>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.introduction.replace(/\n/g, '<br />') }} />
            </div>
            
            {/* Learning Objectives */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Learning Objectives</h3>
              <ul className="list-disc pl-6 space-y-1">
                {content.learningObjectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
            
            {/* Content Sections */}
            {content.sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
                
                {section.codeExamples && section.codeExamples.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {section.codeExamples.map((example, exIndex) => (
                      <div key={exIndex} className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
                          <span className="font-medium">{example.language}</span>
                        </div>
                        <div className="p-4 overflow-auto">
                          <pre className="text-sm whitespace-pre-wrap">{example.code}</pre>
                        </div>
                        {example.explanation && (
                          <div className="border-t px-4 py-2 text-sm text-gray-600">
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
          <div className="space-y-6">
            {content.homework.map((problem, index) => (
              <div key={problem.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-bold mb-2">Problem {index + 1}: {problem.question}</h3>
                
                {problem.codeExample && (
                  <div className="mt-4 bg-gray-50 rounded-lg overflow-hidden">
                    <div className="bg-gray-200 px-4 py-2">
                      <span className="font-medium">{problem.codeExample.language}</span>
                    </div>
                    <div className="p-4 overflow-auto">
                      <pre className="text-sm">{problem.codeExample.code}</pre>
                    </div>
                  </div>
                )}
                
                {problem.solution && (
                  <div className="mt-4">
                    <details>
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Solution</summary>
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                        <div dangerouslySetInnerHTML={{ __html: problem.solution.replace(/```[\s\S]*?```/g, match => {
                          const code = match.slice(3, -3).replace(/^java\n/, '');
                          return `<pre class="bg-gray-100 p-2 rounded overflow-auto text-sm my-2">${code}</pre>`;
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
              <div key={question.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-bold mb-2">Q{index + 1}: {question.question}</h3>
                
                <div className="mt-2 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={`question-${question.id}-option-${optIndex}`}
                          type="radio"
                          name={`question-${question.id}`}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={`question-${question.id}-option-${optIndex}`} className="font-medium text-gray-700">
                          {option}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                
                <details className="mt-4">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Answer</summary>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Correct Answer: {question.options[question.correctAnswer]}</p>
                    <p className="mt-2">{question.explanation}</p>
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