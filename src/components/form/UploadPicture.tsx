"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import imageCompression from "browser-image-compression";

interface UploadPictureProps {
  label?: string;
  id?: string;
  name?: string;
  accept?: string;
  uploadIcon?: string;
  onFileSelect?: (file: File | null) => void;
  initialImage?: string;
  variant?: "staff" | "userAdd" | "userEdit";
  onError?: (message: string) => void;
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  label = "Profile Picture",
  id = "profilePicture",
  name = "profilePicture",
  accept = "image/*",
  uploadIcon = "/table_icons/cloud-c.png",
  onFileSelect,
  initialImage,
  variant = "staff", // default to 'staff'
  onError,
}) => {
  const [fileName, setFileName] = useState<string>("Upload profile picture");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImage || null
  );
  const [isNewImage, setIsNewImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        clearFile();
        if (onError) {
          onError("Profile picture must be less than 10MB.");
        }
        return;
      }

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const name = compressedFile.name;
        const truncatedName =
          name.length > 15 ? `${name.slice(0, 20)}...${name.slice(-10)}` : name;
        setFileName(truncatedName);

        const url = URL.createObjectURL(compressedFile);
        setPreviewUrl(url);
        setIsNewImage(true);

        if (onFileSelect) {
          onFileSelect(compressedFile);
        }

        if (onError) {
          onError(""); // Clear previous errors
        }
      } catch (error) {
        console.error("Compression failed:", error);
        if (onError) {
          onError("Failed to compress image. Please try another file.");
        }
      }
    } else {
      clearFile();
    }
  };

  const clearFile = () => {
    setFileName("Upload profile picture");
    setPreviewUrl(initialImage || null);
    setIsNewImage(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div
      className={`${
        variant === "userEdit"
          ? "grid grid-cols-1 md:gap-x-10 w-full justify-center items-center"
          : variant === "userAdd"
          ? "grid grid-cols-1 w-full justify-center items-center"
          : "grid grid-cols-1 md:grid-cols-3 md:gap-x-10 w-full justify-center items-center"
      }`}
    >
      {/* Preview at top for 'user' */}
      {variant === "userEdit" && previewUrl && (
        <div className="relative w-[120px] h-[120px] mx-auto mb-4">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="rounded-full border border-gray-300 shadow-md object-cover "
          />
          {isNewImage && (
            <button
              type="button"
              onClick={clearFile}
              className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer"
              aria-label="Remove picture"
              title="Remove picture"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      )}

      {/* Upload Field */}
      <div className="flex flex-col w-full gap-2">
        <label htmlFor={id} className="text-sm text-gray-500 font-semibold">
          {label}
        </label>

        <div className="flex flex-col px-1 ring-[1.5px] ring-gray-300 rounded-md hover:ring-mBlue focus:ring-mBlue transition-all duration-200">
          <div className="flex items-center gap-2 text-sm w-full h-10">
            <label htmlFor={id} className="cursor-pointer">
              <Image
                src={uploadIcon}
                alt="Upload"
                className="w-7 h-7"
                width={32}
                height={32}
              />
            </label>
            <span>{fileName}</span>
          </div>
          <input
            type="file"
            id={id}
            name={name}
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <label className="text-xs text-red-500 ml-1">Max size 10MB</label>

        {/* Preview for 'userAdd' variant */}
        {variant === "userAdd" && previewUrl && (
          <div className="relative w-[120px] h-[120px] mt-4 mx-auto">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="rounded-full object-cover "
            />
            {isNewImage && (
              <button
                type="button"
                onClick={clearFile}
                className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer"
                aria-label="Remove picture"
                title="Remove picture"
              >
                <XMarkIcon className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Preview for 'staff' variant (to the right) */}
      {variant === "staff" && previewUrl && (
        <div className="relative w-[80px] h-[80px] mt-7">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="rounded-full object-cover"
          />
          {isNewImage && (
            <button
              type="button"
              onClick={clearFile}
              className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer"
              aria-label="Remove picture"
              title="Remove picture"
            >
              <XMarkIcon className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadPicture;
