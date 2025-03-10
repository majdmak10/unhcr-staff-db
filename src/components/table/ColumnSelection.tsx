import { useState } from "react";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { ChartBarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";

interface ColumnSelectionProps<TData> {
  table: Table<TData>;
}

const ColumnSelection = <TData,>({ table }: ColumnSelectionProps<TData>) => {
  const [columnSearch, setColumnSearch] = useState("");

  return (
    <Menu
      as="div"
      className="relative flex items-center justify-center space-x-2"
    >
      <MenuButton className="flex items-center space-x-2 bg-mYellow px-3 py-2 rounded-md">
        <ChartBarIcon className="h-4 w-4 fill-black" />
        <span>Columns</span>
      </MenuButton>
      <Transition>
        <MenuItems className="absolute mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-10">
          <div className="relative mb-2">
            <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for a column..."
              value={columnSearch}
              onChange={(e) => setColumnSearch(e.target.value)}
              className="w-full pl-8 pr-2 py-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {table
            .getAllColumns()
            .filter((column) =>
              column.id.toLowerCase().includes(columnSearch.toLowerCase())
            )
            .map((column) => (
              <label
                key={column.id}
                className="flex items-center space-x-2 p-1"
              >
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
                <span>{column.id}</span>
              </label>
            ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default ColumnSelection;
