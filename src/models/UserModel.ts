import mongoose, { Schema } from "mongoose";
import { IUser, UserRole } from "@/types/user.types";
import bcrypt from "bcryptjs";

const UserSchema = new Schema<IUser>(
  {
    profilePicture: { type: String },
    fullName: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    sex: { type: String, required: true },
    position: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    mobileSyriatel: {
      type: String,
      match: /^0[0-9]{9}$/,
      required: false,
      default: null,
    },
    mobileMtn: {
      type: String,
      match: /^0[0-9]{9}$/,
      required: false,
      default: null,
    },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
