import React from "react";
import AddEditSubmitButton from "../buttons/AddEditSubmitButton";
import CancelButton from "../buttons/CancelButton";

interface AddEditActionsProps {
  submitTitle: string;
  onSubmit?: () => void;
  submitType?: "button" | "submit" | "reset";
  className?: string; // Optional class for styling
}

const AddEditActions: React.FC<AddEditActionsProps> = ({
  submitTitle,
  onSubmit,
  submitType = "submit",
  className,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <AddEditSubmitButton
        title={submitTitle}
        onClick={onSubmit}
        type={submitType}
      />
      <CancelButton />
    </div>
  );
};

export default AddEditActions;
