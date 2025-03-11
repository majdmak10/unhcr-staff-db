"use client";

import React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface MetadataWatcherProps {
  eventName: string;
}

const MetadataWatcher: React.FC<MetadataWatcherProps> = ({ eventName }) => {
  const pathname = usePathname();

  useEffect(() => {
    const event = new CustomEvent("dashboardMetadataChange", {
      detail: pathname,
    });
    window.dispatchEvent(event);
  }, [pathname, eventName]);

  return null;
};

export default MetadataWatcher;
