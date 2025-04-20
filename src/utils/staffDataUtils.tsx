import Link from "next/link";
import Image from "next/image";
import {
  formatBoolean,
  formatDate,
  getProfilePicture,
  formatAddress,
} from "./staffUtils";
import TableActions from "@/components/table/TableActions";
import { convertToDMS } from "@/utils/convertToDMS";
import { deleteStaff } from "@/lib/actions";
import { IStaff } from "@/types/staff.types";

export const mapStaffData = (staff: IStaff[]) => {
  return staff.map((staff) => ({
    id: String(staff.id ?? staff._id ?? "unknown-id"), // Convert to string
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ),
    profilePicture: (
      <Link
        href={`/dashboard/staff/${staff.fullName
          .replace(/\s+/g, "_")
          .toLowerCase()}`}
      >
        <Image
          src={getProfilePicture(staff.profilePicture, staff.sex)}
          alt={`${staff.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
          loading="lazy"
        />
      </Link>
    ),
    fullName: (
      <Link
        href={`/dashboard/staff/${staff.fullName
          .replace(/\s+/g, "_")
          .toLowerCase()}`}
        className="hover:underline"
      >
        {staff.fullName}
      </Link>
    ),
    dateOfBirth: formatDate(staff.dateOfBirth),
    sex: staff.sex ?? "N/A",
    nationality: staff.nationality ?? "N/A",
    employmentType: staff.employmentType ?? "N/A",
    position: staff.position ?? "N/A",
    unit: staff.unit ?? "N/A",
    bloodType: staff.bloodType ?? "N/A",
    dependents: staff.dependents ?? "N/A",
    unhcrEmail: staff.unhcrEmail ?? "N/A",
    privateEmail: staff.privateEmail ?? "N/A",
    mobileSyriatel: staff.mobileSyriatel ?? "N/A",
    mobileMtn: staff.mobileMtn ?? "N/A",
    homePhone: staff.homePhone ?? "N/A",
    extension: staff.extension ?? "N/A",
    radio: staff.radio ?? "N/A",
    emergencyContact: staff.emergencyContact
      ? `${staff.emergencyContact.fullName} (${staff.emergencyContact.relationship}) - ${staff.emergencyContact.mobile}`
      : "N/A",
    contractType: staff.contractType ?? "N/A",
    contractStartDate: formatDate(staff.contractStartDate),
    contractEndDate: formatDate(staff.contractEndDate),
    nationalIdNumber: staff.nationalIdNumber ?? "N/A",
    passportNumber: staff.passportNumber ?? "N/A",
    passportExpiryDate: formatDate(staff.passportExpiryDate),
    unlpNumber: staff.unlpNumber ?? "N/A",
    unlpExpiryDate: formatDate(staff.unlpExpiryDate),
    criticalStaff: formatBoolean(staff.criticalStaff),
    warden: staff.warden ?? "N/A",
    floorMarshal: staff.floorMarshal ?? "N/A",
    etb: formatBoolean(staff.etb),
    ifak: formatBoolean(staff.ifak),
    advancedDriving: formatBoolean(staff.advancedDriving),
    insideDs: formatBoolean(staff.insideDs),
    outsideDs: formatBoolean(staff.outsideDs),
    address: formatAddress(staff.address),
    latitude:
      staff.address?.latitude && !isNaN(parseFloat(staff.address.latitude))
        ? convertToDMS(parseFloat(staff.address.latitude), true)
        : "N/A",

    longitude:
      staff.address?.longitude && !isNaN(parseFloat(staff.address.longitude))
        ? convertToDMS(parseFloat(staff.address.longitude), false)
        : "N/A",
    actions: (
      <div className="flex gap-2 items-center">
        <TableActions
          id={String(staff.id ?? staff._id ?? "unknown-id")} // Ensure it's always a string
          type="staff"
          deleteAction={deleteStaff}
        />
      </div>
    ),
  }));
};

export const staffCardTotal = (staff: IStaff[]) => {
  return staff.map((staff) => ({
    id: String(staff.id ?? staff._id ?? "unknown-id"), // Convert to string
    profilePicture: (
      <Link href={`/dashboard/staff/${staff.id ?? staff._id ?? "unknown-id"}`}>
        <Image
          src={getProfilePicture(staff.profilePicture, staff.sex)}
          alt={`${staff.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
          loading="lazy"
        />
      </Link>
    ),
    fullName: (
      <Link href={`/dashboard/staff/${staff.id ?? staff._id ?? "unknown-id"}`}>
        {staff.fullName}
      </Link>
    ),
    employmentType: staff.employmentType ?? "N/A",
    position: staff.position ?? "N/A",
    unit: staff.unit ?? "N/A",
    unhcrEmail: staff.unhcrEmail ?? "N/A",
    mobileSyriatel: staff.mobileSyriatel ?? "N/A",
    mobileMtn: staff.mobileMtn ?? "N/A",
    extension: staff.extension ?? "N/A",
  }));
};
