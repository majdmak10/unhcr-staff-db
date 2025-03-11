import Image from "next/image";
import { getProfilePicture } from "./staffUtils";
import { IStaff } from "@/types/staff.types";

export const staffPanelData = (staff: IStaff[]) => {
  return staff.map((member) => ({
    id: member._id.toString(), // Convert ObjectId to string

    profilePicture: (
      <Image
        src={getProfilePicture(member.profilePicture, member.sex)}
        alt={`${member.fullName}'s Profile Picture`}
        width={50}
        height={50}
        className="rounded-full w-[50px] h-[50px] object-fill"
        loading="lazy"
      />
    ),
    fullName: member.fullName,
  }));
};
