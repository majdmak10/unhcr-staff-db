"use server";

import { Staff } from "@/models";
import { User } from "@/models";
import { connectToDb } from "@/utils/connectToDb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export interface DeleteActionResult {
  success: boolean;
  error?: unknown;
}

export const addStaff = async (formData: FormData): Promise<void> => {
  const profilePictureFile = formData.get("profilePicture") as File;

  const emergencyContact = {
    fullName: formData.get("emergencyContactName") || "N/A",
    relationship: formData.get("emergencyContactRelationship") || "N/A",
    mobile: formData.get("emergencyContactMobile") || "N/A",
  };

  const address = {
    neighborhood: formData.get("addressNeighborhood") || "N/A",
    street: formData.get("addressStreet") || "N/A",
    building: formData.get("addressBuilding") || "N/A",
    floor: formData.get("addressFloor") || "N/A",
    apartment: formData.get("addressApartment") || "N/A",
    latitude: formData.get("latitude") || "N/A",
    longitude: formData.get("longitude") || "N/A",
  };

  const {
    fullName,
    dateOfBirth,
    sex,
    nationality,
    employmentType,
    position,
    unit,
    bloodType,
    dependents,
    unhcrEmail,
    privateEmail,
    mobileSyriatel,
    mobileMtn,
    homePhone,
    extension,
    radio,
    contractType,
    contractStartDate,
    contractEndDate,
    nationalIdNumber,
    passportNumber,
    passportExpiryDate,
    unlpNumber,
    unlpExpiryDate,
    criticalStaff,
    warden,
    floorMarshal,
    etb,
    ifak,
    advancedDriving,
    insideDs,
    outsideDs,
  } = Object.fromEntries(formData) as Record<string, string>;

  try {
    await connectToDb();

    if (!fullName || fullName.trim() === "") {
      throw new Error("Full name is required to generate slug");
    }

    // Check for duplicate emails
    const existingStaffWithUnhcrEmail =
      unhcrEmail && unhcrEmail !== "N/A"
        ? await Staff.findOne({ unhcrEmail })
        : null;
    if (existingStaffWithUnhcrEmail) {
      throw new Error("UNHCR email already exists");
    }

    const existingStaffWithPrivateEmail =
      privateEmail && privateEmail !== "N/A"
        ? await Staff.findOne({ privateEmail })
        : null;
    if (existingStaffWithPrivateEmail) {
      throw new Error("Private email already exists");
    }

    // Generate slug from full name
    const rawSlug = fullName.trim().toLowerCase().replace(/\s+/g, "_");
    let slug = rawSlug;
    let counter = 1;
    while (await Staff.findOne({ slug })) {
      slug = `${rawSlug}_${counter}`;
      counter++;
    }
    console.log("Generated slug:", slug);

    // Handle profile picture upload
    let profilePicturePath = "";
    if (profilePictureFile && profilePictureFile.size > 0) {
      const originalFilename = profilePictureFile.name;
      const fileExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, fileExtension);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "profiles_pictures",
        "staff"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      const generateUniqueFilename = async (
        baseName: string,
        ext: string,
        counter = 0
      ): Promise<string> => {
        const suffix = counter > 0 ? `_${counter}` : "";
        const potentialFilename = `${baseName}${suffix}${ext}`;
        const fullPath = path.join(uploadDir, potentialFilename);

        try {
          await fs.access(fullPath);
          return generateUniqueFilename(baseName, ext, counter + 1);
        } catch {
          return potentialFilename;
        }
      };

      const uniqueFilename = await generateUniqueFilename(
        baseFilename,
        fileExtension
      );

      const bytes = await profilePictureFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fullFilePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(fullFilePath, buffer);

      profilePicturePath = `/uploads/profiles_pictures/staff/${uniqueFilename}`;
    }

    const newStaff = new Staff({
      slug,
      profilePicture: profilePicturePath,
      fullName: fullName || "N/A",
      dateOfBirth: dateOfBirth || null,
      sex: sex || "N/A",
      nationality: nationality || "N/A",
      employmentType: employmentType || "N/A",
      position: position || "N/A",
      unit: unit || "N/A",
      bloodType: bloodType || "N/A",
      dependents: dependents || "N/A",
      unhcrEmail:
        unhcrEmail && /.+@.+\..+/.test(unhcrEmail) ? unhcrEmail : undefined,
      privateEmail:
        privateEmail && /.+@.+\..+/.test(privateEmail)
          ? privateEmail
          : undefined,
      mobileSyriatel:
        mobileSyriatel && /^[0-9]{9}$/.test(mobileSyriatel)
          ? mobileSyriatel
          : null,
      mobileMtn: mobileMtn && /^[0-9]{9}$/.test(mobileMtn) ? mobileMtn : null,
      homePhone: homePhone && /^[0-9]{9}$/.test(homePhone) ? homePhone : null,
      extension: extension || "N/A",
      radio: radio || "N/A",
      emergencyContact,
      contractType: contractType || "N/A",
      contractStartDate: contractStartDate || null,
      contractEndDate: contractEndDate || null,
      nationalIdNumber: nationalIdNumber || "N/A",
      passportNumber: passportNumber || "N/A",
      passportExpiryDate: passportExpiryDate || null,
      unlpNumber: unlpNumber || "N/A",
      unlpExpiryDate: unlpExpiryDate || null,
      criticalStaff:
        criticalStaff === "true"
          ? true
          : criticalStaff === "false"
          ? false
          : null,
      warden: warden || "N/A",
      floorMarshal: floorMarshal || "N/A",
      etb: etb === "true" ? true : etb === "false" ? false : null,
      ifak: ifak === "true" ? true : ifak === "false" ? false : null,
      advancedDriving:
        advancedDriving === "true"
          ? true
          : advancedDriving === "false"
          ? false
          : null,
      insideDs:
        insideDs === "true" ? true : insideDs === "false" ? false : null,
      outsideDs:
        outsideDs === "true" ? true : outsideDs === "false" ? false : null,
      address,
    });

    await newStaff.save();
    console.log("Staff added successfully");
  } catch (err) {
    console.error("Failed to add staff:", err);
    throw err;
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};

