import React from "react";
import clsx from "clsx"; // Optional: Helps merge class names

interface FormSectionTitleProps {
  title: string;
  className?: string; // Optional className prop for custom styling
}

const FormSectionTitle: React.FC<FormSectionTitleProps> = ({
  title,
  className,
}) => (
  <h2 className={clsx("text-gray-600 font-semibold", className)}>{title}</h2>
);

export default FormSectionTitle;
