"use client";

import React, { useState } from "react";

interface Column {
  key: string;
  label: string | React.JSX.Element;
}

interface Filter {
  column: string;
  operator: string;
  value: string;
}

interface TableFilterProps {
  columns: Column[];
  onApply: (filters: Filter[]) => void;
  onClear: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  onApply,
  onClear,
}) => {
  const [filters, setFilters] = useState<Filter[]>([
    { column: "", operator: "", value: "" },
  ]);

  const handleFilterChange = (
    index: number,
    key: keyof Filter,
    value: string
  ) => {
    setFilters((prev) => {
      const updatedFilters = [...prev];
      updatedFilters[index][key] = value;
      return updatedFilters;
    });
  };

  const handleAddFilter = () => {
    setFilters((prev) => [...prev, { column: "", operator: "", value: "" }]);
  };

  const handleApply = () => {
    onApply(filters);
  };

  const handleClear = () => {
    setFilters([{ column: "", operator: "", value: "" }]);
    onClear();
  };

  return (
    <div className="absolute top-full left-0 mt-2 p-4 bg-white border-1 border-gray-200 rounded shadow-lg w-64 md:w-72 animate-in fade-in duration-200 text-sm z-50">
      <div className="max-h-[300px] overflow-y-auto">
        {filters.map((filter, index) => (
          <div key={index} className="mb-4 border-b border-gray-200 pb-4">
            <div className="flex items-center mb-3">
              <label className="block text-sm font-medium text-gray-600 mr-2 w-20">
                Column
              </label>
              <select
                aria-label="column"
                value={filter.column}
                onChange={(e) =>
                  handleFilterChange(index, "column", e.target.value)
                }
                className="w-full p-1 border-1 border-gray-200 rounded"
              >
                <option value="">Select column</option>
                {columns.map((col) => (
                  <option key={col.key} value={col.key}>
                    {col.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mb-3">
              <label className="block text-sm font-medium text-gray-600 mt-2 mr-2 w-20">
                Operator
              </label>
              <select
                aria-label="operator"
                value={filter.operator}
                onChange={(e) =>
                  handleFilterChange(index, "operator", e.target.value)
                }
                className="w-full p-1 border-1 border-gray-200 rounded"
              >
                <option value="">Select operator</option>
                <option value="contains">Contains</option>
                <option value="equals">Equals</option>
                <option value="starts with">Starts With</option>
                <option value="ends with">Ends With</option>
              </select>
            </div>

            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-600 mt-2 mr-2 w-20">
                Value
              </label>
              <input
                aria-label="value"
                type="text"
                value={filter.value}
                onChange={(e) =>
                  handleFilterChange(index, "value", e.target.value)
                }
                className="w-full p-1 border-1 border-gray-200 rounded"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={handleApply}
          className="text-sm bg-mBlue text-white rounded hover:bg-mBlueDark w-20 py-1"
        >
          Apply
        </button>
        <button
          onClick={handleAddFilter}
          className="text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-20 py-1"
        >
          Add
        </button>
        <button
          onClick={handleClear}
          className="text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-20 py-1"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
