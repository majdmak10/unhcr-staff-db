"use client";

import { useEffect, useState } from "react";
import Table from "@/components/table/Table";
import adminsColumns from "@/constants/columns/adminColumns";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { IUser } from "@/types/user.types";
import AddButton from "@/components/buttons/AddButton";

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

        // Ensure MongoDB `_id` is mapped to `id` safely
        const formattedAdmins: IUser[] = data.data.map(
          (admin: IUser & { _id: string }) => ({
            ...admin,
            id: admin._id, // Map `_id` to `id`
          })
        );

        setAdmins(formattedAdmins);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Delete selected rows
  const handleDeleteSelected = (selectedRowIds: string[]) => {
    setAdmins((prev) =>
      prev.filter((admin) => !selectedRowIds.includes(admin.id))
    );
  };

  return (
    <main className="flex flex-col gap-3 w-full min-w-full">
      <div className="flex items-center justify-between bg-white rounded-lg p-4">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "All Admins", href: "/dashboard/admins" },
          ]}
        />
        <AddButton href="/dashboard/admins/add" />
      </div>
      {!loading && !error && admins.length > 0 && (
        <Table
          data={admins}
          columns={adminsColumns}
          onDeleteSelected={handleDeleteSelected}
        />
      )}
    </main>
  );
};

export default AdminsPage;
