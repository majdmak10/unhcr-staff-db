// api/users/update-profile/route.ts
import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";

interface UpdateFields {
  fullName: string;
  position: string;
  sex: string;
  email: string;
  password?: string;
  profilePicture?: string;
  slug?: string;
}

export async function POST(req: Request) {
  try {
    await connectToDb();

    // Get JWT from cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    if (!decoded || !decoded.id) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    // Get the form data
    const formData = await req.formData();
    const userId = decoded.id; // Get user ID from token, not from form
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const sex = formData.get("sex") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const profilePictureFile = formData.get("profilePicture") as File | null;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check if email is already in use by another user
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "Email is already in use" },
          { status: 400 }
        );
      }
    }

    // Update fields
    const updateFields: UpdateFields = {
      fullName,
      position,
      sex,
      email,
    };

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
        "profile_picture",
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
      profilePicturePath = `/uploads/profile_picture/users/${uniqueFilename}`;

      // Delete old profile picture if it exists
      if (user.profilePicture) {
        const oldPath = path.join(process.cwd(), "public", user.profilePicture);
        try {
          await fs.access(oldPath);
          await fs.unlink(oldPath);
        } catch (err) {
          console.error("Error deleting old profile picture:", err);
          // Continue even if there's an error deleting the old picture
        }
      }

      updateFields.profilePicture = profilePicturePath;
    }

    // Update password if provided
    if (password && password.length > 0) {
      if (password !== confirmPassword) {
        return NextResponse.json(
          { success: false, error: "Passwords do not match" },
          { status: 400 }
        );
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    // Update slug if fullName changed
    if (fullName !== user.fullName) {
      const rawSlug = fullName.trim().toLowerCase().replace(/\s+/g, "_");
      let slug = rawSlug;
      let counter = 1;

      // Check if slug already exists
      while (await User.findOne({ slug, _id: { $ne: userId } })) {
        slug = `${rawSlug}_${counter}`;
        counter++;
      }

      updateFields.slug = slug;
    }

    // Update user in database
    await User.findByIdAndUpdate(userId, updateFields);

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
