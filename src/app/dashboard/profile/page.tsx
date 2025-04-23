"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProfilePicture } from "@/utils/userUtils";
import { IUser } from "@/types/user.types";

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.error || "Failed to load profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err instanceof Error ? err.message : "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">User not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
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

            {/* Profile Information */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <h2 className="text-sm text-gray-500 mb-1">Full Name</h2>
                  <p className="text-lg font-medium">{user.fullName}</p>
                </div>

                <div>
                  <h2 className="text-sm text-gray-500 mb-1">Email</h2>
                  <p className="text-lg font-medium">{user.email}</p>
                </div>

                <div>
                  <h2 className="text-sm text-gray-500 mb-1">Position</h2>
                  <p className="text-lg font-medium">{user.position}</p>
                </div>

                <div>
                  <h2 className="text-sm text-gray-500 mb-1">Gender</h2>
                  <p className="text-lg font-medium">{user.sex}</p>
                </div>

                <div>
                  <h2 className="text-sm text-gray-500 mb-1">Role</h2>
                  <p className="text-lg font-medium">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
