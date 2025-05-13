import React, { forwardRef } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  type?: string;
  error?: string;
  defaultValue?: string;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Using forwardRef to pass ref to the <input> element
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      id,
      name,
      placeholder,
      value,
      readOnly,
      type = "text",
      error,
      defaultValue,
      description,
      onChange,
    },
    ref
  ) => (
    <main className="flex flex-col w-full gap-2">
      <label htmlFor={id} className="text-sm text-gray-500 font-semibold">
        {label}
      </label>

      {value !== undefined ? (
        // Controlled input
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          aria-label={label}
          className={`ring-[1.5px] p-2 rounded-md text-sm w-full hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200 h-10 ${
            error ? "ring-red-500 text-red-600" : "ring-gray-300"
          }`}
        />
      ) : (
        // Uncontrolled input
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          readOnly={readOnly}
          aria-label={label}
          onChange={onChange}
          className={`ring-[1.5px] p-2 rounded-md text-sm w-full hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200 h-10 ${
            error ? "ring-red-500 text-red-600" : "ring-gray-300"
          }`}
        />
      )}

      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </main>
  )
);

InputField.displayName = "InputField";

export default InputField;
