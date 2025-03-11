"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import TableColumnsSelection from "./TableColumnsSelection";
import TableFilter from "./TableFilter";
import TableExport from "./TableExport";
import SelectedRows from "./SelectedRows";
import TableSearch from "./TableSearch";
import DeleteSelectedButton from "../buttons/DeleteSelectedButton";
import { DeleteActionResult } from "@/lib/actions";
import ResetButton from "../buttons/ResetButton";

interface Column {
  key: string;
  label: string | JSX.Element;
  width?: string;
}

interface TableControlsProps {
  columns: Column[];
  visibleColumns: string[];
  data: Array<{ [key: string]: string | JSX.Element }>;
  selectedRows?: number[];
  onColumnChange: (updatedColumns: string[]) => void;
  onFilterApply: (
    filters: { column: string; operator: string; value: string }[]
  ) => void;
  onFilterClear: () => void;
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
  selectedIds: string[];
  type: "staff" | "user";
  onSearch: (value: string) => void;
  placeholder?: string;
  onReset: () => void;
  isResetVisible: boolean; // New prop to control ResetButton visibility
}

const TableControls: React.FC<TableControlsProps> = ({
  columns,
  visibleColumns,
  data,
  selectedRows,
  onColumnChange,
  onFilterApply,
  onFilterClear,
  deleteAction,
  selectedIds,
  type,
  onSearch, // Receive search handler
  placeholder = "Search for a staff", // Default value
  onReset, // Destructure reset handler
  isResetVisible, // Destructure visibility prop
}) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const exportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredColumns = columns.filter(
    (col) => col.key !== "checkbox" && col.key !== "profilePicture"
  );

  return (
    <div className="flex flex-col justify-center gap-4 md:flex-row md:justify-between w-full">
      <div className="flex justify-between items-center gap-6 w-full md:w-auto">
        <div className="relative flex justify-start items-center gap-2 w-full md:w-auto">
          {/* Columns selection */}
          <div className="relative flex items-center gap-2">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
              title="Show/Hide Columns"
              aria-label="Show/Hide Columns"
              onClick={() => setShowColumnSelector((prev) => !prev)}
            >
              <Image
                src="/table_icons/columns.png"
                alt="Columns"
                width={14}
                height={14}
              />
            </button>
            <span className="text-sm font-medium text-gray-600">Columns</span>
            {showColumnSelector && (
              <TableColumnsSelection
                columns={columns}
                visibleColumns={visibleColumns}
                onChange={onColumnChange}
                onClose={() => setShowColumnSelector(false)}
              />
            )}
          </div>

          {/* Filter */}
          <div className="relative flex items-center gap-2" ref={filterRef}>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
              title="Filter Data"
              aria-label="Filter Data"
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <Image
                src="/table_icons/filter.png"
                alt="Filter"
                width={14}
                height={14}
              />
            </button>
            <span className="text-sm font-medium text-gray-600">Filter</span>
            {showFilter && (
              <TableFilter
                columns={filteredColumns}
                onApply={onFilterApply}
                onClear={onFilterClear}
              />
            )}
          </div>

          {/* Export */}
          <div className="relative flex items-center gap-2" ref={exportRef}>
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full bg-mYellow"
              title="Export Data"
              aria-label="Export Data"
              onClick={() => setShowExport((prev) => !prev)}
            >
              <Image
                src="/table_icons/export.png"
                alt="Export"
                width={14}
                height={14}
              />
            </button>
            <span className="text-sm font-medium text-gray-600">Export</span>
            {showExport && (
              <TableExport
                columns={columns}
                visibleColumns={visibleColumns}
                data={data}
                selectedRows={selectedRows}
                onClose={() => setShowExport(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center gap-1">
        {/* Add selection count if rows are selected */}
        <SelectedRows count={selectedRows?.length || 0} />

        {/* Add delete selected rows */}
        <DeleteSelectedButton
          selectedIds={selectedIds}
          type={type}
          deleteAction={deleteAction}
          show={!!selectedIds.length}
        />

        {/* Add delete selected rows */}
        {isResetVisible && <ResetButton onReset={onReset} />}
      </div>

      <div className="w-full md:w-auto">
        <TableSearch onSearch={onSearch} placeholder={placeholder} />
      </div>
    </div>
  );
};

export default TableControls;
