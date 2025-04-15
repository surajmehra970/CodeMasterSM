'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CareerTrack, UserProfile, DynamicRoadmap } from '@/types/career';
import { getUserProfile, saveUserProfile } from '@/services/userProfileService';
import { useSession } from 'next-auth/react';
import FirebaseErrorAlert from '@/components/FirebaseErrorAlert';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, UserCredential } from 'firebase/auth';
import { signInWithCustomToken } from 'firebase/auth';

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
  isSaving: boolean;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

// Helper function to create an empty profile
const createEmptyProfile = (userId: string): UserProfile => ({
  id: userId,
  userId: userId,
  currentSkills: [],
  desiredSkills: [],
  interests: [],
  careerGoals: [],
  education: 'High School' as const,
  preferredLearningStyle: 'Visual' as const,
  timeAvailability: 5,
  experience: 0,
  educationEntries: [],
  experienceEntries: [],
  projectEntries: [],
  certifications: []
});

export const CareerProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [recommendedCareers, setRecommendedCareers] = useState<CareerTrack[]>([]);
  const [selectedCareerTrack, setSelectedCareerTrack] = useState<CareerTrack | null>(null);
  const [userRoadmap, setUserRoadmap] = useState<DynamicRoadmap | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if the user has completed their profile
  const isProfileComplete = userProfile !== null && 
    (userProfile?.currentSkills?.length ?? 0) > 0 && 
    (userProfile?.interests?.length ?? 0) > 0;

  // Set user profile and save to Firebase
  const setUserProfile = async (profile: UserProfile) => {
    setUserProfileState(profile);
    
    if (profile && session?.user?.email) {
      setIsSaving(true);
      try {
        await saveUserProfile(profile);
      } catch (error) {
        console.error('Failed to save user profile to Firebase:', error);
        setError('Failed to save your profile. Please try again later.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Function to refresh career recommendations based on user profile
  const refreshRecommendations = async () => {
    if (!isProfileComplete) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/careers/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userProfile }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setRecommendedCareers(data.recommendations || []);
      }
    } catch (error) {
      console.error('Failed to fetch career recommendations:', error);
      setError('Failed to fetch career recommendations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to refresh or generate user roadmap
  const refreshRoadmap = async () => {
    if (!selectedCareerTrack || !userProfile) return;
    
    setIsLoading(true);
    try {
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
        setUserRoadmap(data.roadmap || null);
      }
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      setError('Failed to generate your roadmap. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile from Firebase when the session changes
  useEffect(() => {
    // Add a listener for Firebase auth state changes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Auth state changed (user becomes null when signing out)
    });

    const fetchUserProfile = async () => {
      if (!session?.user?.email) return;
      
      setIsLoading(true);
      
      try {
        // Check if we need to authenticate with Firebase first
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          await tryFirebaseAuthentication(session.user.email);
        }
        
        await loadOrCreateUserProfile(session.user.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load your profile. Please try again later.');
        
        // Set a fallback profile
        if (session?.user?.email) {
          setUserProfileState(createEmptyProfile(session.user.email));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    // Helper function to try Firebase authentication
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tryFirebaseAuthentication = async (email: string): Promise<UserCredential | null> => {
      try {
        const response = await fetch('/api/auth/firebase-token');
        if (!response.ok) {
          console.error('Failed to get Firebase token:', await response.text());
          return null;
        }
        
        const { token } = await response.json();
        
        try {
          return await signInWithCustomToken(auth, token);
        } catch (tokenError) {
          console.warn('Token authentication failed, continuing without admin features:', tokenError);
          return null;
        }
      } catch (error) {
        console.error('Error authenticating with Firebase:', error);
        return null;
      }
    };
    
    // Helper function to load or create user profile
    const loadOrCreateUserProfile = async (email: string) => {
      try {
        const profile = await getUserProfile(email);
        
        if (profile) {
          setUserProfileState(profile);
        } else {
          // If no profile exists, create an empty one
          const emptyProfile = createEmptyProfile(email);
          setUserProfileState(emptyProfile);
          
          try {
            await saveUserProfile(emptyProfile);
          } catch (saveError) {
            console.error('Failed to save initial profile:', saveError);
          }
        }
      } catch (profileError) {
        console.error('Error getting user profile:', profileError);
        
        // Create a default profile if Firebase operations fail
        setUserProfileState(createEmptyProfile(email));
      }
    };

    if (session?.user) {
      fetchUserProfile();
    }
    
    // Clean up the auth state listener when component unmounts
    return () => unsubscribe();
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps
  // Using eslint-disable here because we only want to run this effect when the session changes
  // Adding all dependencies would cause unnecessary reruns

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
        isSaving,
      }}
    >
      {error && <FirebaseErrorAlert message={error} onClose={() => setError(null)} />}
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