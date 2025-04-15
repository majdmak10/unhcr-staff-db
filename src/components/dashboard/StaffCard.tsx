"use client";

import Link from "next/link";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface StaffCardProps {
  title: string;
  number: number | null;
  link: string;
  iconType: "total" | "inside" | "outside";
  status: "loading" | "error" | "success";
}

const iconMap = {
  total: UserGroupIcon,
  inside: ArrowRightCircleIcon,
  outside: ArrowLeftCircleIcon,
};

const colorMap = {
  total: "text-mBlue",
  inside: "text-mGreen",
  outside: "text-mRed",
};

const StaffCard = ({
  title,
  number,
  link,
  iconType,
  status,
}: StaffCardProps) => {
  const Icon = iconMap[iconType];
  const textColor = colorMap[iconType];

  return (
    <div className="rounded-lg bg-white shadow px-6 py-4 flex flex-1 items-center w-full">
      <div className="flex-shrink-0">
        <Icon className={`h-10 w-10 ${textColor}`} />
      </div>
      <div className="ml-3 flex flex-col">
        <Link
          href={link}
          className={`no-underline hover:underline mb-2 font-medium ${textColor}`}
        >
          {title}
        </Link>
        <div className={`text-xl ${textColor}`}>
          {status === "loading" ? (
            <div className="w-10 h-5 bg-gray-200 animate-pulse rounded" />
          ) : status === "error" ? (
            <span className="text-red-500">Error</span>
          ) : (
            <AnimatePresence>
              <motion.span
                key={number}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {number}
              </motion.span>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffCard;
