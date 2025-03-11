"use server";

import { Staff } from "@/models";
import { connectToDb } from "./connectToDb";

// Define the return type
type StaffCounts = {
  totalStaff: number;
  staffInside: number;
  staffOutside: number;
};

export async function getStaffCounts(): Promise<StaffCounts> {
  try {
    await connectToDb();
    const allStaff = await Staff.find();

    return {
      totalStaff: allStaff.length,
      staffInside: allStaff.filter((staff) => staff.insideDs).length,
      staffOutside: allStaff.filter((staff) => staff.outsideDs).length,
    };
  } catch (error) {
    console.error("Error getting staff counts:", error);
    return {
      totalStaff: 0,
      staffInside: 0,
      staffOutside: 0,
    };
  }
}
