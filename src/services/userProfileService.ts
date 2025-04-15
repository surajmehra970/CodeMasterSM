import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, Firestore } from 'firebase/firestore';
import { UserProfile } from '@/types/career';

const COLLECTION_NAME = 'userProfiles';

// Helper to generate a document path that will work consistently
const getUserDocRef = (userId: string) => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  return doc(db, COLLECTION_NAME, userId);
};

/**
 * Fetches a user profile from Firestore
 * @param userId The ID of the user
 * @returns The user profile or null if not found
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return null;
    }
    
    const userDocRef = getUserDocRef(userId);
    
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Creates a new user profile in Firestore
 * @param profile The user profile to create
 * @returns True if successful, false otherwise
 */
export const createUserProfile = async (profile: UserProfile): Promise<boolean> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return false;
    }
    
    const userDocRef = getUserDocRef(profile.userId);
    await setDoc(userDocRef, profile);
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

/**
 * Updates an existing user profile in Firestore
 * @param userId The ID of the user
 * @param profileData The profile data to update
 * @returns True if successful, false otherwise
 */
export const updateUserProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<boolean> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return false;
    }
    
    const userDocRef = getUserDocRef(userId);
    await updateDoc(userDocRef, profileData);
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

/**
 * Creates or updates a user profile in Firestore
 * @param profile The user profile to save
 * @returns True if successful, false otherwise
 */
export const saveUserProfile = async (profile: UserProfile): Promise<boolean> => {
  try {
    if (!db) {
      console.error('Firestore is not initialized');
      return false;
    }
    
    const userDocRef = getUserDocRef(profile.userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, { ...profile });
    } else {
      await setDoc(userDocRef, profile);
    }
    return true;
  } catch (error) {
    console.error('Error saving user profile:', error);
    return false;
  }
}; 