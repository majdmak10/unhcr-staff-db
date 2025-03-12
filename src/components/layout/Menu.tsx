"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUserRole } from "@/utils/authUtils";

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Fetch user role on component mount
  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
    };
    fetchUserRole();
  }, []);

  // Define menu items with role-based filtering
  const menuItems = useMemo(() => {
    // Move `handleLogout` inside useMemo to avoid missing dependency warning
    const handleLogout = async () => {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login"); // Redirect to login after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    return [
      {
        title: "MENU",
        items: [
          {
            icon: "/menu_icons/home.png?v=1.0",
            hoverIcon: "/menu_icons/home_h.png?v=1.0",
            label: "Home",
            href: "/dashboard",
          },
          ...(userRole === "Admin"
            ? [
                {
                  icon: "/menu_icons/admin.png",
                  hoverIcon: "/menu_icons/admin_h.png",
                  label: "Users",
                  href: "/dashboard/users",
                },
              ]
            : []), // Show "Users" only for Admins
          {
            icon: "/menu_icons/staff.png?v=1.0",
            hoverIcon: "/menu_icons/staff_h.png?v=1.0",
            label: "Staff",
            href: "/dashboard/staff",
          },
          {
            icon: "/menu_icons/critical_staff.png?v=1.0",
            hoverIcon: "/menu_icons/critical_staff_h.png?v=1.0",
            label: "Critical Staff",
            href: "/dashboard/critical-staff",
          },
          {
            icon: "/menu_icons/warden.png?v=1.0",
            hoverIcon: "/menu_icons/warden_h.png?v=1.0",
            label: "Wardens",
            href: "/dashboard/wardens",
          },
          {
            icon: "/menu_icons/floor_marshal.png?v=1.0",
            hoverIcon: "/menu_icons/floor_marshal_h.png?v=1.0",
            label: "Floor Marshals",
            href: "/dashboard/floor-marshals",
          },
          {
            icon: "/menu_icons/etb.png?v=1.0",
            hoverIcon: "/menu_icons/etb_h.png?v=1.0",
            label: "ETB",
            href: "/dashboard/etb",
          },
          {
            icon: "/menu_icons/ifak.png?v=1.0",
            hoverIcon: "/menu_icons/ifak_h.png?v=1.0",
            label: "IFAK",
            href: "/dashboard/ifak",
          },
          {
            icon: "/menu_icons/advanced_driving.png?v=1.0",
            hoverIcon: "/menu_icons/advanced_driving_h.png?v=1.0",
            label: "Advanced Driving",
            href: "/dashboard/advanced-driving",
          },
          {
            icon: "/menu_icons/inside_ds.png?v=1.0",
            hoverIcon: "/menu_icons/inside_ds_h.png?v=1.0",
            label: "Inside DS",
            href: "/dashboard/inside-ds",
          },
          {
            icon: "/menu_icons/outside_ds.png?v=1.0",
            hoverIcon: "/menu_icons/outside_ds_h.png?v=1.0",
            label: "Outside DS",
            href: "/dashboard/outside-ds",
          },
          {
            icon: "/menu_icons/conops.png?v=1.0",
            hoverIcon: "/menu_icons/conops_h.png?v=1.0",
            label: "ConOps",
            href: "/dashboard/conops",
          },
        ],
      },
      {
        title: "PROFILE",
        items: [
          {
            icon: "/menu_icons/profile.png?v=1.0",
            hoverIcon: "/menu_icons/profile_h.png?v=1.0",
            label: "Profile",
            href: "/profile",
          },
          {
            icon: "/menu_icons/settings.png?v=1.0",
            hoverIcon: "/menu_icons/settings_h.png?v=1.0",
            label: "Settings",
            href: "/settings",
          },
          {
            icon: "/menu_icons/help.png?v=1.0",
            hoverIcon: "/menu_icons/help_h.png?v=1.0",
            label: "Help",
            href: "/help",
          },
          {
            icon: "/menu_icons/logout.png?v=1.0",
            hoverIcon: "/menu_icons/logout_h.png?v=1.0",
            label: "Logout",
            action: handleLogout, // Add action instead of href
          },
        ],
      },
    ];
  }, [userRole, router]); // Include `router` as a dependency

  return (
    <main className="text-sm min-h-screen relative z-[10]">
      {menuItems.map((section, sectionIndex) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light mt-4">
            {section.title}
          </span>
          {section.items.map((item, itemIndex) => {
            const uniqueKey = `${sectionIndex}-${itemIndex}`;
            const isActive = pathname === item.href;

            return (
              <div
                key={uniqueKey}
                className="relative flex flex-col items-center lg:items-start z-50"
                onMouseEnter={() => !isActive && setHoveredItem(uniqueKey)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.action ? (
                  // Render logout as a button
                  <button
                    onClick={item.action}
                    className="flex items-center justify-center lg:justify-start gap-4 p-2 md:px-2 w-full rounded-lg mText hover:text-mBlue hover:bg-mHover cursor-pointer"
                  >
                    <Image
                      src={
                        hoveredItem === uniqueKey ? item.hoverIcon : item.icon
                      }
                      alt={item.label}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                ) : (
                  // Render other menu items as links
                  <Link
                    href={item.href}
                    className={`flex items-center justify-center lg:justify-start gap-4 p-2 md:px-2 w-full rounded-lg 
                      ${
                        isActive
                          ? "text-mBlue bg-mHover"
                          : "mText hover:text-mBlue hover:bg-mHover"
                      }`}
                  >
                    <Image
                      src={
                        hoveredItem === uniqueKey || isActive
                          ? item.hoverIcon
                          : item.icon
                      }
                      alt={item.label}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                )}
              </div>
            );
          })}

          {sectionIndex === 0 && (
            <div className="divider my-4 h-[1px] bg-gray-300"></div>
          )}
        </div>
      ))}
    </main>
  );
};

export default Menu;
