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
