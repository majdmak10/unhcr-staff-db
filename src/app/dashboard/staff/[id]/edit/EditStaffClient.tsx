"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import DateInputField from "@/components/form/DateInputFiled";
import UploadPicture from "@/components/form/UploadPicture";
import MapEditor from "@/components/form/MapEditor";
import FormSectionTitle from "@/components/form/FormSectionTitle";
import AddEditActions from "@/components/form/AddEditActions";
import { updateStaff } from "@/lib/actions";
import { parseCoordinate } from "@/utils/parseCoordinate";
import {
  sexOptions,
  employmentTypeOptions,
  unitOptions,
  bloodTypeOptions,
  contractTypeOptions,
  wardenTypeOptions,
  floorMarshalTypeOptions,
  booleanOptions,
  PLACEHOLDER,
} from "./dropdownOptions";
import { formatDate, getProfileImage } from "./utils";
import { IStaff } from "@/types/staff.types";

interface EditStaffClientProps {
  staffMember: IStaff;
}

const EditStaffClient = ({ staffMember }: EditStaffClientProps) => {
  console.log("Rendering ClientForm");

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  // ✅ Memoize the final profile image to prevent infinite rerenders
  const profileImage = useMemo(
    () =>
      getProfileImage(
        previewImageUrl,
        staffMember.profilePicture ?? null,
        staffMember.sex ?? "Male"
      ),
    [previewImageUrl, staffMember.profilePicture, staffMember.sex]
  );

  // ✅ Adjusted to match UploadPicture’s prop signature
  const handleFileSelect = (file: File | null) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImageUrl(previewUrl);
    } else {
      setPreviewImageUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
    };
  }, [previewImageUrl]);

  return (
    <form
      action={updateStaff}
      className="flex flex-col gap-4 bg-white rounded-lg p-4"
    >
      <h1 className="font-semibold">Edit Staff</h1>
      <input type="hidden" name="id" value={staffMember.id} />

      <FormSectionTitle title="General Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          label="Full Name"
          id="fullName"
          name="fullName"
          defaultValue={staffMember.fullName}
        />
        <DateInputField
          name="dateOfBirth"
          label="Date of Birth"
          initialDate={formatDate(staffMember.dateOfBirth)}
        />
        <SelectField
          label="Sex"
          id="sex"
          name="sex"
          defaultValue={staffMember.sex}
          options={sexOptions}
          placeholder={PLACEHOLDER}
        />
        <InputField
          label="Nationality"
          id="nationality"
          name="nationality"
          defaultValue={staffMember.nationality}
        />
        <SelectField
          label="Employment Type"
          id="employmentType"
          name="employmentType"
          defaultValue={staffMember.employmentType}
          options={employmentTypeOptions}
          placeholder={PLACEHOLDER}
        />
        <InputField
          label="Position"
          id="position"
          name="position"
          defaultValue={staffMember.position}
        />
        <SelectField
          label="Unit"
          id="unit"
          name="unit"
          defaultValue={staffMember.unit}
          options={unitOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="Blood Type"
          id="bloodType"
          name="bloodType"
          defaultValue={staffMember.bloodType}
          options={bloodTypeOptions}
          placeholder={PLACEHOLDER}
        />
        <InputField
          label="Dependents"
          id="dependents"
          name="dependents"
          defaultValue={staffMember.dependents}
        />
      </div>

      <UploadPicture onFileSelect={handleFileSelect} />
      <div className="flex items-center justify-center">
        <Image
          src={profileImage}
          alt={`${staffMember.fullName}'s Profile Picture`}
          width={80}
          height={80}
          className="rounded-full w-[80px] h-[80px] object-cover"
        />
      </div>

      <FormSectionTitle title="Contact Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          label="UNHCR Email"
          id="unhcrEmail"
          name="unhcrEmail"
          type="email"
          defaultValue={staffMember.unhcrEmail}
        />
        <InputField
          label="Private Email"
          id="privateEmail"
          name="privateEmail"
          type="email"
          defaultValue={staffMember.privateEmail}
        />
        <InputField
          label="Mobile Syriatel"
          id="mobileSyriatel"
          name="mobileSyriatel"
          defaultValue={staffMember.mobileSyriatel}
        />
        <InputField
          label="Mobile MTN"
          id="mobileMtn"
          name="mobileMtn"
          defaultValue={staffMember.mobileMtn}
        />
        <InputField
          label="Home Phone"
          id="homePhone"
          name="homePhone"
          defaultValue={staffMember.homePhone}
        />
        <InputField
          label="Office Extension"
          id="extension"
          name="extension"
          defaultValue={staffMember.extension}
        />
        <InputField
          label="Radio Call"
          id="radio"
          name="radio"
          defaultValue={staffMember.radio}
        />
      </div>

      <FormSectionTitle title="Emergency Contact" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          id="emergencyContactName"
          name="emergencyContactName"
          aria-label="Emergency Contact Name"
          defaultValue={staffMember.emergencyContact?.fullName}
          label="Name"
        />
        <InputField
          id="emergencyContactRelationship"
          name="emergencyContactRelationship"
          aria-label="Emergency Contact Relationship"
          defaultValue={staffMember.emergencyContact?.relationship}
          label="Relationship"
        />
        <InputField
          id="emergencyContactMobile"
          name="emergencyContactMobile"
          aria-label="Emergency Contact Mobile"
          defaultValue={staffMember.emergencyContact?.mobile}
          label="Mobile"
        />
      </div>

      <FormSectionTitle title="Official Documents Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <SelectField
          label="Contract Type"
          id="contractType"
          name="contractType"
          defaultValue={staffMember.contractType}
          options={contractTypeOptions}
          placeholder={PLACEHOLDER}
        />
        <DateInputField
          name="contractStartDate"
          label="Contract Start Date"
          initialDate={formatDate(staffMember.contractStartDate)}
        />
        <DateInputField
          name="contractEndDate"
          label="Contract End Date"
          initialDate={formatDate(staffMember.contractEndDate)}
        />
        <InputField
          label="National ID Number"
          id="nationalIdNumber"
          name="nationalIdNumber"
          defaultValue={staffMember.nationalIdNumber}
        />
        <InputField
          label="Passport Number"
          id="passportNumber"
          name="passportNumber"
          defaultValue={staffMember.passportNumber}
        />
        <DateInputField
          name="passportExpiryDate"
          label="Passport Expiry Date"
          initialDate={formatDate(staffMember.passportExpiryDate)}
        />
        <InputField
          label="UNLP Number"
          id="unlpNumber"
          name="unlpNumber"
          defaultValue={staffMember.unlpNumber}
        />
        <DateInputField
          name="unlpExpiryDate"
          label="UNLP Expiry Date"
          initialDate={formatDate(staffMember.unlpExpiryDate)}
        />
      </div>

      <FormSectionTitle title="Other Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <SelectField
          label="Critical Staff"
          id="criticalStaff"
          name="criticalStaff"
          defaultValue={String(staffMember.criticalStaff)}
          options={booleanOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="Warden"
          id="warden"
          name="warden"
          defaultValue={staffMember.warden}
          options={wardenTypeOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="Floor Marshal"
          id="floorMarshal"
          name="floorMarshal"
          defaultValue={staffMember.floorMarshal}
          options={floorMarshalTypeOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="ETB"
          id="etb"
          name="etb"
          defaultValue={String(staffMember.etb)}
          options={booleanOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="IFAK"
          id="ifak"
          name="ifak"
          defaultValue={String(staffMember.ifak)}
          options={booleanOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="Advanced Driving"
          id="advancedDriving"
          name="advancedDriving"
          defaultValue={String(staffMember.advancedDriving)}
          options={booleanOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="Inside DS"
          id="insideDs"
          name="insideDs"
          defaultValue={String(staffMember.insideDs)}
          options={booleanOptions}
          placeholder={PLACEHOLDER}
        />
        <SelectField
          label="Outside DS"
          id="outsideDs"
          name="outsideDs"
          defaultValue={String(staffMember.outsideDs)}
          options={booleanOptions}
          placeholder={PLACEHOLDER}
        />
      </div>

      <FormSectionTitle title="Address Information" />
      <MapEditor
        initialLatitude={
          parseCoordinate(staffMember.address?.latitude)?.toString() || ""
        }
        initialLongitude={
          parseCoordinate(staffMember.address?.longitude)?.toString() || ""
        }
        initialAddress={{
          neighborhood: staffMember.address?.neighborhood,
          street: staffMember.address?.street,
          building: staffMember.address?.building,
          floor: staffMember.address?.floor,
          apartment: staffMember.address?.apartment,
        }}
      />

      <div className="flex justify-center gap-4 mt-4">
        <AddEditActions submitTitle="Update" />
      </div>
    </form>
  );
};

export default EditStaffClient;
