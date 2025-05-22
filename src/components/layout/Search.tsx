"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import Image from "next/image";

const Search = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500); // Wait 500ms
  const router = useRouter();

  const handleCloseClick = useCallback(() => setIsOverlayVisible(false), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (debouncedQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(debouncedQuery.trim())}`);
      setIsOverlayVisible(false);
      setQuery(""); // Clear input after search
    }
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center bg-mBlue md:bg-white text-xs rounded-full md:h-[32px] md:w-auto md:px-2 relative"
      >
        <button
          type="button"
          onClick={() => setIsOverlayVisible(true)}
          className="flex items-center"
          aria-label="Open search"
        >
          <Image
            src="/navbar_icons/search_white.svg"
            alt="Search icon"
            width={52}
            height={52}
            className="block md:hidden"
          />
          <Image
            src="/navbar_icons/search.svg"
            alt="Search icon"
            width={26}
            height={26}
            className="hidden md:block"
          />
        </button>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="hidden md:block w-[220px] p-2 pr-8 bg-transparent outline-none"
          aria-label="Search input"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="hidden md:block absolute right-2 text-gray-500 text-xs font-bold rounded-full hover:bg-gray-200 px-[7px] py-[4px]"
            aria-label="Clear search"
          >
            &#10005;
          </button>
        )}
      </form>

      {isOverlayVisible && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start pt-20">
          <div className="relative bg-white w-full max-w-[400px] mx-4 p-6 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
              onClick={handleCloseClick}
              aria-label="Close search overlay"
            >
              ✖
            </button>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-3 pr-10 bg-gray-100 rounded-lg outline-none text-sm"
                aria-label="Search input"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 text-sm font-bold rounded-full hover:bg-gray-200 px-[7px] py-[4px]"
                  aria-label="Clear search"
                >
                  &#10005;
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
