"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProfilePicture } from "@/utils/userUtils";
import { fetchCurrentUser } from "@/utils/fetchUser";
import StatusMessage from "@/components/form/StatusMessage";
import InputField from "@/components/form/InputFiled";

const EditProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  useEffect(() => {
    fetchCurrentUser()
      .then((user) => {
        setFormData({
          id: user._id,
          fullName: user.fullName || "",
          email: user.email || "",
          position: user.position || "",
          sex: user.sex || "",
          password: "",
          confirmPassword: "",
          profilePicture: null,
          currentProfilePicture: user.profilePicture || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const passwordChanged = Boolean(formData.password);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      const form = new FormData();
      Object.entries({
        id: formData.id,
        fullName: formData.fullName,
        email: formData.email,
        position: formData.position,
        sex: formData.sex,
      }).forEach(([key, value]) => form.append(key, value));

      if (passwordChanged) {
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

      if (!response.ok)
        throw new Error(data.error || "Failed to update profile");

      if (passwordChanged) {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        return;
      }

      setSuccess("Profile updated successfully!");
      setTimeout(() => router.push("/dashboard/profile"), 2000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <StatusMessage message="Loading profile data..." />;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Edit My Profile</h1>
        </div>

        <div className="p-6">
          {error && <StatusMessage message={error} type="error" />}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-6 mb-6">
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

              <InputField
                id="fullName"
                name="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                // required
              />
              <InputField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                // required
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

            <div>
              <InputField
                id="position"
                name="position"
                label="Position"
                type="text"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Enter your position"
                // required
              />
              <InputField
                id="password"
                name="password"
                label="Password (leave blank to keep current)"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
              <InputField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </div>

            <div className="md:col-span-2 mt-8 flex justify-end space-x-4">
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
