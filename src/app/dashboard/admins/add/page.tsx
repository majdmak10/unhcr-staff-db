"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IUser, UserRole } from "@/types/user.types";

const AddUserPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<IUser, "id">>({
    fullName: "",
    sex: "",
    position: "",
    email: "",
    password: "",
    role: UserRole.Guest,
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    if (profileImage) {
      formDataToSend.append("profilePicture", profileImage);
    }

    console.log("Submitting form with:", formDataToSend);

    try {
      const response = await fetch("/api/users/add", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add user");
      }

      console.log("User added successfully:", data);
      setSuccessMessage("User added successfully!");
      setTimeout(() => router.push("/users"), 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4">Add New User</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center">{successMessage}</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
          aria-label="Select Sex"
        >
          <option value="">Select Sex</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          aria-label="Upload Profile Picture"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
