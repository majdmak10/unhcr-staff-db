"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import { addUser } from "@/lib/actions";
import AddEditSubmitButton from "@/components/buttons/AddEditSubmitButton";
import CancelButton from "@/components/buttons/CancelButton";

const AddUser: React.FC = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData) => {
    const fullName = formData.get("fullName") as string;
    const sex = formData.get("sex") as string;
    const position = formData.get("position") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as string;

    const validatePassword = (password: string): string | null => {
      // Check if password is at least 8 characters long
      if (password.length < 8) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // Check for at least one uppercase letter
      const hasUpperCase = /[A-Z]/.test(password);
      if (!hasUpperCase) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // Check for at least one number
      const hasNumber = /[0-9]/.test(password);
      if (!hasNumber) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // Check for at least one symbol
      const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
      if (!hasSymbol) {
        return "Password must be at least 8 characters long, contain at least one capital letter, one number, and one symbol (e.g., !@#$%^&*)";
      }

      // If all checks pass, return null (no error)
      return null;
    };

    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!fullName || fullName.trim() === "") {
      newErrors.fullName = "Full Name is required";
    }

    // Sex validation
    if (!sex || sex === "") {
      newErrors.sex = "Sex is required";
    }

    // Position validation
    if (!position || position === "") {
      newErrors.position = "Position is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Valid email is required";
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

    // Role validation
    if (!role || role === "") {
      newErrors.role = "Role is required";
    }

    return newErrors;
  };

  const handleSubmit = async (formData: FormData) => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear previous errors
    setErrors({});

    try {
      await addUser(formData);
    } catch (error) {
      // Handle any submission errors
      console.error("Submission error:", error);

      // Narrow down the type of `error`
      if (error instanceof Error) {
        if (error.message === "Email already exists") {
          setErrors({ email: "Email already exists" });
        } else {
          setErrors({ submit: "Failed to add user. Please try again." });
        }
      } else {
        // Handle cases where `error` is not an Error object
        setErrors({
          submit: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  //   const handleCancel = () => {
  //     router.push("/dashboard/users");
  //   };

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
            type="position"
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
            placeholder="Enter confirm password"
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
          <AddEditSubmitButton title="Add" />
          <CancelButton />
        </div>
      </form>
    </main>
  );
};

export default AddUser;