export const updateStaff = async (formData: FormData): Promise<void> => {
  const staffId = formData.get("id") as string;
  const profilePictureFile = formData.get("profilePicture") as File;

  const emergencyContact = {
    fullName: formData.get("emergencyContactName") || "N/A",
    relationship: formData.get("emergencyContactRelationship") || "N/A",
    mobile: formData.get("emergencyContactMobile") || "N/A",
  };

  const address = {
    neighborhood: formData.get("addressNeighborhood") || "N/A",
    street: formData.get("addressStreet") || "N/A",
    building: formData.get("addressBuilding") || "N/A",
    floor: formData.get("addressFloor") || "N/A",
    apartment: formData.get("addressApartment") || "N/A",
    latitude: formData.get("latitude") || "N/A",
    longitude: formData.get("longitude") || "N/A",
  };

  try {
    await connectToDb();

    const staff = await Staff.findById(staffId);
    if (!staff) {
      throw new Error("Staff not found");
    }

    // Handle profile picture update
    let profilePicturePath = staff.profilePicture;
    if (profilePictureFile && profilePictureFile.size > 0) {
      // Remove old profile picture if it exists
      if (profilePicturePath) {
        const oldFilePath = path.join(
          process.cwd(),
          "public",
          profilePicturePath
        );
        try {
          await fs.unlink(oldFilePath);
          console.log(`Old profile picture removed: ${oldFilePath}`);
        } catch (err) {
          if (err instanceof Error) {
            console.error(
              `Failed to remove old profile picture: ${err.message}`
            );
          } else {
            console.error(
              "An unknown error occurred while removing the old profile picture."
            );
          }
        }
      }

      // Upload new profile picture
      const originalFilename = profilePictureFile.name;
      const fileExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, fileExtension);

      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "profiles_pictures",
        "staff"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      const generateUniqueFilename = async (
        baseName: string,
        ext: string,
        counter = 0
      ): Promise<string> => {
        const suffix = counter > 0 ? `_${counter}` : "";
        const potentialFilename = `${baseName}${suffix}${ext}`;
        const fullPath = path.join(uploadDir, potentialFilename);

        try {
          await fs.access(fullPath);
          return generateUniqueFilename(baseName, ext, counter + 1);
        } catch {
          return potentialFilename;
        }
      };

      const uniqueFilename = await generateUniqueFilename(
        baseFilename,
        fileExtension
      );

      const bytes = await profilePictureFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fullFilePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(fullFilePath, buffer);

      profilePicturePath = `/uploads/profiles_pictures/staff/${uniqueFilename}`;
    }

    // Update staff details
    Object.assign(staff, {
      profilePicture: profilePicturePath,
      fullName: formData.get("fullName") || staff.fullName,
      dateOfBirth: formData.get("dateOfBirth") || staff.dateOfBirth,
      sex: formData.get("sex") || staff.sex,
      nationality: formData.get("nationality") || staff.nationality,
      employmentType: formData.get("employmentType") || staff.employmentType,
      position: formData.get("position") || staff.position,
      unit: formData.get("unit") || staff.unit,
      bloodType: formData.get("bloodType") || staff.bloodType,
      dependents: formData.get("dependents") || staff.dependents,
      unhcrEmail: (() => {
        const value = formData.get("unhcrEmail")?.toString().trim();
        return value && /.+@.+\..+/.test(value) ? value : null;
      })(),
      privateEmail: (() => {
        const value = formData.get("privateEmail")?.toString().trim();
        return value && /.+@.+\..+/.test(value) ? value : null;
      })(),

      mobileSyriatel: /^[0-9]{9}$/.test(
        formData.get("mobileSyriatel") as string
      )
        ? formData.get("mobileSyriatel")
        : null,
      mobileMtn: /^[0-9]{9}$/.test(formData.get("mobileMtn") as string)
        ? formData.get("mobileMtn")
        : null,
      homePhone: /^[0-9]{9}$/.test(formData.get("homePhone") as string)
        ? formData.get("homePhone")
        : null,
      extension: formData.get("extension") || staff.extension,
      radio: formData.get("radio") || staff.radio,
      emergencyContact,
      contractType: formData.get("contractType") || staff.contractType,
      contractStartDate:
        formData.get("contractStartDate") || staff.contractStartDate,
      contractEndDate: formData.get("contractEndDate") || staff.contractEndDate,
      nationalIdNumber:
        formData.get("nationalIdNumber") || staff.nationalIdNumber,
      passportNumber: formData.get("passportNumber") || staff.passportNumber,
      passportExpiryDate:
        formData.get("passportExpiryDate") || staff.passportExpiryDate,
      unlpNumber: formData.get("unlpNumber") || staff.unlpNumber,
      unlpExpiryDate: formData.get("unlpExpiryDate") || staff.unlpExpiryDate,
      criticalStaff:
        formData.get("criticalStaff") === "true"
          ? true
          : formData.get("criticalStaff") === "false"
          ? false
          : staff.criticalStaff,
      warden: formData.get("warden") || staff.warden,
      floorMarshal: formData.get("floorMarshal") || staff.floorMarshal,
      etb:
        formData.get("etb") === "true"
          ? true
          : formData.get("etb") === "false"
          ? false
          : staff.etb,
      ifak:
        formData.get("ifak") === "true"
          ? true
          : formData.get("ifak") === "false"
          ? false
          : staff.ifak,
      advancedDriving:
        formData.get("advancedDriving") === "true"
          ? true
          : formData.get("advancedDriving") === "false"
          ? false
          : staff.advancedDriving,
      insideDs:
        formData.get("insideDs") === "true"
          ? true
          : formData.get("insideDs") === "false"
          ? false
          : staff.insideDs,
      outsideDs:
        formData.get("outsideDs") === "true"
          ? true
          : formData.get("outsideDs") === "false"
          ? false
          : staff.outsideDs,
      address,
    });

    await staff.save();
    console.log("Staff updated successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Failed to update staff:", err.message);
    } else {
      console.error("An unknown error occurred:", err);
    }
    throw err;
  }

  revalidatePath("/dashboard/staff");
  redirect("/dashboard/staff");
};

