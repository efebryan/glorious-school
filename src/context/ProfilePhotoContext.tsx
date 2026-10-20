"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ProfilePhotoContextType {
  photoUrl: string | null;
  setPhotoUrl: (url: string | null) => void;
  uploadPhoto: (file: File) => Promise<string>;
  removePhoto: () => void;
}

const STORAGE_KEY = "glorious_user_profile_photo";

const ProfilePhotoContext = createContext<ProfilePhotoContextType>({
  photoUrl: null,
  setPhotoUrl: () => {},
  uploadPhoto: async () => "",
  removePhoto: () => {},
});

export function ProfilePhotoProvider({ children }: { children: React.ReactNode }) {
  const [photoUrl, setPhotoUrlState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPhotoUrlState(saved);
      }
    } catch {
      // LocalStorage access handling (e.g. iframe / private mode)
    }
  }, []);

  const setPhotoUrl = (url: string | null) => {
    setPhotoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(STORAGE_KEY, url);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // LocalStorage error
    }
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        reject(new Error("Please select an image file (PNG, JPG, WebP)"));
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error("Image size should be less than 5MB"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        resolve(result);
      };
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = () => {
    setPhotoUrl(null);
  };

  return (
    <ProfilePhotoContext.Provider value={{ photoUrl, setPhotoUrl, uploadPhoto, removePhoto }}>
      {children}
    </ProfilePhotoContext.Provider>
  );
}

export function useProfilePhoto() {
  return useContext(ProfilePhotoContext);
}
