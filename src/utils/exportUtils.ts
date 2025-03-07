export const exportToCSV = (table) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    table
      .getRowModel()
      .rows.map((row) =>
        row
          .getVisibleCells()
          .map((cell) => cell.getValue())
          .join(",")
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
};