export async function deleteStaff(
  formData: FormData
): Promise<DeleteActionResult> {
  "use server";
  const { ids } = Object.fromEntries(formData) as Record<string, string>;

  try {
    const idArray = JSON.parse(ids); // Parse the JSON array of IDs
    if (!Array.isArray(idArray)) {
      throw new Error("Invalid ID format");
    }

    await connectToDb();

    // Loop through each ID to handle deletion
    for (const id of idArray) {
      // Find the staff member to get the profile picture path
      const staff = await Staff.findById(id);

      if (staff?.profilePicture) {
        const profilePicturePath = path.join(
          process.cwd(),
          "public",
          staff.profilePicture
        );

        try {
          await fs.unlink(profilePicturePath);
        } catch (fileError) {
          console.error(
            `Failed to delete profile picture for ID ${id}:`,
            fileError
          );
        }
      }

      // Delete the staff from the database
      await Staff.findByIdAndDelete(id);
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to delete staff:", err);
    return { success: false, error: err };
  }
}

export const addUser = async (formData: FormData): Promise<void> => {
  const { fullName, sex, position, email, password, confirmPassword, role } =
    Object.fromEntries(formData) as Record<string, string>;

  // Get the file from formData
  const profilePictureFile = formData.get("profilePicture") as File;

  try {
    await connectToDb();

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // 🔤 Generate slug
    const rawSlug = fullName.trim().toLowerCase().replace(/\s+/g, "_");
    let slug = rawSlug;
    let counter = 1;
    while (await User.findOne({ slug })) {
      slug = `${rawSlug}_${counter}`;
      counter++;
    }

    // Handle profile picture upload
    let profilePicturePath = "";
    if (profilePictureFile && profilePictureFile.size > 0) {
      // Get original filename and extension
      const originalFilename = profilePictureFile.name;
      const fileExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, fileExtension);

      // Ensure the upload directory exists
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "profiles_pictures",
        "users"
      );
      await fs.mkdir(uploadDir, { recursive: true });

      // Function to generate unique filename
      const generateUniqueFilename = async (
        baseName: string,
        ext: string,
        counter = 0
      ): Promise<string> => {
        const suffix = counter > 0 ? `_${counter}` : "";
        const potentialFilename = `${baseName}${suffix}${ext}`;
        const fullPath = path.join(uploadDir, potentialFilename);

        try {
          // Check if file exists
          await fs.access(fullPath);
          // If file exists, try again with incremented counter
          return generateUniqueFilename(baseName, ext, counter + 1);
        } catch {
          // File doesn't exist, so this filename is unique
          return potentialFilename;
        }
      };

      // Generate unique filename
      const uniqueFilename = await generateUniqueFilename(
        baseFilename,
        fileExtension
      );

      // Convert File to Buffer
      const bytes = await profilePictureFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Write file to public directory
      const fullFilePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(fullFilePath, buffer);

      // Store relative path for database and frontend
      profilePicturePath = `/uploads/profiles_pictures/users/${uniqueFilename}`;
    }

    const newUser = new User({
      slug,
      profilePicture: profilePicturePath,
      fullName,
      position,
      sex: sex === "Female" || sex === "Male" ? sex : "Male",
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
      role:
        role === "Admin" || role === "Editor" || role === "Guest"
          ? role
          : "Guest",
    });

    await newUser.save();
    console.log("User added successfully");
  } catch (err) {
    console.error("Failed to add user:", err);
    throw err;
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData: FormData): Promise<void> => {
  const {
    id,
    fullName,
    position,
    sex,
    email,
    password,
    confirmPassword,
    role,
  } = Object.fromEntries(formData) as Record<string, string>;

  const profilePictureFile = formData.get("profilePicture") as File;
  let profilePicturePath = "";

  if (profilePictureFile && profilePictureFile.size > 0) {
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "profiles_pictures",
      "users"
    );
    await fs.mkdir(uploadDir, { recursive: true });

    const originalFilename = profilePictureFile.name;
    let uniqueFilename = originalFilename;
    let fileCounter = 1;

    // Check for existing files with the same name
    while (
      await fs.stat(path.join(uploadDir, uniqueFilename)).catch(() => false)
    ) {
      const nameWithoutExt = path.parse(originalFilename).name;
      const ext = path.extname(originalFilename);
      uniqueFilename = `${nameWithoutExt}-${fileCounter}${ext}`;
      fileCounter++;
    }

    const fullPath = path.join(uploadDir, uniqueFilename);

    // Write the new profile picture
    const buffer = Buffer.from(await profilePictureFile.arrayBuffer());
    await fs.writeFile(fullPath, buffer);

    profilePicturePath = `/uploads/profiles_pictures/users/${uniqueFilename}`;
  }

  try {
    await connectToDb();

    // Fetch existing user data to delete old profile picture
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const oldProfilePicturePath = existingUser.profilePicture;
    const oldFullPath = oldProfilePicturePath
      ? path.join(process.cwd(), "public", oldProfilePicturePath)
      : null;

    const updateFields = {
      ...(profilePicturePath ? { profilePicture: profilePicturePath } : {}),
      fullName,
      position,
      sex,
      email,
      password,
      confirmPassword,
      role,
    };

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key as keyof typeof updateFields] === "" || undefined) {
        delete updateFields[key as keyof typeof updateFields];
      }
    });

    // Update the user data in the database
    await User.findByIdAndUpdate(id, updateFields);

    // Delete the old profile picture if it exists and is different from the new one
    if (
      oldFullPath &&
      oldFullPath !== path.join(process.cwd(), profilePicturePath)
    ) {
      await fs.unlink(oldFullPath).catch((err) => {
        console.error("Failed to delete old profile picture:", err);
      });
    }

    console.log("User updated successfully");
  } catch (err) {
    console.error("Failed to update user:", err);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export async function deleteUser(
  formData: FormData
): Promise<DeleteActionResult> {
  "use server";
  const { ids } = Object.fromEntries(formData) as Record<string, string>;

  try {
    if (!ids) {
      throw new Error("IDs are missing in the form data.");
    }

    const idArray = JSON.parse(ids); // Parse the JSON array of IDs
    if (!Array.isArray(idArray) || idArray.length === 0) {
      throw new Error("Invalid or empty ID array.");
    }

    await connectToDb();

    for (const id of idArray) {
      const user = await User.findById(id);

      if (user?.email === "makdessi@unhcr.org") {
        return {
          success: false,
          error: "This user cannot be deleted.",
        };
      }

      if (user?.profilePicture) {
        const profilePicturePath = path.join(
          process.cwd(),
          "public",
          user.profilePicture
        );

        try {
          await fs.unlink(profilePicturePath);
        } catch (fileError) {
          console.error(
            `Failed to delete profile picture for ID ${id}:`,
            fileError
          );
        }
      }

      await User.findByIdAndDelete(id);
    }

    return { success: true };
  } catch (err) {
    console.error("Failed to delete user:", err);
    return { success: false, error: err instanceof Error ? err.message : err };
  }
}
