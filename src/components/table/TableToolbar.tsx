import ColumnSelection from "./ColumnSelection";
import Filter from "./Filter";
import Export from "./Export";
import Search from "./Search";
import { Table } from "@tanstack/react-table";

interface TableToolbarProps<TData> {
  table: Table<TData>;
  setGlobalFilter: (value: string) => void;
}

const TableToolbar = <TData,>({
  table,
  setGlobalFilter,
}: TableToolbarProps<TData>) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-4">
        <ColumnSelection table={table} />
        <Filter table={table} />
        <Export table={table} />
      </div>
      <Search setGlobalFilter={setGlobalFilter} />
    </div>
  );
};

export default TableToolbar;
