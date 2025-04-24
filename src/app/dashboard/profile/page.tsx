"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProfilePicture } from "@/utils/userUtils";
import { IUser } from "@/types/user.types";
import StatusMessage from "@/components/form/StatusMessage";
import { fetchCurrentUser } from "@/utils/fetchUser";

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

  if (loading) return <StatusMessage message="Loading profile..." />;
  if (error) return <StatusMessage message={error} type="error" />;
  if (!user) return <StatusMessage message="User not found" />;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 relative rounded-full overflow-hidden mb-4 border-4 border-gray-200">
                <Image
                  src={getProfilePicture(user.profilePicture, user.sex)}
                  alt={`${user.fullName}'s Profile Picture`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <Link
                href="/dashboard/profile/edit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center w-full"
              >
                Edit Profile
              </Link>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {[
                  { label: "Full Name", value: user.fullName },
                  { label: "Email", value: user.email },
                  { label: "Position", value: user.position },
                  { label: "Sex", value: user.sex },
                  { label: "Role", value: user.role },
                ].map((item, i) => (
                  <div key={i}>
                    <h2 className="text-sm text-gray-500 mb-1">{item.label}</h2>
                    <p className="text-lg font-medium">{item.value || "N/A"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
