'use client';

import { useState } from 'react';
import { useCareerContext } from '@/app/CareerContext';

export default function AIMentor() {
  const { userProfile } = useCareerContext();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{question: string, answer: string}[]>([]);

  const askMentor = async () => {
    if (!query.trim() || !userProfile) return;
    
    setLoading(true);
    try {
      const result = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userProfile, query })
      });
      
      const data = await result.json();
      if (data.error) throw new Error(data.error);
      
      const newResponse = data.response;
      setResponse(newResponse);
      
      // Add to history
      setHistory(prev => [...prev, {
        question: query,
        answer: newResponse
      }]);
      
      // Clear input
      setQuery('');
    } catch (error) {
      console.error('Error asking mentor:', error);
      setResponse('Sorry, I had trouble processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v7h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Career Mentor</h2>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700 mb-4 pb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ask questions about your career path, learning resources, or skill development.
        </p>
      </div>
      
      {/* Chat history */}
      {history.length > 0 && (
        <div className="mb-4 max-h-80 overflow-y-auto">
          {history.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2">
                <p className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {item.question}
                </p>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Input area */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Ask for career advice..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          onKeyDown={(e) => e.key === 'Enter' && askMentor()}
          disabled={loading}
        />
        <button 
          onClick={askMentor}
          disabled={loading || !query.trim() || !userProfile}
          className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-indigo-700'}`}
        >
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>
      
      {!userProfile && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            Please complete your profile to get personalized career advice.
          </p>
        </div>
      )}
      
      {/* Example questions */}
      <div className="mt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try asking about:</p>
        <div className="flex flex-wrap gap-2">
          {['learning path', 'course recommendations', 'project ideas', 'career advice', 'time management']
            .map(suggestion => (
              <button
                key={suggestion}
                onClick={() => setQuery(`What's a good ${suggestion} for me?`)}
                className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-2 py-1 rounded-full text-gray-700 dark:text-gray-300"
              >
                {suggestion}
              </button>
            ))
          }
        </div>
      </div>
      
      {/* Footer note about lightweight models */}
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
          Powered by lightweight AI models (DistilGPT2) for efficient and fast responses
        </p>
      </div>
    </div>
  );
} 