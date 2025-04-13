'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCareerContext } from '@/app/CareerContext';
import { v4 as uuidv4 } from 'uuid';

const AiTutorChat: React.FC = () => {
  const { userProfile, selectedCareerTrack } = useCareerContext();
  
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string, timestamp: Date}[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI career mentor. I can help with learning guidance, interview prep, resume reviews, and answering technical questions. What would you like help with today?",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(uuidv4());
  const [topic, setTopic] = useState<string>('General Help');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Generate initial greeting based on selected career track
  useEffect(() => {
    if (selectedCareerTrack && messages.length === 1) {
      setMessages([
        {
          role: 'assistant',
          content: `Hello! I'm your AI career mentor for the ${selectedCareerTrack.title} track. I can help with learning guidance, interview prep for ${selectedCareerTrack.title} positions, resume reviews, and answering technical questions about ${selectedCareerTrack.requiredSkills.join(', ')}. What would you like help with today?`,
          timestamp: new Date()
        }
      ]);
      
      setTopic(`${selectedCareerTrack.title} Career Path`);
    }
  }, [selectedCareerTrack]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !userProfile) return;
    
    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Using the AI Mentor API that leverages DistilBERT
      const result = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userProfile: {
            ...userProfile,
            // If there's a selected career track, add it to the context
            ...(selectedCareerTrack && {
              focusedCareerTrack: selectedCareerTrack.title,
              requiredSkills: selectedCareerTrack.requiredSkills
            })
          }, 
          query: input 
        })
      });
      
      const data = await result.json();
      if (data.error) throw new Error(data.error);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error asking mentor:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Topic suggestions for the chat
  const topicSuggestions = [
    "Resume Review",
    "Interview Preparation",
    "Learning Resources",
    "Career Advice",
    "Technical Questions",
    "Project Ideas"
  ];
  
  // Handle clicking on a topic suggestion
  const handleTopicClick = (topic: string) => {
    const topicMessages = {
      "Resume Review": "Could you help me improve my resume for a tech role?",
      "Interview Preparation": "How should I prepare for a technical interview?",
      "Learning Resources": "What are the best resources to learn the skills needed for this career?",
      "Career Advice": "What's the typical career progression in this field?",
      "Technical Questions": "Could you explain how to approach a technical problem?",
      "Project Ideas": "What projects should I build for my portfolio?"
    };
    
    setInput(topicMessages[topic as keyof typeof topicMessages]);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden flex flex-col h-[600px]">
      {/* Chat header */}
      <div className="bg-indigo-600 dark:bg-indigo-900 px-4 py-3 flex justify-between items-center">
        <div>
          <h2 className="text-white font-medium">AI Career Mentor</h2>
          <p className="text-indigo-200 text-xs">{topic}</p>
        </div>
        <button 
          onClick={() => setMessages([{
            role: 'assistant',
            content: selectedCareerTrack 
              ? `Hello! I'm your AI career mentor for the ${selectedCareerTrack.title} track. How can I help you today?`
              : "Hello! I'm your AI career mentor. How can I help you today?",
            timestamp: new Date()
          }])}
          className="text-white hover:text-indigo-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user' 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2">
              <div className="flex space-x-1 items-center">
                <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce delay-75"></div>
                <div className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Topic suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested topics:</p>
          <div className="flex flex-wrap gap-2">
            {topicSuggestions.map(topic => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isLoading || !userProfile}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !userProfile}
            className={`px-4 py-2 rounded-md text-white ${
              isLoading || !input.trim() || !userProfile
                ? 'bg-gray-400'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Send
          </button>
        </form>
      </div>
      
      {/* Footer note about the lightweight model */}
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 italic text-center">
          Powered by lightweight AI models (DistilGPT2) for efficient and fast responses
        </p>
      </div>
      
      {!userProfile && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Profile Required</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please complete your profile to get personalized career advice from the AI Mentor.
            </p>
            <a href="/profile" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md">
              Complete Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTutorChat; 