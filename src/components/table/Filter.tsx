import { useState } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { FunnelIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";

interface FilterProps<TData> {
  table: Table<TData>;
}

interface FilterCondition {
  id: number;
  column: string;
  operator: string;
  value: string;
}

const Filter = <TData,>({ table }: FilterProps<TData>) => {
  const [filters, setFilters] = useState<FilterCondition[]>([
    { id: 1, column: "", operator: "contains", value: "" },
  ]);

  // Available filter operators
  const operators = [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "startsWith", label: "Starts With" },
    { value: "endsWith", label: "Ends With" },
  ];

  // Get all column options
  const columnOptions = table.getAllColumns().map((column) => ({
    id: column.id,
    header: column.columnDef.header as string,
  }));

  // Add a new filter condition
  const addFilter = () => {
    setFilters([
      ...filters,
      { id: Date.now(), column: "", operator: "contains", value: "" },
    ]);
  };

  // Remove a specific filter condition
  const removeFilter = (id: number) => {
    setFilters(filters.filter((filter) => filter.id !== id));
  };

  // Apply all filters
  const applyFilters = () => {
    filters.forEach((filter) => {
      if (filter.column) {
        table.getColumn(filter.column)?.setFilterValue(filter.value);
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([{ id: 1, column: "", operator: "contains", value: "" }]);
    table.getAllColumns().forEach((column) => column.setFilterValue(undefined));
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center space-x-2 bg-yellow-300 px-3 py-2 rounded-md">
        <FunnelIcon className="h-5 w-5" />
        <span>Filter</span>
      </MenuButton>

      <Transition>
        <MenuItems className="absolute mt-2 w-80 bg-white shadow-lg rounded-md p-4 z-10">
          {/* Dynamic Filter Rows */}
          {filters.map((filter, index) => (
            <div key={filter.id} className="mb-2 border-b pb-2">
              {/* Column Selection */}
              <label className="block text-sm font-medium">Column</label>
              <select
                aria-label="Select column"
                value={filter.column}
                onChange={(e) =>
                  setFilters(
                    filters.map((f) =>
                      f.id === filter.id ? { ...f, column: e.target.value } : f
                    )
                  )
                }
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select column</option>
                {columnOptions.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.header}
                  </option>
                ))}
              </select>

              {/* Operator Selection */}
              <label className="block text-sm font-medium mt-2">Operator</label>
              <select
                aria-label="Select operator"
                value={filter.operator}
                onChange={(e) =>
                  setFilters(
                    filters.map((f) =>
                      f.id === filter.id
                        ? { ...f, operator: e.target.value }
                        : f
                    )
                  )
                }
                className="w-full mt-1 p-2 border rounded-md"
              >
                {operators.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>

              {/* Filter Value Input */}
              <label className="block text-sm font-medium mt-2">Value</label>
              <input
                type="text"
                value={filter.value}
                onChange={(e) =>
                  setFilters(
                    filters.map((f) =>
                      f.id === filter.id ? { ...f, value: e.target.value } : f
                    )
                  )
                }
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter value"
              />

              {/* Remove Filter Button (except first row) */}
              {index > 0 && (
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="flex items-center text-red-500 mt-2 text-sm"
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Remove
                </button>
              )}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex justify-between mt-2">
            <button
              onClick={applyFilters}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Apply
            </button>
            <button
              onClick={addFilter}
              className="bg-gray-200 px-4 py-2 rounded-md"
            >
              Add
            </button>
            <button
              onClick={clearFilters}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Clear
            </button>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Filter;
