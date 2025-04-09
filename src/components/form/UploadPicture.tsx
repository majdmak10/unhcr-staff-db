"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface UploadPictureProps {
  label?: string;
  id?: string;
  name?: string;
  accept?: string;
  uploadIcon?: string;
  onFileSelect?: (file: File | null) => void;
  initialImage?: string;
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  label = "Profile Picture",
  id = "profilePicture",
  name = "profilePicture",
  accept = "image/*",
  uploadIcon = "/table_icons/cloud-c.png",
  onFileSelect,
  initialImage,
}) => {
  const [fileName, setFileName] = useState<string>("No chosen picture");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImage || null
  );
  const [isNewImage, setIsNewImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const name = file.name;
      const truncatedName =
        name.length > 15 ? `${name.slice(0, 20)}...${name.slice(-10)}` : name;
      setFileName(truncatedName);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsNewImage(true);

      if (onFileSelect) {
        onFileSelect(file);
      }
    } else {
      clearFile();
    }
  };

  const clearFile = () => {
    setFileName("No chosen picture");
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
    <div className="flex items-start gap-4 w-full">
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
      </div>

      {/* Preview beside field */}
      {previewUrl && (
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
              className="absolute -top-2 -right-2 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-100 transition"
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
