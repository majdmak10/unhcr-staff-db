import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { User } from "@/models";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const { id } = params;
    const body = await req.json(); // Get updated admin data

    // Validate if the user exists
    const admin = await User.findById(id);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Admin not found" },
        { status: 404 }
      );
    }

    // Update admin details
    Object.assign(admin, body);
    await admin.save();

    return NextResponse.json({ success: true, data: admin }, { status: 200 });
  } catch (error) {
    console.error("Error updating admin:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update admin" },
      { status: 500 }
    );
  }
}
