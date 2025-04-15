"use client";

import { useEffect, useState, useMemo } from "react";
import Pagination from "@/components/table/Pagination"; // adjust path as needed
import Image from "next/image";

interface Column {
  key: string;
  label: string;
}

interface MiniTableProps {
  columns: Column[];
  fetchUrl: string; // endpoint to fetch data from
}

const MiniTable = ({ columns, fetchUrl }: MiniTableProps) => {
  const [data, setData] = useState<Array<{ [key: string]: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
  }, [data, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(fetchUrl);
        if (!res.ok) throw new Error("Failed to fetch");
        const result = await res.json();
        setData(result);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="border rounded shadow bg-white">
      {/* Table Title */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mBlue" />
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-600 font-medium">
            Failed to load data. Please try again.
          </div>
        ) : data.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No data available.
          </div>
        ) : (
          <>
            <table className="w-full table-auto text-sm text-left min-w-[600px]">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-2 border-b whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-2 border-b whitespace-nowrap"
                      >
                        {col.key === "profilePicture" ? (
                          row.profilePicture ? (
                            <Image
                              src={row.profilePicture}
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                              width={20}
                              height={20}
                            />
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )
                        ) : (
                          row[col.key] || (
                            <span className="text-gray-400">N/A</span>
                          )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              staffPerPage={rowsPerPage}
              setStaffPerPage={() => {}}
              showRowsPerPage={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MiniTable;
