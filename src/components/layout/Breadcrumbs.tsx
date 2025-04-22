"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface BreadcrumbsProps {
  items: { label: string; href: string }[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <main
      className={clsx(
        "flex items-center justify-between bg-white rounded-lg p-4 shadow", // default
        className // allow override or extra styles
      )}
    >
      <nav aria-label="breadcrumb">
        <ol className="flex items-center justify-center text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index === items.length - 1 ? (
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
          ))}
        </ol>
      </nav>
    </main>
  );
};

export default Breadcrumbs;
