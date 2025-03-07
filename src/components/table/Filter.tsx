import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Table } from "@tanstack/react-table";

interface FilterProps<TData> {
  table: Table<TData>;
}

const Filter = <TData,>({ table }: FilterProps<TData>) => {
  const [filter, setFilter] = useState("");

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-2 bg-yellow-300 px-3 py-2 rounded-md">
        <FunnelIcon className="h-5 w-5" />
        <span>Filter</span>
      </Menu.Button>

      <Transition>
        <Menu.Items className="absolute mt-2 w-64 bg-white shadow-lg rounded-md p-2 z-10">
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Filter data..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                table.getColumn("fullName")?.setFilterValue(e.target.value); // Example: Filtering fullName column
              }}
              className="w-full pl-3 pr-2 py-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Filter;
