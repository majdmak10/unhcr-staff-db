"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const Search = dynamic(() => import("./Search"), { ssr: false });

const Navbar = () => {
  const [user, setUser] = useState<{
    fullName: string;
    role: string;
    profilePicture: string;
  } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        if (data.success) setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUser();
  }, []);

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );

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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const userInfo = useMemo(
    () => ({
      fullName: user?.fullName || "User",
      role: user?.role || "Role",
      profilePicture:
        user?.profilePicture || "/navbar_icons/admin_avatars/default.png",
    }),
    [user]
  );

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-mBlue rounded-lg">
      {/* TITLE */}
      <h1 className="text-white font-bold">Welcome, {userInfo.fullName}</h1>

      {/* SEARCH BAR & USER SECTION */}
      <div className="flex md:gap-2 items-center">
        <Search />

        {/* USER PROFILE */}
        <div className="relative flex items-center md:gap-2 justify-end w-full">
          {/* User Details (Hidden on Mobile) */}
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-white">
              {userInfo.fullName}
            </span>
            <span className="text-[10px] text-white text-right">
              {userInfo.role}
            </span>
          </div>

          {/* Avatar with Dropdown Arrow */}
          <div
            ref={avatarRef}
            className="relative cursor-pointer w-9 h-9"
            onClick={toggleDropdown}
            aria-label="User menu"
          >
            <Image
              src={userInfo.profilePicture}
              alt="User Profile Picture"
              width={36}
              height={36}
              className="rounded-full w-9 h-9"
            />
            <div className="absolute bottom-0 right-0 bg-white rounded-full">
              <ChevronDownIcon
                className={`w-3 h-3 transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 bottom-[-5px] translate-y-full w-36 bg-white shadow-lg rounded-lg p-2 z-50"
            >
              {/* Hidden user info for mobile */}
              <div className="md:hidden flex flex-col">
                <span className="text-xs font-bold">{userInfo.fullName}</span>
                <span className="text-[10px]">{userInfo.role}</span>
                <hr className="my-2 border-[#d4d4d8]" />
              </div>

              <ul className="text-[14px] text-gray-700">
                {/* Profile Link */}
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center py-2 pr-2 pl-1 hover:bg-[#d8d8d8] rounded-lg gap-2"
                  >
                    <Image
                      src="/navbar_icons/profile.svg"
                      alt="Profile Icon"
                      width={16}
                      height={16}
                    />
                    Profile
                  </Link>
                </li>

                {/* Logout Button */}
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left py-2 pr-2 pl-1 hover:bg-[#d8d8d8] rounded-lg gap-2"
                  >
                    <Image
                      src="/navbar_icons/logout.svg"
                      alt="Logout Icon"
                      width={16}
                      height={16}
                    />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
