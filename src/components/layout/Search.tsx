"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Search = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleCloseClick = useCallback(() => setIsOverlayVisible(false), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOverlayVisible(false);
      setQuery("");
    }
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center bg-mBlue md:bg-white text-xs rounded-full md:h-[32px] md:w-auto md:px-2"
      >
        <button
          type="button"
          onClick={() => setIsOverlayVisible(true)}
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

        <input
          type="text"
          placeholder="Search for a staff..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="hidden md:block w-[220px] p-2 bg-transparent outline-none"
          aria-label="Search input"
        />
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

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-3 bg-gray-100 rounded-lg outline-none text-sm"
                aria-label="Search input"
              />
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Search;
