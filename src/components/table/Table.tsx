"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import TableControls from "./TableControls";
import { DeleteActionResult } from "@/lib/actions";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import EmptyState from "./EmptyState";
import { useColumnResize } from "@/hooks/useColumnResize";
import { useSort } from "@/hooks/useSort";
import staffColumns from "@/constants/staffColumns";
import Pagination from "./Pagination"; // Import the Pagination component

export interface Column {
  key: string;
  label: string | React.JSX.Element;
  width?: string;
}

export interface TableProps {
  columns: Column[];
  data: Array<{ [key: string]: string | JSX.Element }>;
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
  type: "staff" | "user";
  placeholder?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  deleteAction,
  type,
  placeholder = "Search for a staff",
}) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState<
    { column: string; operator: string; value: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [staffPerPage, setStaffPerPage] = useState<number>(10); // Default rows per page
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  const filteredColumns = useMemo(
    () => columns.filter((col) => visibleColumns.includes(col.key)),
    [columns, visibleColumns]
  );

  const initialColumnWidths = staffColumns.reduce((acc, col) => {
    acc[col.key] = parseInt(col.width.replace("px", ""), 10);
    return acc;
  }, {} as { [key: string]: number });

  const {
    columnWidths,
    startResizing,
    resetWidths,
    isResizing,
    isWidthModified,
  } = useColumnResize(initialColumnWidths);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesFilters = filters.every(({ column, operator, value }) => {
        const cellValue = row[column];
        const cellText =
          typeof cellValue === "string"
            ? cellValue
            : typeof cellValue === "object" && cellValue?.props?.children
            ? String(cellValue.props.children)
            : "";

        if (operator === "contains")
          return cellText.toLowerCase().includes(value.toLowerCase());
        if (operator === "equals")
          return cellText.toLowerCase() === value.toLowerCase();
        if (operator === "starts with")
          return cellText.toLowerCase().startsWith(value.toLowerCase());
        if (operator === "ends with")
          return cellText.toLowerCase().endsWith(value.toLowerCase());
        return true;
      });

      const matchesSearch = Object.values(row).some((cellValue) => {
        const cellText =
          typeof cellValue === "string"
            ? cellValue
            : typeof cellValue === "object" && cellValue?.props?.children
            ? String(cellValue.props.children)
            : "";

        return cellText.toLowerCase().includes(searchValue.toLowerCase());
      });

      return matchesFilters && matchesSearch;
    });
  }, [data, filters, searchValue]);

  const { sortedData, sortState, handleSort } = useSort(filteredData, null);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / staffPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * staffPerPage;
    const endIndex = startIndex + staffPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, staffPerPage]);

  const handleSelectAll = useCallback(() => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]); // Deselect all
    } else {
      setSelectedRows(filteredData.map((_, index) => index)); // Select all rows
    }
  }, [filteredData, selectedRows]);

  useEffect(() => {
    // Update header checkbox state
    if (headerCheckboxRef.current) {
      if (selectedRows.length === 0) {
        headerCheckboxRef.current.checked = false;
        headerCheckboxRef.current.indeterminate = false;
      } else if (selectedRows.length === filteredData.length) {
        headerCheckboxRef.current.checked = true;
        headerCheckboxRef.current.indeterminate = false;
      } else {
        headerCheckboxRef.current.checked = false;
        headerCheckboxRef.current.indeterminate = true; // Indeterminate state
      }
    }
  }, [selectedRows, filteredData, headerCheckboxRef]);

  const handleVisibleColumnsChange = useCallback((updatedColumns: string[]) => {
    setVisibleColumns(updatedColumns);
  }, []);

  const handleFilterApply = useCallback(
    (newFilters: { column: string; operator: string; value: string }[]) => {
      setFilters(newFilters);
    },
    []
  );

  const handleFilterClear = useCallback(() => {
    setFilters([]);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleRowSelect = useCallback((index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const handleSortWrapper = useCallback(
    (columnKey: string) => {
      if (!isResizing) {
        handleSort(columnKey); // Only sort if not resizing
      }
    },
    [isResizing, handleSort]
  );

  const handleReset = () => {
    setFilters([]); // Clear filters
    setSearchValue(""); // Clear search input
    setSelectedRows([]); // Deselect all rows
    setVisibleColumns(columns.map((col) => col.key)); // Show all columns
    handleSort(null); // Reset sorting
    resetWidths(); // Reset column widths
    setCurrentPage(1); // Reset to the first page
  };

  const isResetVisible = useMemo(() => {
    return (
      filters.length > 0 || // Filters applied
      searchValue !== "" || // Search term entered
      sortState.column !== null || // Sorting applied
      selectedRows.length > 0 || // Rows selected
      isWidthModified // Column widths modified
    );
  }, [filters, searchValue, sortState, selectedRows, isWidthModified]);

  return (
    <div className="w-full">
      <div className="flex items-center sticky top-0 bg-white z-10 py-2">
        <TableControls
          columns={columns}
          visibleColumns={visibleColumns}
          data={filteredData}
          selectedRows={selectedRows}
          onColumnChange={handleVisibleColumnsChange}
          onFilterApply={handleFilterApply}
          onFilterClear={handleFilterClear}
          deleteAction={deleteAction}
          selectedIds={selectedRows
            .map((index) => filteredData[index]?.id)
            .filter((id): id is string => !!id)}
          type={type}
          onSearch={handleSearch}
          placeholder={placeholder}
          onReset={handleReset}
          isResetVisible={isResetVisible} // Pass visibility state
        />
      </div>

      <div className="relative">
        <div className="overflow-x-auto w-full">
          {filteredColumns.length === 0 || filteredData.length === 0 ? (
            <EmptyState
              searchValue={searchValue}
              visibleColumnsCount={filteredColumns.length}
              noColumnsMessage="No columns selected. Use the column selector to add columns."
              noResultsMessage="No matching data found."
            />
          ) : (
            <table className="w-full table-fixed">
              <TableHeader
                columns={filteredColumns}
                columnWidths={columnWidths}
                startResizing={startResizing}
                sortState={sortState}
                handleSort={handleSortWrapper} // Use wrapper to prevent sorting during resizing
                headerCheckboxRef={headerCheckboxRef}
                handleSelectAll={handleSelectAll}
                disableSortingFor={["checkbox", "profilePicture", "actions"]}
              />
              <TableBody
                data={paginatedData} // Use paginatedData instead of sortedData
                columns={filteredColumns}
                selectedRows={selectedRows}
                handleRowSelect={handleRowSelect}
              />
            </table>
          )}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        staffPerPage={staffPerPage}
        setStaffPerPage={setStaffPerPage}
      />
    </div>
  );
};

export default Table;
