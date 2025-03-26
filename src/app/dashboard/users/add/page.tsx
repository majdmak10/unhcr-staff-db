"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import { addUser } from "@/lib/actions";
import AddEditActions from "@/components/form/AddEditActions";

const AddUser: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const requiredField = (value: string, fieldName: string): string | null =>
    !value || value.trim() === "" ? `${fieldName} is required` : null;

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  const validateForm = (formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const sex = formData.get("sex") as string;
    const position = formData.get("position") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as string;

    const newErrors: Record<string, string> = {};

    newErrors.fullName = requiredField(fullName, "Full Name") || "";
    newErrors.sex = requiredField(sex, "Sex") || "";
    newErrors.position = requiredField(position, "Position") || "";
    newErrors.role = requiredField(role, "Role") || "";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return Object.fromEntries(Object.entries(newErrors).filter(([, v]) => v));
  };

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await addUser(formData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({
          submit: error.message.includes("Email already exists")
            ? "Email already exists"
            : "Failed to add user. Please try again.",
        });
      } else {
        setErrors({
          submit: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Users", href: "/dashboard/users" },
          { label: "Add New User", href: "/dashboard/users/add" },
        ]}
      />
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white rounded-lg p-4"
      >
        <h1 className="font-semibold">Add New User</h1>

        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {errors.submit}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            error={errors.fullName}
          />
          <SelectField
            label="Sex"
            id="sex"
            name="sex"
            placeholder="Select sex"
            options={[
              { value: "Female", label: "Female" },
              { value: "Male", label: "Male" },
            ]}
            error={errors.sex}
          />
          <InputField
            label="Position"
            id="position"
            name="position"
            placeholder="Enter position"
            error={errors.position}
          />
          <InputField
            label="Email"
            id="email"
            name="email"
            placeholder="Enter email"
            type="email"
            error={errors.email}
          />
          <InputField
            label="Password"
            id="password"
            name="password"
            placeholder="Enter password"
            type="password"
            error={errors.password}
          />
          <InputField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            type="password"
            error={errors.confirmPassword}
          />
          <SelectField
            label="Role"
            id="role"
            name="role"
            placeholder="Select role"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Editor", label: "Editor" },
              { value: "Guest", label: "Guest" },
            ]}
            error={errors.role}
          />
          <UploadPicture name="profilePicture" />
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <AddEditActions submitTitle="Add" />
        </div>
      </form>
    </main>
  );
};

export default AddUser;
