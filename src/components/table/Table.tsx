import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import Pagination from "./Pagination";
import TableToolbar from "./TableToolbar";
import TableActions from "./TableActions";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onDeleteSelected: (selectedRowIds: string[]) => void;
}

const Table = <TData extends { id: string }>({
  data,
  columns,
  onDeleteSelected,
}: TableProps<TData>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
  });

  // Handles row selection
  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  // Handles deleting selected rows
  const handleDeleteSelected = () => {
    const selectedIds = Object.keys(selectedRows).filter(
      (id) => selectedRows[id]
    );

    if (selectedIds.length === 0) return; // Prevent accidental reset

    // Remove selected rows from the table data
    onDeleteSelected(selectedIds);

    // ✅ Reset only selection, not data
    setSelectedRows((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        if (!selectedIds.includes(key)) acc[key] = prev[key]; // Keep unselected rows
        return acc;
      }, {} as Record<string, boolean>)
    );
  };

  // Count selected rows
  const selectedCount = Object.values(selectedRows).filter(Boolean).length;

  return (
    <div className="bg-white p-4 rounded-lg mt-4">
      {/* Toolbar & Actions */}
      <TableToolbar table={table} setGlobalFilter={setGlobalFilter} />

      {/* Show Actions Only When Selection Exists */}
      {selectedCount > 0 && (
        <TableActions
          selectedCount={selectedCount}
          onReset={() => setSelectedRows({})}
          onDelete={handleDeleteSelected}
        />
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          {/* Table Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-100 border-b">
                {/* Checkbox Column */}
                <th className="p-2 border">
                  <label htmlFor="select-all-checkbox" className="sr-only">
                    Select all rows
                  </label>
                  <input
                    id="select-all-checkbox"
                    type="checkbox"
                    onChange={() => {
                      const allSelected = table
                        .getRowModel()
                        .rows.every((row) => selectedRows[row.id]);
                      const newSelections = table
                        .getRowModel()
                        .rows.reduce(
                          (acc, row) => ({ ...acc, [row.id]: !allSelected }),
                          {}
                        );
                      setSelectedRows(newSelections);
                    }}
                    checked={table
                      .getRowModel()
                      .rows.every((row) => selectedRows[row.id])}
                    title="Select all rows"
                  />
                </th>
                {/* Data Columns */}
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border cursor-pointer">
                    <div className="flex justify-between">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span title="Sortable column">↕</span>{" "}
                      {/* Sort Indicator */}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {/* Checkbox */}
                <td className="p-2 border">
                  <label htmlFor={`select-row-${row.id}`} className="sr-only">
                    Select row {row.id}
                  </label>
                  <input
                    id={`select-row-${row.id}`}
                    type="checkbox"
                    checked={!!selectedRows[row.id]}
                    onChange={() => toggleRowSelection(row.id)}
                    title={`Select row ${row.id}`}
                  />
                </td>
                {/* Data Cells */}
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination table={table} />
    </div>
  );
};

export default Table;
