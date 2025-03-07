import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchProps {
  setGlobalFilter: (value: string) => void; // ✅ Explicit type definition
}

const Search: React.FC<SearchProps> = ({ setGlobalFilter }) => {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="pl-10 pr-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;
