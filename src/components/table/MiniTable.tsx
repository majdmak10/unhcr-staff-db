"use client";

import { useEffect, useState, useMemo } from "react";
import Pagination from "@/components/table/Pagination"; // adjust path as needed
import Image from "next/image";
import Link from "next/link";

interface Column {
  key: string;
  label: string;
  widthClass?: string;
  responsive?: boolean; // ✅ Optional field for hiding on small screens
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
    <main className=" bg-white">
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
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`group p-3 border-b border-gray-200 text-gray-600 font-semibold text-sm text-left items-center sticky top-0 tracking-wide bg-white ${
                        col.widthClass || ""
                      } ${col.responsive ? "hidden sm:table-cell" : ""}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-gray-100 transition duration-150 text-sm items-center"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-3 py-1 border-b border-gray-200 ${
                          col.widthClass || ""
                        } ${col.responsive ? "hidden sm:table-cell" : ""}`}
                      >
                        {col.key === "profilePicture" ? (
                          <div className="w-12 h-12">
                            <Image
                              src={
                                row.profilePicture ||
                                (row.sex === "Male"
                                  ? "/avatars/noProfilePicture_m.png"
                                  : "/avatars/noProfilePicture_f.png")
                              }
                              alt={`${row.fullName}'s Profile Picture`}
                              width={48}
                              height={48}
                              className="rounded-full object-cover w-12 h-12 border shadow-sm"
                            />
                          </div>
                        ) : col.key === "fullName" ? (
                          <Link
                            href={`/dashboard/staff/${row._id}`}
                            className="hover:underline"
                          >
                            {row.fullName}
                          </Link>
                        ) : !row[col.key]?.toString().trim() ? (
                          <span className="text-mText">N/A</span>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                staffPerPage={rowsPerPage}
                setStaffPerPage={() => {}}
                showRowsPerPage={false}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MiniTable;
