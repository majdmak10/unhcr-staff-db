import React from "react";
import ViewButton from "../buttons/ViewButton";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import { DeleteActionResult } from "@/lib/actions";

interface TableActionsProps {
  id: string;
  type: "users" | "staff"; // Keeping consistency with ViewButton & EditButton
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
  className?: string; // Optional className for styling
}

const TableActions: React.FC<TableActionsProps> = ({
  id,
  type,
  deleteAction,
  className,
}) => {
  return (
    <main className={`flex items-center gap-2 ${className}`}>
      <ViewButton id={id} type={type} className="hover:opacity-80 transition" />
      <EditButton id={id} type={type} className="hover:opacity-80 transition" />
      {/* Convert "users" to "user" before passing it to DeleteButton */}
      <DeleteButton
        id={id}
        type={type === "users" ? "user" : "staff"}
        deleteAction={deleteAction}
      />
    </main>
  );
};

export default TableActions;
