"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Search = dynamic(() => import("./Search"), { ssr: false });

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown with useCallback to prevent unnecessary re-renders
  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="flex items-center justify-between p-4 bg-mBlue rounded-lg">
      {/* TITLE */}
      <h1 className="text-white font-bold">Welcome, User</h1>

      {/* SEARCH BAR & USER SECTION */}
      <div className="flex md:gap-2 items-center">
        {/* SEARCH BAR */}
        <Search />

        {/* USER PROFILE */}
        <div className="relative flex items-center md:gap-2 justify-end w-full">
          <div className="flex flex-col">
            <span className="hidden md:block text-xs font-bold text-white">
              User
            </span>
            <span className="hidden md:block text-[10px] text-white text-right">
              Role
            </span>
          </div>

          {/* Avatar with Dropdown Arrow */}
          <div
            ref={avatarRef}
            className="relative cursor-pointer w-9 h-9"
            onClick={toggleDropdown}
          >
            <Image
              src="/navbar_icons/admin_avatars/majd_makdessi.jpg"
              alt="User Profile Picture"
              width={36}
              height={36}
              className="rounded-full w-9 h-9"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full cursor-pointer">
              <Image
                src="/navbar_icons/dropdown_arrow.png"
                alt="Expand Menu"
                width={11}
                height={11}
                className={`transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 bottom-[-5px] translate-y-full w-32 bg-white shadow-lg rounded-lg p-2"
            >
              {/* Hidden user info for mobile */}
              <div className="md:hidden flex flex-col">
                <span className="text-xs font-bold">User</span>
                <span className="text-[10px]">Role</span>
                <hr className="my-2 border-[#d4d4d8]" />
              </div>

              <ul className="text-[14px] text-gray-700">
                {[
                  { icon: "settings", label: "Settings" },
                  { icon: "help", label: "Help" },
                  { icon: "logout", label: "Logout" },
                ].map(({ icon, label }) => (
                  <li
                    key={label}
                    className="flex py-2 pr-2 pl-1 hover:bg-[#d8d8d8] cursor-pointer rounded-lg gap-2"
                  >
                    <Image
                      src={`/navbar_icons/${icon}.svg`}
                      alt={`${label} Icon`}
                      width={16}
                      height={16}
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Navbar;
