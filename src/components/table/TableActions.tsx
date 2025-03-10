interface TableActionsProps {
  selectedCount: number;
  onReset: () => void;
  onDelete: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  selectedCount,
  onReset,
  onDelete,
}) => {
  if (selectedCount === 0) return null; // ✅ Hides actions if no rows are selected

  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mt-2">
      <span className="text-gray-700">{selectedCount} row(s) selected</span>

      <div className="space-x-3">
        <button
          onClick={onReset}
          className="px-3 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
        >
          Reset
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default TableActions;
