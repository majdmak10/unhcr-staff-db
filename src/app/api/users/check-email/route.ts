import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models";

export async function GET(req: Request) {
  try {
    await connectToDb();
    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    return NextResponse.json({ exists: !!existingUser });
  } catch (error) {
    console.error("Error checking email:", error);
    return NextResponse.json(
      { success: false, message: "Error checking email" },
      { status: 500 }
    );
  }
}
