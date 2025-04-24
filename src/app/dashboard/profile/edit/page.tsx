"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import AddEditActions from "@/components/form/AddEditActions";
import StatusMessage from "@/components/form/StatusMessage";
import { getProfilePicture } from "@/utils/userUtils";
import { fetchCurrentUser } from "@/utils/fetchUser";

const EditProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const passwordChanged = Boolean(formData.password);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
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

      const res = await fetch("/api/users/update", {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      if (passwordChanged) {
        setSuccess("Password changed successfully. Logging out...");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // short delay for UI feedback
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        return;
      }

      setSuccess("Profile updated successfully!");
      setTimeout(() => router.push("/dashboard/profile"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    }
  };

  if (loading) return <StatusMessage message="Loading profile data..." />;

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Profile", href: "/dashboard/profile" },
          { label: "Edit Profile", href: "/dashboard/profile/edit" },
        ]}
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow"
      >
        {error && <StatusMessage message={error} type="error" />}
        {success && <StatusMessage message={success} type="success" />}

        <h1 className="font-semibold text-lg">Edit My Profile</h1>
        <input type="hidden" name="id" value={formData.id} />

        <div className="flex flex-col items-center justify-center space-y-4 w-full md:w-[80%] mx-auto">
          <UploadPicture
            variant="userEdit"
            name="profilePicture"
            initialImage={
              previewImage ||
              getProfilePicture(formData.currentProfilePicture, formData.sex)
            }
            onFileSelect={(file) => {
              setFormData((prev) => ({ ...prev, profilePicture: file }));
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
              } else {
                setPreviewImage(null);
              }
            }}
          />

          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <InputField
            label="Position"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Enter position"
          />

          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <SelectField
            label="Sex"
            id="sex"
            name="sex"
            defaultValue={formData.sex}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            placeholder="Select sex"
          />

          <InputField
            label="New Password (leave blank to keep current)"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
          />
        </div>

        {error && <StatusMessage message={error} type="error" />}
        {success && <StatusMessage message={success} type="success" />}

        <div className="flex justify-center items-center gap-4 mt-6">
          <AddEditActions submitTitle="Update" />
        </div>
      </form>
    </main>
  );
};

export default EditProfilePage;
