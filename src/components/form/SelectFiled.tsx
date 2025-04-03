import React, { forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  error?: string;
}

// Use forwardRef to expose the <select> DOM element
const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, id, name, options, defaultValue, placeholder, error }, ref) => (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={id} className="text-sm text-gray-500 font-semibold">
        {label}
      </label>
      <select
        ref={ref}
        id={id}
        name={name}
        aria-label={label}
        defaultValue={defaultValue}
        className={`ring-[1.5px] p-2 rounded-md text-sm w-full hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200 h-10 ${
          error ? "ring-red-500 text-red-600" : "ring-gray-300"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
);

SelectField.displayName = "SelectField";

export default SelectField;
