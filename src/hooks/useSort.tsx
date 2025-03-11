import { useState, useMemo } from "react";
import React, { ReactElement } from "react";

interface SortState<T> {
  column: keyof T | null;
  direction: "asc" | "desc" | null;
}

export const useSort = <T extends object>(
  data: T[],
  initialColumn: keyof T | null = null,
  disableSortingFor: Array<keyof T> = []
) => {
  const [sortState, setSortState] = useState<SortState<T>>({
    column: initialColumn,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) return data;

    const columnKey = sortState.column;

    const getTextValue = (value: unknown): string => {
      if (typeof value === "string") return value.toLowerCase();
      if (
        React.isValidElement(value) &&
        (value as ReactElement<{ children?: string }>).props.children &&
        typeof (value as ReactElement<{ children?: string }>).props.children ===
          "string"
      ) {
        return (
          value as ReactElement<{ children: string }>
        ).props.children.toLowerCase();
      }
      return ""; // Fallback for unsupported types
    };

    return [...data].sort((a, b) => {
      const aValue = getTextValue(a[columnKey]);
      const bValue = getTextValue(b[columnKey]);

      if (aValue < bValue) return sortState.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortState.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortState]);

  const handleSort = (column: keyof T | null) => {
    if (column === null) {
      // Reset sorting
      setSortState({ column: null, direction: null });
      return;
    }

    if (disableSortingFor.includes(column)) {
      return; // Skip sorting for disabled columns
    }

    setSortState((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  return { sortedData, sortState, handleSort };
};
