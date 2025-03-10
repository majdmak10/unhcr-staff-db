"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IUser } from "@/types/user.types";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const AdminProfilePage = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`/api/users/get/${id}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch admin");

        setAdmin(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <main className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Admins", href: "/dashboard/admins" },
          {
            label: admin?.fullName || "Admin Profile",
            href: `/dashboard/admins/${id}`,
          },
        ]}
      />

      <div className="flex flex-col items-center gap-4 mt-4">
        <Image
          src={admin?.profilePicture || "/default-avatar.png"}
          alt={admin?.fullName || "Admin"}
          width={100}
          height={100}
          className="w-24 h-24 rounded-full border"
        />

        <h2 className="text-xl font-semibold">{admin?.fullName}</h2>
        <p className="text-gray-600">{admin?.email}</p>

        <div className="w-full flex flex-col gap-2 mt-4">
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">Position:</span>
            <span>{admin?.position}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="font-medium">Role:</span>
            <span className="text-blue-500">{admin?.role}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            href={`/dashboard/admins/edit/${id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit Admin
          </Link>
          <button
            onClick={() => console.log(`Deleting ${id}`)}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete Admin
          </button>
        </div>
      </div>
    </main>
  );
};

export default AdminProfilePage;
