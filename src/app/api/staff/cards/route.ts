import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { Staff } from "@/models";

export const GET = async () => {
  try {
    await connectToDb();

    const totalStaff = await Staff.countDocuments();
    const staffInsideDS = await Staff.countDocuments({ insideDs: true });
    const staffOutsideDS = await Staff.countDocuments({ outsideDs: true });

    return NextResponse.json({
      total: totalStaff,
      insideDs: staffInsideDS,
      outsideDs: staffOutsideDS,
    });
  } catch (error) {
    console.error("Failed to fetch staff counts", error);
    return NextResponse.json(
      { message: "Failed to fetch staff counts" },
      { status: 500 }
    );
  }
};
