import React from "react";
import BackButton from "../buttons/BackButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import { DeleteActionResult } from "@/lib/actions";

interface ProfilePageHeaderProps {
  id: string;
  type: "users" | "staff";
  deleteAction?: (formData: FormData) => Promise<DeleteActionResult>;
}

const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({
  id,
  type,
  deleteAction,
}) => {
  return (
    <div className="flex justify-between items-center">
      <BackButton />
      <div className="flex justify-end p-4 gap-3">
        <EditButton
          id={id}
          type={type}
          className="hover:opacity-80 transition"
        />
        {deleteAction && (
          <DeleteButton
            id={id}
            type={type === "users" ? "user" : "staff"}
            deleteAction={deleteAction}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePageHeader;
