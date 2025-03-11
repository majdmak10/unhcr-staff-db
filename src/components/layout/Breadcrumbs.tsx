"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
  className?: string; // Allow passing a custom className
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  const pathname = usePathname();

  return (
    <main className={className}>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center justify-center text-sm">
          {items.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="flex items-center">
                {isActive ? (
                  <span className="text-gray-500" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="text-mBlue hover:underline">
                    {item.label}
                  </Link>
                )}
                {index < items.length - 1 && <span className="mx-2">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </main>
  );
};

export default Breadcrumbs;
