"use client";

import { useRouter } from "next/navigation";

interface CancelButtonProps {
  className?: string; // Optional to customize styles
}

const CancelButton: React.FC<CancelButtonProps> = ({ className }) => {
  const router = useRouter(); // Initialize the router

  const handleCancel = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <button
      type="button"
      className={`bg-mRed text-sm text-white p-2 rounded-md w-16 ${className}`}
      onClick={handleCancel}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
