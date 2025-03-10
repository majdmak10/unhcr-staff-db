"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { IUser, UserRole } from "@/types/user.types";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const rolesList = ["Admin", "Super Admin", "Editor", "Viewer"];

const EditAdminPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<IUser>>({
    fullName: "",
    email: "",
    position: "",
    role: "" as UserRole, // Cast empty string as valid type
    profilePicture: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchAdmin = async () => {
      try {
        const response = await fetch(`/api/users/get/${id}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch admin");

        setFormData(data.data); // Directly update formData instead of using admin state
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let profilePictureUrl = formData.profilePicture;

      // Upload profile picture if changed
      if (selectedFile) {
        const formDataImage = new FormData();
        formDataImage.append("file", selectedFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataImage,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok)
          throw new Error(uploadData.message || "Failed to upload image");

        profilePictureUrl = uploadData.url;
      }

      // Update admin data
      const updatedData = { ...formData, profilePicture: profilePictureUrl };
      const response = await fetch(`/api/users/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update admin");

      router.push(`/dashboard/admins/${id}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <main className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Admins", href: "/dashboard/admins" },
          { label: "Edit Admin", href: `/dashboard/admins/edit/${id}` },
        ]}
      />

      <h2 className="text-2xl font-semibold text-center mb-4">Edit Admin</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <Image
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : formData.profilePicture || "/default-avatar.png"
            }
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2"
          />
        </div>

        {/* Full Name */}
        <label className="flex flex-col">
          <span className="font-medium">Full Name</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        {/* Email */}
        <label className="flex flex-col">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        {/* Position */}
        <label className="flex flex-col">
          <span className="font-medium">Position</span>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </label>

        {/* Role */}
        <label className="flex flex-col">
          <span className="font-medium">Role</span>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            {rolesList.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {isSubmitting ? "Updating..." : "Update Admin"}
        </button>
      </form>
    </main>
  );
};

export default EditAdminPage;
