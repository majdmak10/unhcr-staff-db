import { connectToDb } from "@/utils/connectToDb";
import { Staff } from "@/models";

// Search MongoDB for staff
export const searchData = async (query: string) => {
  try {
    await connectToDb();

    const regex = new RegExp(query, "i"); // Case-insensitive match

    const staffResults = await Staff.find({
      $or: [{ fullName: regex }, { unhcrEmail: regex }, { position: regex }],
    }).lean();

    return staffResults.map((staff) => ({
      title: staff.fullName,
      href: `dashboard/staff/${staff.fullName.replace(/\s+/g, "_").toLowerCase()}`, // or use slug if available
      description: `${staff.position} – ${staff.unhcrEmail}`,
    }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
