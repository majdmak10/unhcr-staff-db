import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";
import { exportToCSV } from "@/utils/exportUtils";

interface ExportProps<TData> {
  table: Table<TData>; // Explicitly define the type of `table`
}

const Export = <TData,>({ table }: ExportProps<TData>) => {
  return (
    <button
      onClick={() => exportToCSV(table)}
      className="flex items-center space-x-2 bg-yellow-300 px-3 py-2 rounded-md"
    >
      <ArrowDownTrayIcon className="h-5 w-5" />
      <span>Export</span>
    </button>
  );
};

export default Export;
