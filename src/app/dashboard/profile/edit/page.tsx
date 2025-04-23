"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProfilePicture } from "@/utils/userUtils";

// Form input component
const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const EditProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    email: "",
    position: "",
    sex: "",
    password: "",
    confirmPassword: "",
    profilePicture: null as File | null,
    currentProfilePicture: "",
  });

  // Preview state
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
        if (data.success && data.user) {
          setFormData({
            id: data.user._id,
            fullName: data.user.fullName || "",
            email: data.user.email || "",
            position: data.user.position || "",
            sex: data.user.sex || "",
            password: "",
            confirmPassword: "",
            profilePicture: null,
            currentProfilePicture: data.user.profilePicture || "",
          });
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profilePicture: file }));

      // Create preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);

      // Clean up the URL when component unmounts
      return () => URL.revokeObjectURL(fileUrl);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("id", formData.id);
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("position", formData.position);
      form.append("sex", formData.sex);

      // Only append password fields if they are filled
      if (formData.password) {
        form.append("password", formData.password);
        form.append("confirmPassword", formData.confirmPassword);
      }

      if (formData.profilePicture) {
        form.append("profilePicture", formData.profilePicture);
      }

      const response = await fetch("/api/users/update", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading profile data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Edit My Profile</h1>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 relative rounded-full overflow-hidden border-2 border-gray-300">
                      <Image
                        src={
                          previewImage ||
                          getProfilePicture(
                            formData.currentProfilePicture,
                            formData.sex
                          )
                        }
                        alt="Profile Picture"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <label className="cursor-pointer bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">
                      <span>Choose File</span>
                      <input
                        type="file"
                        name="profilePicture"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <InputField
                  id="fullName"
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange({
                      ...e,
                      target: { ...e.target, name: "fullName" },
                    })
                  }
                  required
                />

                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange({
                      ...e,
                      target: { ...e.target, name: "email" },
                    })
                  }
                  required
                />

                <div className="mb-4">
                  <label
                    htmlFor="sex"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <InputField
                  id="position"
                  label="Position"
                  type="text"
                  value={formData.position}
                  onChange={(e) =>
                    handleInputChange({
                      ...e,
                      target: { ...e.target, name: "position" },
                    })
                  }
                  required
                />

                <InputField
                  id="password"
                  label="Password (leave blank to keep current)"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange({
                      ...e,
                      target: { ...e.target, name: "password" },
                    })
                  }
                  placeholder="Enter new password"
                />

                <InputField
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange({
                      ...e,
                      target: { ...e.target, name: "confirmPassword" },
                    })
                  }
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                  submitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
