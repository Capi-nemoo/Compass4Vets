"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../services/api';

interface UserProfileContextType {
  userProfile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isLoading: boolean;
}

const UserProfileContext = createContext<UserProfileContextType>({
  userProfile: null,
  updateProfile: () => {},
  isLoading: true,
});

export const useUserProfile = () => useContext(UserProfileContext);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from localStorage on initial render
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        } else {
          // Create a demo profile for testing purposes
          // In production, this would be empty until users provide their info
          const demoProfile: UserProfile = {
            id: '123456',
            name: 'John Veteran',
            age: 35,
            branch: 'Army',
            serviceYears: 8,
            location: 'Denver, Colorado',
            interests: ['Hiking', 'Technology', 'Support Groups'],
            medicalConditions: []
          };
          setUserProfile(demoProfile);
          localStorage.setItem('userProfile', JSON.stringify(demoProfile));
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Update profile and save to localStorage
  const updateProfile = (newProfileData: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      if (!prev) return newProfileData as UserProfile;
      const updated = { ...prev, ...newProfileData };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateProfile, isLoading }}>
      {children}
    </UserProfileContext.Provider>
  );
};
