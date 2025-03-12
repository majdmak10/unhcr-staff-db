"use client";

import React, { useState } from "react";
import ConfirmationModal from "./ConfirmModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteActionResult } from "@/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteButtonProps {
  id: string;
  type: "staff" | "user";
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  type,
  deleteAction,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const formData = new FormData();
      formData.append("ids", JSON.stringify([id])); // Correctly format the ID as a JSON array

      const result = await deleteAction(formData);

      if (result.success) {
        if (type === "user") {
          window.location.href = "/dashboard/users";
        } else if (type === "staff") {
          window.location.href = "/dashboard/staff";
        }
        router.refresh();
      } else {
        const errorString =
          typeof result.error === "string"
            ? result.error
            : result.error instanceof Error
            ? result.error.message
            : "An unknown error occurred.";
        setErrorMessage(errorString);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        title="Delete"
        disabled={isDeleting}
        className="cursor-pointer"
      >
        <TrashIcon className="w-5 h-5 stroke-mRed" />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={
          errorMessage ||
          `Are you sure you want to delete this ${
            type === "user" ? "user" : "staff"
          }?`
        }
        onConfirm={errorMessage ? undefined : handleDelete}
        onCancel={() => {
          setModalOpen(false);
          setErrorMessage(null);
        }}
        showOnlyCancel={!!errorMessage}
      />
    </>
  );
};

export default DeleteButton;
