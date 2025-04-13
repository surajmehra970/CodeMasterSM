'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CareerTrack, UserProfile, DynamicRoadmap } from '@/types/career';

interface CareerContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  recommendedCareers: CareerTrack[];
  setRecommendedCareers: (careers: CareerTrack[]) => void;
  selectedCareerTrack: CareerTrack | null;
  setSelectedCareerTrack: (career: CareerTrack | null) => void;
  userRoadmap: DynamicRoadmap | null;
  setUserRoadmap: (roadmap: DynamicRoadmap | null) => void;
  isProfileComplete: boolean;
  isLoading: boolean;
  refreshRecommendations: () => Promise<void>;
  refreshRoadmap: () => Promise<void>;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendedCareers, setRecommendedCareers] = useState<CareerTrack[]>([]);
  const [selectedCareerTrack, setSelectedCareerTrack] = useState<CareerTrack | null>(null);
  const [userRoadmap, setUserRoadmap] = useState<DynamicRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Determine if the user has completed their profile
  const isProfileComplete = userProfile !== null && 
    userProfile.currentSkills.length > 0 && 
    userProfile.interests.length > 0;

  // Function to refresh career recommendations based on user profile
  const refreshRecommendations = async () => {
    if (!isProfileComplete) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, this would call an API
      // For now we'll simulate it
      const response = await fetch('/api/careers/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userProfile }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecommendedCareers(data.recommendations);
      }
    } catch (error) {
      console.error('Failed to fetch career recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh or generate user roadmap
  const refreshRoadmap = async () => {
    if (!selectedCareerTrack || !userProfile) return;
    
    setIsLoading(true);
    try {
      // In a real implementation, this would call an API
      const response = await fetch('/api/roadmap/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userProfile,
          careerTrackId: selectedCareerTrack.id 
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserRoadmap(data.roadmap);
      }
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile from storage on initial load
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error('Failed to parse stored user profile');
      }
    }
  }, []);

  // Save user profile to storage when it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  return (
    <CareerContext.Provider
      value={{
        userProfile,
        setUserProfile,
        recommendedCareers,
        setRecommendedCareers,
        selectedCareerTrack,
        setSelectedCareerTrack,
        userRoadmap,
        setUserRoadmap,
        isProfileComplete,
        isLoading,
        refreshRecommendations,
        refreshRoadmap,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareerContext = () => {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareerContext must be used within a CareerProvider');
  }
  return context;
}; 