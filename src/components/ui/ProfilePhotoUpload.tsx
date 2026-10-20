"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useProfilePhoto } from "@/context/ProfilePhotoContext";

interface ProfilePhotoUploadProps {
  initials: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  editable?: boolean;
  className?: string;
  showUploadButton?: boolean;
}

export function ProfilePhotoUpload({
  initials,
  name = "User",
  size = "lg",
  editable = true,
  className = "",
  showUploadButton = true,
}: ProfilePhotoUploadProps) {
  const { photoUrl, uploadPhoto, removePhoto } = useProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl",
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsUploading(true);
    try {
      await uploadPhoto(file);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Failed to upload image");
      }
    } finally {
      setIsUploading(false);
      // Reset input value so re-selecting same file works
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerUpload = () => {
    if (!editable) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Avatar circular frame */}
      <div
        className={`relative rounded-full overflow-hidden select-none cursor-pointer group shadow-md transition-all ${
          sizeClasses[size]
        } ${editable ? "hover:ring-4 hover:ring-brand-green/30" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={triggerUpload}
        title={editable ? "Click to change profile photo" : name}
      >
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-brand-green-50 text-brand-green flex items-center justify-center font-bold border-2 border-white">
            {initials}
          </div>
        )}

        {/* Hover overlay when editable */}
        {editable && (
          <div
            className={`absolute inset-0 bg-black/50 text-white flex flex-col items-center justify-center transition-opacity duration-200 ${
              isHovered || isUploading ? "opacity-100" : "opacity-0"
            }`}
          >
            {isUploading ? (
              <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Action buttons below avatar (if requested) */}
      {editable && showUploadButton && (
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={triggerUpload}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green hover:bg-brand-green-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {photoUrl ? "Change Photo" : "Upload Photo"}
          </button>

          {photoUrl && (
            <button
              type="button"
              onClick={removePhoto}
              className="px-2.5 py-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg font-semibold transition-colors"
              title="Remove photo"
            >
              Remove
            </button>
          )}
        </div>
      )}

      {errorMsg && (
        <p className="mt-1.5 text-xs text-red-600 font-medium">{errorMsg}</p>
      )}
    </div>
  );
}
