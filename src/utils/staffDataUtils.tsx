import Link from "next/link";
import Image from "next/image";
import {
  formatBoolean,
  formatDate,
  getProfilePicture,
  formatAddress,
} from "./staffUtils";
import { convertToDMS } from "@/utils/convertToDMS";
import StaffActions from "@/components/shared/table/StaffActions";
import { IStaff } from "@/types/staff.types";

export const mapStaffData = (staff: IStaff[]) => {
  return staff.map((member) => ({
    id: member._id.toString(), // Convert ObjectId to string
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ),
    profilePicture: (
      <Link href={`/dashboard/staff/${member._id.toString()}`}>
        <Image
          src={getProfilePicture(member.profilePicture, member.sex)}
          alt={`${member.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
          loading="lazy"
        />
      </Link>
    ),
    fullName: (
      <Link href={`/dashboard/staff/${member._id.toString()}`}>
        {member.fullName}
      </Link>
    ),
    dateOfBirth: formatDate(member.dateOfBirth),
    sex: member.sex ?? "N/A",
    nationality: member.nationality ?? "N/A",
    employmentType: member.employmentType ?? "N/A",
    position: member.position ?? "N/A",
    unit: member.unit ?? "N/A",
    bloodType: member.bloodType ?? "N/A",
    dependents: member.dependents ?? "N/A",
    unhcrEmail: member.unhcrEmail ?? "N/A",
    privateEmail: member.privateEmail ?? "N/A",
    mobileSyriatel: member.mobileSyriatel ?? "N/A",
    mobileMtn: member.mobileMtn ?? "N/A",
    homePhone: member.homePhone ?? "N/A",
    extension: member.extension ?? "N/A",
    radio: member.radio ?? "N/A",
    emergencyContact: member.emergencyContact
      ? `${member.emergencyContact.fullName} (${member.emergencyContact.relationship}) - ${member.emergencyContact.mobile}`
      : "N/A",
    contractType: member.contractType ?? "N/A",
    contractStartDate: formatDate(member.contractStartDate),
    contractEndDate: formatDate(member.contractEndDate),
    nationalIdNumber: member.nationalIdNumber ?? "N/A",
    passportNumber: member.passportNumber ?? "N/A",
    passportExpiryDate: formatDate(member.passportExpiryDate),
    unlpNumber: member.unlpNumber ?? "N/A",
    unlpExpiryDate: formatDate(member.unlpExpiryDate),
    criticalStaff: formatBoolean(member.criticalStaff),
    warden: member.warden ?? "N/A",
    floorMarshal: member.floorMarshal ?? "N/A",
    etb: formatBoolean(member.etb),
    ifak: formatBoolean(member.ifak),
    advancedDriving: formatBoolean(member.advancedDriving),
    insideDs: formatBoolean(member.insideDs),
    outsideDs: formatBoolean(member.outsideDs),
    address: formatAddress(member.address),
    latitude: member.address?.latitude
      ? convertToDMS(parseFloat(member.address.latitude), true)
      : "N/A",
    longitude: member.address?.longitude
      ? convertToDMS(parseFloat(member.address.longitude), false)
      : "N/A",
    actions: <StaffActions id={member._id.toString()} />, // Ensure id is a string
  }));
};

export const staffCardTotal = (staff: IStaff[]) => {
  return staff.map((member) => ({
    id: member._id.toString(), // Convert ObjectId to string
    profilePicture: (
      <Link href={`/dashboard/staff/${member._id.toString()}`}>
        <Image
          src={getProfilePicture(member.profilePicture, member.sex)}
          alt={`${member.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
          loading="lazy"
        />
      </Link>
    ),
    fullName: (
      <Link href={`/dashboard/staff/${member._id.toString()}`}>
        {member.fullName}
      </Link>
    ),
    employmentType: member.employmentType ?? "N/A",
    position: member.position ?? "N/A",
    unit: member.unit ?? "N/A",
    unhcrEmail: member.unhcrEmail ?? "N/A",
    mobileSyriatel: member.mobileSyriatel ?? "N/A",
    mobileMtn: member.mobileMtn ?? "N/A",
    extension: member.extension ?? "N/A",
  }));
};
