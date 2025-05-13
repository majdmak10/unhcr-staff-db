import React from "react";

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  value,
  placeholder,
  onChange,
  required,
  icon,
}) => {
  return (
    <main className="mb-5">
      <label htmlFor={id} className="block text-gray-700 text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        {/* Input Field with Right Padding for Icon */}
        <input
          id={id}
          type={type}
          className={`w-full px-4 pr-10 py-2 border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 hover:ring-blue-500 hover:border-blue-500 outline-none rounded-lg mt-1 text-sm bg-white`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />

        {/* Icon Positioned Inside Input */}
        {icon && (
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-600 cursor-pointer mt-1">
            {icon}
          </div>
        )}
      </div>
    </main>
  );
};

export default InputField;
