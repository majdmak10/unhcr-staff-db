import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models";
import { connectToDb } from "@/utils/connectToDb";

export async function POST(req: Request) {
  try {
    await connectToDb();
    const { token, password } = await req.json();

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 401 }
      );
    }

    // Find the user by decoded ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
