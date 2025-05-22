import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { Staff } from "@/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.trim() === "") {
    return NextResponse.json([]);
  }

  try {
    await connectToDb();

    const regex = new RegExp(query, "i");

    const staffResults = await Staff.find({
      $or: [{ fullName: regex }, { email: regex }, { position: regex }],
    })
      .limit(5)
      .lean();

    const results = staffResults.map((staff) => ({
      id: staff._id,
      title: staff.fullName,
      subtitle: `${staff.position} – ${staff.email}`,
      href: `/staff/${staff._id}`, // or slug
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Live search error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
