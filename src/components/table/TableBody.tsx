import React from "react";
import clsx from "clsx";
import { Column } from "./Table";

interface TableBodyProps {
  data: Array<{ [key: string]: string | React.JSX.Element }>;
  columns: Column[];
  selectedRows: number[];
  handleRowSelect: (index: number) => void;
}

const getWidthClass = (columnKey: string) => {
  if (columnKey === "fullName") {
    return "w-[150px] sm:w-[100px]"; // 150px default, but 100px on small screens
  }

  return ""; // Default case (no specific width)
};

const TableBody: React.FC<TableBodyProps> = ({
  data,
  columns,
  selectedRows,
  handleRowSelect,
}) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className={clsx(
            "group hover:bg-gray-100 transition duration-150 text-sm items-center",
            selectedRows.includes(rowIndex) && "bg-blue-50"
          )}
          tabIndex={0} // Make the row focusable
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleRowSelect(rowIndex);
            }
          }}
          onClick={() => handleRowSelect(rowIndex)}
        >
          {columns.map((column) => (
            <td
              key={column.key}
              className={clsx(
                "px-3 py-1 border-b border-gray-200 bg-white",
                getWidthClass(column.key), // Apply dynamic width
                {
                  "sticky left-0 z-10": column.key === "checkbox",
                  "sticky left-[50px] z-10": column.key === "fullName",
                }
              )}
              tabIndex={-1} // Cells are focusable but not tabbable
            >
              {column.key === "checkbox" ? (
                <input
                  aria-label="Select row"
                  type="checkbox"
                  checked={selectedRows.includes(rowIndex)}
                  onChange={() => handleRowSelect(rowIndex)}
                  onClick={(e) => e.stopPropagation()} // Prevent row click
                  className="w-4 h-4 accent-mBlue"
                />
              ) : (
                <div className="max-w-full truncate">
                  {row[column.key] ?? (
                    <span className="text-gray-400">N/A</span>
                  )}
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
