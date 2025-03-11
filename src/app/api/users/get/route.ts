import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models";

export async function GET() {
  try {
    await connectToDb(); // Ensure MongoDB is connected

    const users = await User.find({}).sort({ createdAt: -1 }); // Get all users sorted by latest
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
