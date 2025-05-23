import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models";
import { NextResponse } from "next/server";

const contactUserNames = [
  "Mazen Al-Baqain",
  "Majd Makdessi",
  "Ahmad Al-Shaghel",
  "Oula Kudsi",
  "Kinan Youssef",
  "Test 2",
];

export async function GET() {
  try {
    await connectToDb();

    const users = await User.find({ fullName: { $in: contactUserNames } });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching contact users:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact users" },
      { status: 500 }
    );
  }
}
