import React from "react";

interface AddEditSubmitButtonProps {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const AddEditSubmitButton: React.FC<AddEditSubmitButtonProps> = ({
  title,
  onClick,
  type = "submit",
}) => {
  return (
    <button
      className="bg-mBlue text-sm text-white p-2 rounded-md w-16 cursor-pointer"
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default AddEditSubmitButton;
