"use client";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useEffect, useState } from "react";
import { IUser } from "@/types/user.types";
import ProfilePicture from "@/components/profile/ProfilePicture";

const ContactPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">Loading contacts...</p>;

  return (
    <main className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between bg-white rounded-lg shadow">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Contact", href: "/dashboard/contact" },
          ]}
          className="shadow-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <div className="flex justify-center mb-4">
              <ProfilePicture
                profilePicture={user.profilePicture}
                fullName={user.fullName}
                sex={
                  user.sex === "Male" || user.sex === "Female"
                    ? user.sex
                    : "Male"
                }
              />
            </div>
            <h2 className="text-lg font-semibold">{user.fullName}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">
              Syriatel: {user.mobileSyriatel || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              MTN: {user.mobileMtn || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ContactPage;
