import { useState } from "react";
import Image from "next/image";

type Props = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

const TableSearch = ({
  onSearch,
  placeholder = "Search for a staff",
}: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <main className="w-full md:w-auto flex flex-row justify-between items-center rounded-full ring-[1.5px] ring-gray-300 px-2">
      <div className="flex flex-row items-center">
        <Image
          src="/table_icons/search.png"
          alt="Search Icon"
          width={14}
          height={14}
          priority // Forces it to load earlier, avoiding hydration issues
          unoptimized // Removes Next.js optimizations to prevent mismatches
        />

        <input
          type="text"
          value={searchValue}
          placeholder={placeholder}
          className="w-[200px] flex-none p-2 bg-transparent outline-none text-xs"
          onChange={handleInputChange}
          spellCheck={false} // Avoid external spell checkers modifying the field
          suppressHydrationWarning
        />
      </div>

      <div className="flex flex-row items-center">
        <button
          type="button"
          onClick={handleClear}
          className={`focus:outline-none ${
            searchValue ? "visible" : "invisible"
          }`}
        >
          <span className="text-gray-500 text-xs font-bold rounded-full hover:bg-gray-200 px-[7px] py-[4px]">
            &#10005;
          </span>
        </button>
      </div>
    </main>
  );
};

export default TableSearch;
