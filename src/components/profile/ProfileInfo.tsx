import React from "react";

interface ProfileInfoProps {
  spanTitle: string;
  spanInfo: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ spanTitle, spanInfo }) => (
  <div className="flex items-center py-2 border-b border-gray-200">
    <span className="font-semibold text-gray-600 text-sm w-[45%]">
      {spanTitle}
    </span>
    <span className="text-sm w-[55%]">{spanInfo}</span>
  </div>
);

export default ProfileInfo;
