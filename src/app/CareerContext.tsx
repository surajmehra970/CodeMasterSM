'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CareerTrack, UserProfile, DynamicRoadmap } from '@/types/career';
import { getUserProfile, saveUserProfile } from '@/services/userProfileService';
import { useSession } from 'next-auth/react';
import FirebaseErrorAlert from '@/components/FirebaseErrorAlert';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, UserCredential } from 'firebase/auth';

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
      // Use mock data instead of calling the API that doesn't exist yet
      // In the future when API is implemented, uncomment the fetch code
      /*
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
      */
      
      // Mock data for development
      const mockCareers = [
        {
          id: '1',
          title: 'Full Stack Developer',
          description: 'Build both frontend and backend components of web applications, working with modern frameworks and databases.',
          demandLevel: 'High' as const,
          averageSalary: '$100,000 - $140,000',
          requiredSkills: ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
          recommendedCourses: ['Web Development Bootcamp', 'Modern JavaScript'],
          timeToAchieve: '9 months',
          jobTitles: ['Full Stack Developer', 'Web Developer', 'JavaScript Developer']
        },
        {
          id: '2',
          title: 'Data Scientist',
          description: 'Analyze complex data to help organizations make better decisions using statistical methods and machine learning.',
          demandLevel: 'High' as const,
          averageSalary: '$120,000 - $160,000',
          requiredSkills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
          recommendedCourses: ['Data Science Foundations', 'Machine Learning Fundamentals'],
          timeToAchieve: '12 months',
          jobTitles: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer']
        },
        {
          id: '3',
          title: 'DevOps Engineer',
          description: 'Bridge the gap between development and operations by implementing CI/CD pipelines and infrastructure automation.',
          demandLevel: 'High' as const,
          averageSalary: '$110,000 - $150,000',
          requiredSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
          recommendedCourses: ['DevOps Essentials', 'Cloud Infrastructure', 'Container Orchestration'],
          timeToAchieve: '8 months',
          jobTitles: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Engineer']
        }
      ];
      
      // Set the mock data after a small delay to simulate API call
      setTimeout(() => {
        setRecommendedCareers(mockCareers);
      }, 500);
    } catch (error) {
      console.error('Failed to fetch career recommendations:', error);
      setError('Failed to fetch career recommendations. Please try again later.');
    } finally {
      // Use timeout to simulate API delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Function to refresh or generate user roadmap
  const refreshRoadmap = async () => {
    if (!selectedCareerTrack || !userProfile) return;
    
    setIsLoading(true);
    try {
      // Use mock data instead of calling the API that doesn't exist yet
      // In the future when API is implemented, uncomment the fetch code
      /*
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
      */
      
      // Mock roadmap data for development
      const mockRoadmap = {
        id: Date.now().toString(),
        userId: userProfile.userId,
        targetCareerTrack: selectedCareerTrack.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90), // 90 days from now
        weeks: [
          {
            id: '1',
            weekNumber: 1,
            learningObjectives: ['Understand the basics', 'Set up development environment'],
            dailyPlans: [
              {
                id: '1-1',
                dayNumber: 1,
                title: 'Introduction to the career path',
                description: 'Overview of what you will learn and career prospects',
                estimatedHours: 2,
                resources: [],
                tasks: [],
                completed: false
              }
            ],
            assessments: []
          }
        ],
        lastUpdated: new Date()
      };
      
      // Set the mock data after a small delay to simulate API call
      setTimeout(() => {
        setUserRoadmap(mockRoadmap);
      }, 500);
    } catch (error) {
      console.error('Failed to generate roadmap:', error);
      setError('Failed to generate your roadmap. Please try again later.');
    } finally {
      // Use timeout to simulate API delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Load user profile from Firebase when the session changes
  useEffect(() => {
    // Add a listener for Firebase auth state changes
    let unsubscribe = () => {};
    
    if (auth) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      unsubscribe = onAuthStateChanged(auth, (user) => {
        // Auth state changed (user becomes null when signing out)
      });
    }

    const fetchUserProfile = async () => {
      if (!session?.user?.email) return;
      
      setIsLoading(true);
      
      try {
        // Check if we need to authenticate with Firebase first
        const currentUser = auth?.currentUser;
        
        if (!currentUser && auth) {
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
        if (!auth) {
          console.warn('Firebase Auth is not initialized');
          return null;
        }
        
        // We're only using Firebase for data storage, not authentication
        // If we need authentication in the future, we'll use Next.js authentication
        // and not rely on Firebase Admin SDK for token generation
        console.info('Using Next.js authentication only, Firebase Admin features disabled');
        return null;

      } catch {
        console.warn('Error with Firebase setup, continuing without admin features');
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