import React from "react";
import clsx from "clsx";
import { Column } from "./Table";

interface TableHeaderProps {
  columns: Column[];
  columnWidths: { [key: string]: number };
  startResizing: (columnKey: string, startX: number) => void;
  sortState?: {
    column: string | number | null;
    direction: "asc" | "desc" | null;
  };
  handleSort: (key: string) => void;
  headerCheckboxRef: React.RefObject<HTMLInputElement | null>;
  handleSelectAll: () => void;
  disableSortingFor: string[];
}

const getWidthClass = (width: number) => {
  if (width <= 50) return "w-[50px]";
  if (width > 50 && width <= 100) return "w-[100px]";
  if (width > 100 && width <= 150) return "w-[150px]";
  if (width > 150 && width <= 200) return "w-[200px]";
  if (width > 200 && width <= 250) return "w-[250px]";
  if (width > 250 && width <= 300) return "w-[300px]";
  if (width > 300 && width <= 400) return "w-[400px]";
  if (width > 400) return "w-[500px]";
  return "w-auto";
};

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  columnWidths,
  startResizing,
  sortState,
  handleSort,
  headerCheckboxRef,
  handleSelectAll,
  disableSortingFor,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={clsx(
              "group p-3 border-b border-gray-200 text-gray-600 font-semibold text-sm text-left items-center sticky top-0 tracking-wide",
              getWidthClass(columnWidths[column.key]),
              {
                "cursor-pointer": !disableSortingFor.includes(column.key),
                "cursor-default": disableSortingFor.includes(column.key),
                "bg-blue-50 text-blue-600": sortState?.column === column.key,
                "hover:border-r": true, // Add hover border
              }
            )}
            onClick={() => {
              if (!disableSortingFor.includes(column.key))
                handleSort(column.key);
            }}
          >
            <div className="flex items-center">
              {column.key === "checkbox" ? (
                <input
                  aria-label="Select all"
                  type="checkbox"
                  ref={headerCheckboxRef}
                  onChange={handleSelectAll}
                  className="w-4 h-4 accent-mBlue mt-1"
                />
              ) : (
                <>
                  <span>{column.label}</span>
                  {!disableSortingFor.includes(column.key) && (
                    <>
                      {sortState?.column === column.key ? (
                        <span className="ml-2">
                          {sortState.direction === "asc" ? "↑" : "↓"}
                        </span>
                      ) : (
                        <span className="ml-2 opacity-0 group-hover:opacity-100">
                          ↕
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize"
              onMouseDown={(e) => startResizing(column.key, e.clientX)}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
