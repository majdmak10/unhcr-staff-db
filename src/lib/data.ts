import { Staff } from "@/models/StaffModel";
import { User } from "@/models/UserModel";
import { connectToDb } from "@/utils/connectToDb";

export const getStaff = async () => {
  try {
    await connectToDb();
    return await Staff.find();
  } catch (err) {
    console.error(err);
    throw new Error("Error getting staff");
  }
};

export const getStaffById = async (id: string) => {
  try {
    await connectToDb();
    return await Staff.findById(id);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get staff");
  }
};

export const getStaffBySlug = async (slug: string) => {
  try {
    await connectToDb();
    const fullName = slug.replace(/_/g, " ").toLowerCase();
    return await Staff.findOne({
      fullName: { $regex: new RegExp(`^${fullName}$`, "i") },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get staff by slug");
  }
};

export const getUsers = async () => {
  try {
    await connectToDb();
    return await User.find();
  } catch (err) {
    console.error(err);
    throw new Error("Error getting admins");
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDb();
    return await User.findById(id);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get admin");
  }
};

export const getUserBySlug = async (slug: string) => {
  try {
    await connectToDb();
    const fullName = slug.replace(/_/g, " ").toLowerCase();
    return await User.findOne({
      fullName: { $regex: new RegExp(`^${fullName}$`, "i") },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get user by slug");
  }
};

export const getCriticalStaff = async () => {
  await connectToDb();
  const criticalStaff = await Staff.find({ criticalStaff: true });
  return criticalStaff;
};

export const getWardenStaff = async () => {
  await connectToDb();
  const wardenStaff = await Staff.find({
    warden: { $in: ["warden", "deputy"] },
  });
  return wardenStaff;
};

export const getFloorMarshalStaff = async () => {
  await connectToDb();
  const floorMarshalStaff = await Staff.find({
    floorMarshal: { $in: ["floorMarshal", "deputy"] },
  });
  return floorMarshalStaff;
};
