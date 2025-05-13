import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models";
import { connectToDb } from "@/utils/connectToDb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await connectToDb();
    const { email } = await req.json();

    // Only allow UNHCR emails
    if (!email.endsWith("@unhcr.org")) {
      return NextResponse.json(
        { error: "Only @unhcr.org emails are allowed" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: user.email,
      subject: "UNHCR Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #0072BC;">Reset Your UNHCR Password</h2>
          <p>Dear ${user.fullName},</p>
          <p>Click the button below to reset your password. This link is valid for 1 hour:</p>
          <p>
            <a href="${resetUrl}" style="padding: 10px 20px; background-color: #0072BC; color: white; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p>If you did not request this reset, please ignore this email.</p>
          <p>— UNHCR IT Support</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Password reset link sent" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Reset email error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
