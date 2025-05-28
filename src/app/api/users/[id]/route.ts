import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDb();

    // Await the params since it's now a Promise
    const { id } = await params;

    const admin = await User.findById(id);

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: admin }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch admin" },
      { status: 500 }
    );
  }
}
