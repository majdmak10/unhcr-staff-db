"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // Adjust the import based on your setup

const BackButton = () => {
  const router = useRouter();

  return (
    <main className="flex justify-start">
      <ArrowLeftIcon
        className="w-5 h-5 stroke-mBlue cursor-pointer"
        onClick={() => router.back()}
      />
    </main>
  );
};

export default BackButton;
