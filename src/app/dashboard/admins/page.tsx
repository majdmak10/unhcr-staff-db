"use client";

import { useEffect, useState } from "react";
import Table from "@/components/table/Table";
import adminsColumns from "@/constants/columns/adminsColumns";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { IUser } from "@/types/user.types"; // ✅ Import correct type

const AdminsPage = () => {
  const [admins, setAdmins] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/api/users/get");
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch admins");
        setAdmins(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="w-full min-w-full">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Admins", href: "/dashboard/admins" },
          ]}
        />
      </div>
      {!loading && !error && admins.length > 0 && (
        <Table data={admins} columns={adminsColumns} />
      )}
    </div>
  );
};

export default AdminsPage;
