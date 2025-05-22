import { NextResponse } from "next/server";
import { connectToDb } from "@/utils/connectToDb";
import { Staff } from "@/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("q");

  if (!input || input.trim() === "") {
    return NextResponse.json([]);
  }

  try {
    await connectToDb();

    const regex = new RegExp(input, "i");

    const suggestions = await Staff.find({
      $or: [{ fullName: regex }, { position: regex }],
    })
      .select("fullName position")
      .limit(5)
      .lean();

    return NextResponse.json(
      suggestions.map((s) => ({
        id: s._id,
        name: s.fullName,
        position: s.position,
      }))
    );
  } catch (error) {
    console.error("Autocomplete error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
