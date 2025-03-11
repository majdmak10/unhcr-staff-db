"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Column {
  key: string;
  label: string | JSX.Element;
}

interface TableColumnsSelectionProps {
  columns: Column[];
  visibleColumns: string[];
  onChange: (updatedColumns: string[]) => void;
  onClose: () => void; // Callback to close the menu
}

const TableColumnsSelection: React.FC<TableColumnsSelectionProps> = ({
  columns,
  visibleColumns,
  onChange,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(
    visibleColumns.length === columns.length
  );
  const allCheckboxRef = useRef<HTMLInputElement>(null);

  // Update the "Show/Hide All" checkbox state whenever visibleColumns changes
  useEffect(() => {
    const allSelected = visibleColumns.length === columns.length;
    const someSelected =
      visibleColumns.length > 0 && visibleColumns.length < columns.length;

    setIsAllChecked(allSelected);

    if (allCheckboxRef.current) {
      allCheckboxRef.current.indeterminate = someSelected;
    }
  }, [visibleColumns, columns]);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleToggleColumn = (key: string) => {
    if (visibleColumns.includes(key)) {
      onChange(visibleColumns.filter((col) => col !== key));
    } else {
      onChange([...visibleColumns, key]);
    }
  };

  const handleToggleAll = () => {
    if (isAllChecked) {
      onChange([]); // Hide all columns
    } else {
      onChange(columns.map((col) => col.key)); // Show all columns
    }
  };

  const handleReset = () => {
    onChange(columns.map((col) => col.key)); // Reset to show all columns
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 mt-2 p-4 bg-white border rounded shadow-lg w-72 animate-in fade-in duration-200 text-sm z-50"
    >
      {/* Search Section */}
      <div className="relative mb-2">
        <Image
          src="/table_icons/search.png"
          alt="Search"
          width={14}
          height={14}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-50"
        />
        <input
          type="text"
          placeholder="Search for a column..."
          onChange={(e) => {
            // Implement search logic here if needed
            console.log("Search event triggered: ", e.target.value);
          }}
          className="w-full pl-9 pr-3 py-3 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-mBlue focus:border-transparent"
        />
      </div>

      {/* Columns List */}
      <div className="overflow-y-auto max-h-64">
        {columns.map((col) => (
          <div key={col.key} className="flex items-center py-1 ">
            <label className="flex items-center w-full cursor-pointer">
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.key)}
                onChange={() => handleToggleColumn(col.key)}
                className="mr-2 accent-mBlue"
              />
              <span className="text-sm">{col.label}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-200">
        <label
          onClick={handleToggleAll}
          className="flex items-center cursor-pointer"
        >
          <input
            ref={allCheckboxRef}
            type="checkbox"
            checked={isAllChecked}
            onChange={handleToggleAll}
            className="mr-2 accent-mBlue"
          />
          <span className="text-sm text-blue-500">Show/Hide All</span>
        </label>
        <button onClick={handleReset} className="text-red-500 text-sm">
          Reset
        </button>
      </div>
    </div>
  );
};

export default TableColumnsSelection;
