import { Staff } from "@/models";
import { User } from "@/models";
import { connectToDb } from "@/utils/connectToDb";

export const getStaff = async () => {
  try {
    connectToDb();
    const staff = await Staff.find();
    return staff;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting staff");
  }
};

export const getStaffById = async (id: string) => {
  try {
    const staff = await Staff.findById(id);
    return staff;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get staff");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting admins");
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get admin");
  }
};
