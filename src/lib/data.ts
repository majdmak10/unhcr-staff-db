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
    warden: { $in: ["Warden", "Deputy Warden"] },
  });
  return wardenStaff;
};

export const getFloorMarshalStaff = async () => {
  await connectToDb();
  const floorMarshalStaff = await Staff.find({
    floorMarshal: { $in: ["Floor Marshal", "Deputy Floor Marshal"] },
  });
  return floorMarshalStaff;
};

export const getEtbStaff = async () => {
  await connectToDb();
  const etbStaff = await Staff.find({ etb: true });
  return etbStaff;
};

export const getIfakStaff = async () => {
  await connectToDb();
  const ifakStaff = await Staff.find({ ifak: true });
  return ifakStaff;
};

export const getAdvancedDrivingStaff = async () => {
  await connectToDb();
  const advancedDrivingStaff = await Staff.find({ advancedDriving: true });
  return advancedDrivingStaff;
};

export const getInsideDsStaff = async () => {
  await connectToDb();
  const insideDsStaff = await Staff.find({ insideDs: true });
  return insideDsStaff;
};

export const getOutsideDsStaff = async () => {
  await connectToDb();
  const outsideDsStaff = await Staff.find({ outsideDs: true });
  return outsideDsStaff;
};
