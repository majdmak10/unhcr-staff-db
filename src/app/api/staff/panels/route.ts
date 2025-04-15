import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { Staff } from "@/models";

export const GET = async (request: Request) => {
  try {
    await connectToDb();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const staff = await Staff.find(
      {},
      {
        profilePicture: 1,
        fullName: 1,
        sex: 1,
        position: 1,
        unhcrEmail: 1,
        mobileSyriatel: 1,
        mobileMtn: 1,
        insideDs: 1,
        outsideDs: 1,
      }
    );

    let filteredStaff = staff;
    if (type === "inside") {
      filteredStaff = staff.filter((s) => s.insideDs);
    } else if (type === "outside") {
      filteredStaff = staff.filter((s) => s.outsideDs);
    }

    return NextResponse.json(filteredStaff);
  } catch (error) {
    console.error("Failed to fetch staff panels", error);
    return NextResponse.json(
      { message: "Failed to fetch staff panels" },
      { status: 500 }
    );
  }
};
