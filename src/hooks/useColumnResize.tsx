import { useState, useCallback, useMemo } from "react";

interface ColumnResizeState {
  [key: string]: number; // Column key mapped to its width
}

export const useColumnResize = (initialWidths: ColumnResizeState = {}) => {
  const [columnWidths, setColumnWidths] =
    useState<ColumnResizeState>(initialWidths);
  const [isResizing, setIsResizing] = useState(false); // Track resizing state

  const handleMouseDown = useCallback(
    (columnKey: string, startX: number) => {
      const initialWidth = columnWidths[columnKey] || 150; // Default width
      setIsResizing(true); // Start resizing

      const handleMouseMove = (event: MouseEvent) => {
        const deltaX = event.clientX - startX;
        setColumnWidths((prevWidths) => ({
          ...prevWidths,
          [columnKey]: Math.max(50, initialWidth + deltaX), // Minimum width 50px
        }));
      };

      const handleMouseUp = () => {
        setIsResizing(false); // End resizing
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [columnWidths]
  );

  const resetWidths = useCallback(() => {
    setColumnWidths(initialWidths);
  }, [initialWidths]);

  // Check if column widths have been modified
  const isWidthModified = useMemo(() => {
    return Object.keys(initialWidths).some(
      (key) => columnWidths[key] !== initialWidths[key]
    );
  }, [columnWidths, initialWidths]);

  return {
    columnWidths,
    startResizing: handleMouseDown,
    resetWidths,
    isResizing, // Return resizing state
    isWidthModified,
  };
};
