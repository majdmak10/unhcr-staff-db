"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Adjust the import based on your setup

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex justify-start p-4">
      <ArrowLeftIcon
        className="w-5 h-5 stroke-mBlue cursor-pointer"
        onClick={() => router.back()}
      />
    </div>
  );
};

export default BackButton;
