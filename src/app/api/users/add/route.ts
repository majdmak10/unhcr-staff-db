import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models";
import { writeFile } from "fs/promises";
import path from "path";
import { IUser } from "@/types/user.types";

export async function POST(req: Request) {
  try {
    await connectToDb();

    // Parse form data
    const formData = await req.formData();
    const profilePicture = formData.get("profilePicture") as File | null;
    const userData: Partial<IUser> = Object.fromEntries(formData.entries());

    console.log("Received user data:", userData);

    // Ensure required fields exist
    if (
      !userData.fullName ||
      !userData.email ||
      !userData.password ||
      !userData.role
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email is already existing" },
        { status: 400 }
      );
    }

    // Handle profile picture upload
    let profilePictureUrl = "";
    if (profilePicture) {
      console.log("Processing profile picture:", profilePicture.name);

      // Convert image to Buffer and save
      const buffer = Buffer.from(await profilePicture.arrayBuffer());
      const fileName = `${Date.now()}-${profilePicture.name.replace(
        /\s+/g,
        "_"
      )}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);
      console.log("Profile picture saved at:", filePath);

      profilePictureUrl = `/uploads/${fileName}`;
    } else {
      console.log("No profile picture uploaded");
    }

    // Ensure profilePictureUrl is set correctly
    console.log("Final Profile Picture URL:", profilePictureUrl);

    // Create new user
    const newUser = new User({
      ...userData,
      profilePicture: profilePictureUrl,
    });
    console.log("Saving user to database:", newUser);

    await newUser.save();

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add user" },
      { status: 500 }
    );
  }
}
