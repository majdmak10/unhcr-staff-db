"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/types/user.types";
import StatusMessage from "@/components/form/StatusMessage";
import { fetchCurrentUser } from "@/utils/fetchUser";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProfilePageHeader from "@/components/profile/ProfilePageHeader";
import ProfilePicture from "@/components/profile/ProfilePicture";

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <StatusMessage message="Loading profile..." type="loading" />;
  if (error) return <StatusMessage message={error} type="error" />;
  if (!user) return <StatusMessage message="User not found" />;

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Users", href: "/dashboard/users" },
          { label: `${user.fullName}`, href: `/dashboard/users/${user.id}` },
        ]}
      />
      <div className="flex flex-col gap-3 bg-white rounded-lg w-full p-4 shadow">
        <ProfilePageHeader id="me" type="users" />

        <div className="flex flex-col justify-center items-center gap-4 w-full mx-auto md:w-[30%] bg-white rounded-lg p-4 shadow mb-5 border border-gray-200">
          <ProfilePicture
            profilePicture={user.profilePicture}
            fullName={user.fullName}
            sex={user.sex as "Male" | "Female"} // Cast if `sex` isn't already this type
          />
          <h1 className="text-2xl font-semibold mt-3">{user.fullName}</h1>
          <p className="font-semibold">
            Position: <span className="font-normal">{user.position}</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-normal">{user.email}</span>
          </p>
          <p className="font-semibold">
            Role: <span className="font-normal">{user.role}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
