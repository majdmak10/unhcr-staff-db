import { Table } from "@tanstack/react-table";
import {
  Document,
  Packer,
  Paragraph,
  Table as DocTable,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
} from "docx";
import * as XLSX from "xlsx";

/**
 * Export table data to CSV
 */
export const exportToCSV = <TData>(table: Table<TData>) => {
  // Filter out unwanted columns
  const columns = table
    .getAllColumns()
    .filter((col) => !["profilePicture", "actions"].includes(col.id));
  const headers = columns.map((col) => col.columnDef.header as string);
  const rows = table
    .getRowModel()
    .rows.map((row) => columns.map((col) => row.getValue(col.id) ?? ""));

  // Format CSV content
  const csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n${rows
    .map((r) => r.join(","))
    .join("\n")}`;
  const encodedUri = encodeURI(csvContent);

  // Create download link
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
};

/**
 * Export table data to Excel
 */
export const exportToExcel = <TData>(table: Table<TData>) => {
  // Filter out unwanted columns
  const columns = table
    .getAllColumns()
    .filter((col) => !["profilePicture", "actions"].includes(col.id));
  const headers = [columns.map((col) => col.columnDef.header as string)];
  const rows = table
    .getRowModel()
    .rows.map((row) => columns.map((col) => row.getValue(col.id) ?? ""));

  // Create a new worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([...headers, ...rows]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Table Data");

  // Export Excel file
  XLSX.writeFile(workbook, "data.xlsx");
};

/**
 * Export table data to Word (.docx)
 */
export const exportToWord = <TData>(table: Table<TData>) => {
  // Filter out unwanted columns
  const columns = table
    .getAllColumns()
    .filter((col) => !["profilePicture", "actions"].includes(col.id));
  const headers = columns.map((col) => col.columnDef.header as string);
  const rows = table
    .getRowModel()
    .rows.map((row) => columns.map((col) => row.getValue(col.id) ?? ""));

  // Create Word Table
  const wordTable = new DocTable({
    rows: [
      new TableRow({
        children: headers.map(
          (header) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: header, bold: true })],
                }),
              ],
              width: { size: 25, type: WidthType.PERCENTAGE },
            })
        ),
      }),
      ...rows.map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [new Paragraph(cell ? cell.toString() : "")],
                  width: { size: 25, type: WidthType.PERCENTAGE },
                })
            ),
          })
      ),
    ],
  });

  const doc = new Document({
    sections: [{ children: [wordTable] }],
  });

  Packer.toBlob(doc).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.docx";
    document.body.appendChild(link);
    link.click();
  });
};
