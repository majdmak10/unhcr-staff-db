import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    // Extract token from cookies
    const token = req.headers
      .get("cookie")
      ?.split("auth_token=")[1]
      ?.split(";")[0];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return NextResponse.json({ message: "Token is valid", user: decoded });
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
