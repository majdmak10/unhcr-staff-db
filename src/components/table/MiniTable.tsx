import React, { useState } from "react";

interface MiniStaff {
  fullName: string;
  position?: string;
  unhcrEmail?: string;
  mobileSyriatel?: string;
  mobileMtn?: string;
  extension?: string;
}

interface MiniTableProps {
  data: MiniStaff[];
}

const MiniTable = ({ data }: MiniTableProps) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Syriatel</th>
            <th className="p-2 border">MTN</th>
            <th className="p-2 border">Ext</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((staff, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{staff.fullName}</td>
              <td className="p-2 border">{staff.position || "N/A"}</td>
              <td className="p-2 border">{staff.unhcrEmail || "N/A"}</td>
              <td className="p-2 border">{staff.mobileSyriatel || "N/A"}</td>
              <td className="p-2 border">{staff.mobileMtn || "N/A"}</td>
              <td className="p-2 border">{staff.extension || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-2 flex justify-center space-x-2 text-sm">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MiniTable;
