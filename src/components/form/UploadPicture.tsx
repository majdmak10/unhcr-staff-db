"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

interface UploadPictureProps {
  label?: string;
  id?: string;
  name?: string;
  accept?: string;
  uploadIcon?: string;
  onFileSelect?: (file: File | null) => void;
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  label = "Profile Picture",
  id = "profilePicture",
  name = "profilePicture",
  accept = "image/*",
  uploadIcon = "/table_icons/cloud-c.png",
  onFileSelect,
}) => {
  const [fileName, setFileName] = useState<string>("No chosen picture");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const name = file.name;
      const truncatedName =
        name.length > 15 ? `${name.slice(0, 20)}...${name.slice(-10)}` : name;
      setFileName(truncatedName);

      if (onFileSelect) {
        onFileSelect(file); // Pass file to parent component
      }
    } else {
      clearFile();
    }
  };

  const clearFile = () => {
    setFileName("No chosen picture");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null); // Reset file in parent state
    }
  };

  return (
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
  );
};

export default UploadPicture;
