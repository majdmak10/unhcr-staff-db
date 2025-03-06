import { useState, useCallback } from "react";
import Image from "next/image";

const Search = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleSearchClick = useCallback(() => setIsOverlayVisible(true), []);
  const handleCloseClick = useCallback(() => setIsOverlayVisible(false), []);

  return (
    <main>
      <div className="flex items-center justify-center bg-mBlue md:bg-white text-xs rounded-full md:h-[32px] md:w-auto md:px-2">
        {/* Search Icon Button */}
        <button
          onClick={handleSearchClick}
          className="flex items-center"
          aria-label="Open search"
        >
          <Image
            src="/navbar_icons/search_white.svg"
            alt="Search icon for small screens"
            width={52}
            height={52}
            className="block md:hidden"
          />
          <Image
            src="/navbar_icons/search.svg"
            alt="Search icon for larger screens"
            width={26}
            height={26}
            className="hidden md:block"
          />
        </button>

        {/* Search Input (Visible only on medium and larger screens) */}
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block w-[220px] p-2 bg-transparent outline-none"
          aria-label="Search input"
        />
      </div>

      {/* Overlay Search Box for Small Screens */}
      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start pt-20">
          <div className="relative bg-white w-full max-w-[400px] mx-4 p-6 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleCloseClick}
              aria-label="Close search overlay"
            >
              ✖
            </button>

            {/* Search Input Field */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 bg-gray-100 rounded-lg outline-none text-sm"
              aria-label="Search input"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
