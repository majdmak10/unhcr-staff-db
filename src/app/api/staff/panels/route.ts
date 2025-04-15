import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { Staff } from "@/models";

export const GET = async () => {
  try {
    await connectToDb();

    const totalStaff = await Staff.find(
      {},
      {
        fullName: 1,
        position: 1,
        unhcrEmail: 1,
        mobileSyriatel: 1,
        mobileMtn: 1,
        extension: 1,
      }
    );

    const staffInsideDS = totalStaff.filter((s) => s.insideDs);
    const staffOutsideDS = totalStaff.filter((s) => s.outsideDs);

    return NextResponse.json({
      total: totalStaff,
      insideDs: staffInsideDS,
      outsideDs: staffOutsideDS,
    });
  } catch (error) {
    console.error("Failed to fetch staff summary", error);
    return NextResponse.json(
      { message: "Failed to fetch staff summary" },
      { status: 500 }
    );
  }
};
