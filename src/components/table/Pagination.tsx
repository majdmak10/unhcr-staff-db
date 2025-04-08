const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  staffPerPage,
  setStaffPerPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  staffPerPage: number;
  setStaffPerPage: (value: number) => void;
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStaffPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  return (
    <div className="flex items-center justify-between p-4 text-gray-600">
      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="text-gray-600 w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 bg-white hover:bg-gray-200 text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          &#10094;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`text-gray-600 w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-sm cursor-pointer ${
              currentPage === index + 1
                ? "bg-mBlue text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="text-gray-600 w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 bg-white hover:bg-gray-200 text-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          &#10095;
        </button>
      </div>

      {/* Rows per page selection */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Rows per page:</span>
        <select
          aria-label="Rows per page selection"
          value={staffPerPage}
          onChange={handleRowsPerPageChange}
          className="p-1 border border-gray-400 rounded-md text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={50}>100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
