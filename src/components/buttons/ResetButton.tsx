"use client";

import React from "react";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="px-2 py-1 bg-mGreen hover:bg-mGreenLight transition text-white rounded-full text-xs md:text-[13px] cursor-pointer"
      title="Reset all filters and selections"
    >
      Reset
    </button>
  );
};

export default ResetButton;
