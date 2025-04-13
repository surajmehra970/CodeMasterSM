'use client';

import React, { useState, useEffect } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { Quiz, SkillAssessment as SkillAssessmentType } from '@/types/career';
import { v4 as uuidv4 } from 'uuid';

const SkillAssessment: React.FC = () => {
  const { userProfile, selectedCareerTrack } = useCareerContext();
  
  const [assessments, setAssessments] = useState<SkillAssessmentType[]>([]);
  const [availableQuizzes, setAvailableQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user's completed assessments and available quizzes
  useEffect(() => {
    if (!userProfile || !selectedCareerTrack) return;
    
    // Simulate API fetch for assessments
    const fetchAssessments = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockAssessments: SkillAssessmentType[] = [
            {
              id: '1',
              userId: userProfile.id,
              skillId: '101',
              skillName: selectedCareerTrack.requiredSkills[0],
              score: 85,
              completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
              recommendedResources: [
                'Advanced Tutorial on ' + selectedCareerTrack.requiredSkills[0],
                'Interactive Practice for ' + selectedCareerTrack.requiredSkills[0]
              ]
            },
            {
              id: '2',
              userId: userProfile.id,
              skillId: '102',
              skillName: selectedCareerTrack.requiredSkills[1],
              score: 72,
              completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
              recommendedResources: [
                'Beginner to Intermediate ' + selectedCareerTrack.requiredSkills[1],
                'Problem-Solving with ' + selectedCareerTrack.requiredSkills[1]
              ]
            }
          ];
          
          const mockQuizzes: Quiz[] = selectedCareerTrack.requiredSkills.map((skill, index) => ({
            id: `quiz-${index}`,
            title: `${skill} Assessment`,
            description: `Test your knowledge of ${skill} fundamentals and advanced concepts.`,
            skillId: `${100 + index}`,
            skillName: skill,
            difficulty: index % 3 === 0 ? 'Beginner' : index % 3 === 1 ? 'Intermediate' : 'Advanced',
            questions: Array.from({ length: 5 }, (_, i) => ({
              id: `q-${index}-${i}`,
              question: `Sample question ${i + 1} about ${skill}?`,
              options: [
                `Option A for ${skill} question ${i + 1}`,
                `Option B for ${skill} question ${i + 1}`,
                `Option C for ${skill} question ${i + 1}`,
                `Option D for ${skill} question ${i + 1}`
              ],
              correctAnswer: Math.floor(Math.random() * 4),
              explanation: `Explanation for the correct answer to question ${i + 1} about ${skill}.`
            })),
            timeLimit: 10 // minutes
          }));
          
          setAssessments(mockAssessments);
          setAvailableQuizzes(mockQuizzes);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setIsLoading(false);
      }
    };
    
    fetchAssessments();
  }, [userProfile, selectedCareerTrack]);
  
  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(-1));
    setIsQuizCompleted(false);
    setQuizScore(0);
  };
  
  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const submitQuiz = () => {
    if (!selectedQuiz) return;
    
    // Calculate score
    let correctAnswers = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    setQuizScore(score);
    setIsQuizCompleted(true);
    
    // Add to completed assessments
    const newAssessment: SkillAssessmentType = {
      id: uuidv4(),
      userId: userProfile?.id || '',
      skillId: selectedQuiz.skillId,
      skillName: selectedQuiz.skillName,
      score,
      completedAt: new Date(),
      recommendedResources: [
        // In a real implementation, these would be personalized based on performance
        `${selectedQuiz.skillName} Foundations`,
        `Advanced ${selectedQuiz.skillName} Techniques`,
        `Practice Problems for ${selectedQuiz.skillName}`
      ]
    };
    
    setAssessments(prev => [newAssessment, ...prev]);
  };
  
  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setIsQuizCompleted(false);
  };
  
  // Get difficulty color class
  const getDifficultyColorClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get score color class
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  if (!selectedCareerTrack) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Skill Assessments</h2>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Please select a career track to view relevant skill assessments.
          </p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Skill Assessments</h2>
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Skill Assessments</h2>
      
      {selectedQuiz ? (
        isQuizCompleted ? (
          // Quiz results view
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedQuiz.title} Results</h3>
                <button
                  onClick={resetQuiz}
                  className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Back to Assessments
                </button>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
                <div className="text-center mb-4">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Your Score</p>
                  <div className={`text-5xl font-bold ${getScoreColorClass(quizScore)}`}>
                    {quizScore}%
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">Recommended Resources</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                    {assessments[0].recommendedResources.map((resource, index) => (
                      <li key={index}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-800 dark:text-white mb-3">Question Review</h4>
              <div className="space-y-6">
                {selectedQuiz.questions.map((question, qIndex) => {
                  return (
                    <div key={question.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
                      <p className="font-medium text-gray-800 dark:text-white mb-3">{qIndex + 1}. {question.question}</p>
                      <div className="space-y-2 mb-3">
                        {question.options.map((option: string, oIndex: number) => (
                          <div 
                            key={oIndex}
                            className={`p-2 rounded ${
                              oIndex === question.correctAnswer 
                                ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                                : oIndex === selectedAnswers[qIndex] && oIndex !== question.correctAnswer
                                ? 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
                                : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <span className="text-gray-800 dark:text-gray-200">{option}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-sm mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded">
                        <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Explanation:</p>
                        <p className="text-gray-600 dark:text-gray-400">{question.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Return to Assessment List
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Quiz taking view
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{selectedQuiz.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColorClass(selectedQuiz.difficulty)}`}>
                {selectedQuiz.difficulty}
              </span>
            </div>
            
            <div className="mb-2 flex justify-between items-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
              </div>
              {selectedQuiz.timeLimit && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Time Limit: {selectedQuiz.timeLimit} minutes
                </div>
              )}
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
              <div 
                className="bg-indigo-600 h-2 rounded-full" 
                style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
              <p className="text-lg font-medium text-gray-800 dark:text-white mb-6">
                {selectedQuiz.questions[currentQuestionIndex].question}
              </p>
              
              <div className="space-y-3">
                {selectedQuiz.questions[currentQuestionIndex].options.map((option: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                    className={`p-3 rounded-lg border ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-400'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'bg-indigo-500 text-white'
                          : 'border border-gray-300 dark:border-gray-600'
                      }`}>
                        {selectedAnswers[currentQuestionIndex] === index && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? (
                <button
                  onClick={submitQuiz}
                  disabled={selectedAnswers.some(answer => answer === -1)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  onClick={goToNextQuestion}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )
      ) : (
        // Assessment list view
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Your Recent Assessments</h3>
            {assessments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessments.map(assessment => (
                  <div 
                    key={assessment.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800 dark:text-white">{assessment.skillName}</h4>
                      <span className={`font-bold text-lg ${getScoreColorClass(assessment.score)}`}>
                        {assessment.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Completed on {assessment.completedAt.toLocaleDateString()}
                    </p>
                    <div className="text-sm">
                      <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Recommended Resources:</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                        {assessment.recommendedResources.map((resource, index) => (
                          <li key={index}>{resource}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-400">
                  You haven't completed any assessments yet. Take a quiz to evaluate your skills.
                </p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Available Assessments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableQuizzes.map(quiz => (
                <div 
                  key={quiz.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">{quiz.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColorClass(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{quiz.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{quiz.questions.length} questions</span>
                    {quiz.timeLimit && <span>{quiz.timeLimit} min</span>}
                  </div>
                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full py-2 px-3 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-200 font-medium rounded-md text-sm transition-colors"
                  >
                    Start Assessment
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillAssessment; 