import { useState } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";
import { exportToCSV, exportToExcel, exportToWord } from "@/utils/exportUtils";

interface ExportProps<TData> {
  table: Table<TData>;
}

const Export = <TData,>({ table }: ExportProps<TData>) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Menu as="div" className="relative">
      <MenuButton
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-2 bg-yellow-300 px-3 py-2 rounded-md"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
        <span>Export</span>
      </MenuButton>

      {showMenu && (
        <Transition>
          <MenuItems className="absolute mt-2 w-40 bg-white shadow-lg rounded-md p-2 z-10">
            <button
              onClick={() => exportToCSV(table)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Export to CSV
            </button>
            <button
              onClick={() => exportToExcel(table)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Export to Excel
            </button>
            <button
              onClick={() => exportToWord(table)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Export to Word
            </button>
          </MenuItems>
        </Transition>
      )}
    </Menu>
  );
};

export default Export;
