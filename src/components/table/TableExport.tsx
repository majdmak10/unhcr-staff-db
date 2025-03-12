"use client";

import { useRef, useEffect } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver"; // For saving the file

interface Column {
  key: string;
  label: string | React.JSX.Element;
  width?: string;
}

interface ExportProps {
  columns: Column[];
  visibleColumns: string[];
  data: Array<{ [key: string]: string | React.JSX.Element }>;
  selectedRows?: number[];
  onClose: () => void;
}

const TableExport: React.FC<ExportProps> = ({
  columns,
  visibleColumns,
  data,
  selectedRows,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const processData = () => {
    try {
      // Filter columns to exclude checkbox, profilePicture, and actions
      const exportableColumns = columns.filter(
        (col) =>
          visibleColumns.includes(col.key) &&
          !["checkbox", "profilePicture", "actions"].includes(col.key)
      );

      // If no exportable columns, return empty array
      if (exportableColumns.length === 0) {
        return { data: [], headers: [] };
      }

      // Filter rows if selectedRows is provided
      const rowsToExport = selectedRows
        ? data.filter((_, index) => selectedRows.includes(index))
        : data;

      // If no rows to export, return empty array
      if (rowsToExport.length === 0) {
        return { data: [], headers: [] };
      }

      // Create headers map (key to label)
      const headers = exportableColumns.reduce((acc, col) => {
        acc[col.key] =
          typeof col.label === "string"
            ? col.label
            : col.label?.props?.children || col.key;
        return acc;
      }, {} as { [key: string]: string });

      // Process data for export
      const processedData = rowsToExport.map((row) => {
        const processedRow: { [key: string]: string } = {};
        exportableColumns.forEach((col) => {
          const value = row[col.key];
          processedRow[headers[col.key]] =
            typeof value === "string"
              ? value
              : value?.props?.children
              ? String(value.props.children)
              : "";
        });
        return processedRow;
      });

      return { data: processedData, headers };
    } catch (error) {
      console.error("Error processing data:", error);
      return { data: [], headers: [] };
    }
  };

  const exportToExcel = async () => {
    try {
      const { data: processedData } = processData();

      if (!processedData || processedData.length === 0) {
        alert("No data available to export");
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Aleppo Staff");

      // Add headers
      const headers = Object.keys(processedData[0]);
      worksheet.columns = headers.map((header) => ({
        header,
        key: header,
        width: 20,
      }));

      // Style the headers
      worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4F81BD" },
      };

      // Add data rows
      processedData.forEach((row) => {
        worksheet.addRow(row);
      });

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        "0"
      )}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${today.getFullYear()}`;

      // Save the file with the desired name
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Aleppo_Staff_${formattedDate}.xlsx`);
      onClose();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  const exportToWord = () => {
    try {
      const { data: processedData } = processData();

      if (!processedData || processedData.length === 0) {
        alert("No data available to export");
        return;
      }

      let docContent =
        '<html><body><table border="1" style="border-collapse: collapse; width: 100%;">';

      // Add header row with styling
      if (processedData.length > 0) {
        docContent += '<tr style="background-color: #f2f2f2;">';
        Object.keys(processedData[0]).forEach((key) => {
          docContent += `<th style="padding: 8px; text-align: left; border: 1px solid #ddd; font-weight: bold;">${key}</th>`;
        });
        docContent += "</tr>";

        // Add data rows
        processedData.forEach((row) => {
          docContent += "<tr>";
          Object.values(row).forEach((value) => {
            docContent += `<td style="padding: 8px; border: 1px solid #ddd;">${value}</td>`;
          });
          docContent += "</tr>";
        });
      }

      docContent += "</table></body></html>";

      const today = new Date();
      const formattedDate = `${String(today.getDate()).padStart(
        2,
        "0"
      )}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${today.getFullYear()}`;

      const blob = new Blob([docContent], { type: "application/msword" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Aleppo_Staff_${formattedDate}.doc`;
      link.click();
      onClose();
    } catch (error) {
      console.error("Error exporting to Word:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 mt-2 py-2 bg-white border-1 border-gray-200 rounded shadow-lg w-36 animate-in fade-in duration-200 text-sm z-50"
    >
      <button
        onClick={exportToExcel}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        Export to Excel
      </button>
      <button
        onClick={exportToWord}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
      >
        Export to Word
      </button>
    </div>
  );
};

export default TableExport;
