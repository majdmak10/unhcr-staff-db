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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
            <div>
              <h2 className="text-lg font-semibold text-mBlue mb-2">
                {user.fullName}
              </h2>
              <p className="text-sm mb-1">
                <span className="font-semibold">Position: </span>
                {user.position}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Email: </span>
                {user.email}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Mobile (Syriatel): </span>
                {user.mobileSyriatel || "N/A"}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Mobile (MTN): </span>
                {user.mobileMtn || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ContactPage;
