"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import DateInputField from "@/components/form/DateInputFiled";
import UploadPicture from "@/components/form/UploadPicture";
import MapEditor from "@/components/form/MapEditor";
import AddEditActions from "@/components/form/AddEditActions";
import FormSectionTitle from "@/components/form/FormSectionTitle";
import {
  bloodTypeOptions,
  booleanOptions,
  contractTypeOptions,
  employmentTypeOptions,
  floorMarshalTypeOptions,
  sexOptions,
  unitOptions,
  wardenTypeOptions,
} from "@/utils/dropdownOptions";
import { convertToDMS } from "@/utils/convertToDMS";
import { parseCoordinate } from "@/utils/parseCoordinate";
import { formatDate, getProfileImage, withPlaceholder } from "./staffEditUtils";
import { updateStaff } from "@/lib/actions";
import { IStaff } from "@/types/staff.types";

interface EditStaffClientProps {
  staff: IStaff;
}

const EditStaffClient = ({ staff }: EditStaffClientProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [latitude, setLatitude] = useState<string>(
    parseCoordinate(staff.address?.latitude)?.toString() || ""
  );
  const [longitude, setLongitude] = useState<string>(
    parseCoordinate(staff.address?.longitude)?.toString() || ""
  );

  const latitudeDMS = useMemo(
    () => (latitude ? convertToDMS(parseFloat(latitude), true) : ""),
    [latitude]
  );
  const longitudeDMS = useMemo(
    () => (longitude ? convertToDMS(parseFloat(longitude), false) : ""),
    [longitude]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const insideDs = formData.get("insideDs") as string;
    const outsideDs = formData.get("outsideDs") as string;

    if (
      (insideDs === "true" && outsideDs === "true") ||
      (insideDs === "false" && outsideDs === "false")
    ) {
      setErrors({
        insideDs:
          'Inside DS cannot be "Yes" if Outside DS is also "Yes", and vice versa.',
        outsideDs:
          'Inside DS cannot be "Yes" if Outside DS is also "Yes", and vice versa.',
      });
      return;
    }

    formData.set("id", staff.id);
    formData.set("latitude", latitude);
    formData.set("longitude", longitude);

    try {
      await updateStaff(formData);
    } catch (err) {
      console.error("Failed to update staff:", err);
      setErrors({ submit: "Failed to update staff. Please try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white rounded-lg p-4"
    >
      <input type="hidden" name="id" value={staff.id} />

      <h1 className="font-semibold">Edit Staff</h1>

      <FormSectionTitle title="General Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          label="Full Name"
          id="fullName"
          name="fullName"
          defaultValue={staff.fullName}
        />
        <DateInputField
          name="dateOfBirth"
          label="Date of Birth"
          initialDate={formatDate(staff.dateOfBirth)}
        />
        <SelectField
          label="Sex"
          id="sex"
          name="sex"
          defaultValue={staff.sex}
          options={sexOptions}
          placeholder="Select sex"
        />
        <InputField
          label="Nationality"
          id="nationality"
          name="nationality"
          defaultValue={staff.nationality}
        />
        <SelectField
          label="Employment Type"
          id="employmentType"
          name="employmentType"
          defaultValue={staff.employmentType || ""}
          options={withPlaceholder(
            "Select employment type",
            employmentTypeOptions
          )}
        />
        <InputField
          label="Position"
          id="position"
          name="position"
          defaultValue={staff.position}
        />
        <SelectField
          label="Unit"
          id="unit"
          name="unit"
          defaultValue={staff.unit || ""}
          options={withPlaceholder("Select unit", unitOptions)}
        />
        <SelectField
          label="Blood Type"
          id="bloodType"
          name="bloodType"
          defaultValue={staff.bloodType || ""}
          options={withPlaceholder("Select blood type", bloodTypeOptions)}
          placeholder="Select blood type"
        />
        <InputField
          label="Dependents"
          id="dependents"
          name="dependents"
          defaultValue={staff.dependents}
        />
      </div>
      <div className="flex w-full">
        <UploadPicture
          name="profilePicture"
          initialImage={getProfileImage(staff.profilePicture, staff.sex)}
        />
      </div>

      <div className="divider my-6 h-[1px] bg-gray-200"></div>

      <FormSectionTitle title="Contact Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          label="UNHCR Email"
          id="unhcrEmail"
          name="unhcrEmail"
          type="email"
          defaultValue={staff.unhcrEmail?.trim() || "N/A"}
        />
        <InputField
          label="Private Email"
          id="privateEmail"
          name="privateEmail"
          type="email"
          defaultValue={staff.privateEmail?.trim() || "N/A"}
        />
        <InputField
          label="Mobile Syriatel"
          id="mobileSyriatel"
          name="mobileSyriatel"
          defaultValue={staff.mobileSyriatel?.trim() || "N/A"}
        />
        <InputField
          label="Mobile MTN"
          id="mobileMtn"
          name="mobileMtn"
          defaultValue={staff.mobileMtn?.trim() || "N/A"}
        />
        <InputField
          label="Home Phone"
          id="homePhone"
          name="homePhone"
          defaultValue={staff.homePhone?.trim() || "N/A"}
        />
        <InputField
          label="Office Extension"
          id="extension"
          name="extension"
          defaultValue={staff.extension}
        />
        <InputField
          label="Radio Call"
          id="radio"
          name="radio"
          defaultValue={staff.radio}
        />
      </div>

      <label className="text-sm text-gray-500 font-semibold">
        Emergency Contact
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          id="emergencyContactName"
          name="emergencyContactName"
          aria-label="Emergency Contact Name"
          defaultValue={staff.emergencyContact?.fullName}
          label={""}
        />
        <InputField
          id="emergencyContactRelationship"
          name="emergencyContactRelationship"
          aria-label="Emergency Contact Relationship"
          defaultValue={staff.emergencyContact?.relationship}
          label={""}
        />
        <InputField
          id="emergencyContactMobile"
          name="emergencyContactMobile"
          aria-label="Emergency Contact Mobile"
          defaultValue={staff.emergencyContact?.mobile}
          label={""}
        />
      </div>

      <div className="divider my-6 h-[1px] bg-gray-200"></div>

      <FormSectionTitle title="Official Documents Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <SelectField
          label="Contract Type"
          id="contractType"
          name="contractType"
          defaultValue={staff.contractType || ""}
          options={withPlaceholder("Select contract type", contractTypeOptions)}
          placeholder="Select contract type"
        />
        <DateInputField
          name="contractStartDate"
          label="Contract Start Date"
          initialDate={formatDate(staff.contractStartDate)}
        />
        <DateInputField
          name="contractEndDate"
          label="Contract End Date"
          initialDate={formatDate(staff.contractEndDate)}
        />
        <InputField
          label="National ID Number"
          id="nationalIdNumber"
          name="nationalIdNumber"
          defaultValue={staff.nationalIdNumber}
        />
        <InputField
          label="Passport Number"
          id="passportNumber"
          name="passportNumber"
          defaultValue={staff.passportNumber}
        />
        <DateInputField
          name="passportExpiryDate"
          label="Passport Expiry Date"
          initialDate={formatDate(staff.passportExpiryDate)}
        />
        <InputField
          label="UNLP Number"
          id="unlpNumber"
          name="unlpNumber"
          defaultValue={staff.unlpNumber}
        />
        <DateInputField
          name="unlpExpiryDate"
          label="UNLP Expiry Date"
          initialDate={formatDate(staff.unlpExpiryDate)}
        />
      </div>

      <div className="divider my-6 h-[1px] bg-gray-200"></div>

      <FormSectionTitle title="Other Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <SelectField
          label="Inside DS"
          id="insideDs"
          name="insideDs"
          defaultValue={String(staff.insideDs)}
          options={booleanOptions}
          placeholder="Select an option"
          error={errors.insideDs}
        />
        <SelectField
          label="Outside DS"
          id="outsideDs"
          name="outsideDs"
          defaultValue={String(staff.outsideDs)}
          options={booleanOptions}
          placeholder="Select an option"
          error={errors.outsideDs}
        />
      </div>

      <FormSectionTitle title="Other Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <SelectField
          label="Critical Staff"
          id="criticalStaff"
          name="criticalStaff"
          defaultValue={
            staff.criticalStaff !== null && staff.criticalStaff !== undefined
              ? String(staff.criticalStaff)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
        />
        <SelectField
          label="Warden"
          id="warden"
          name="warden"
          defaultValue={staff.warden || ""}
          options={withPlaceholder("Select warden type", wardenTypeOptions)}
          placeholder="Select an option"
        />
        <SelectField
          label="Floor Marshal"
          id="floorMarshal"
          name="floorMarshal"
          defaultValue={staff.floorMarshal || ""}
          options={withPlaceholder(
            "Select floor marshal type",
            floorMarshalTypeOptions
          )}
          placeholder="Select an option"
        />
        <SelectField
          label="ETB"
          id="etb"
          name="etb"
          defaultValue={
            staff.etb !== null && staff.etb !== undefined
              ? String(staff.etb)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
        />
        <SelectField
          label="IFAK"
          id="ifak"
          name="ifak"
          defaultValue={
            staff.ifak !== null && staff.ifak !== undefined
              ? String(staff.ifak)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
        />
        <SelectField
          label="Advanced Driving"
          id="advancedDriving"
          name="advancedDriving"
          defaultValue={
            staff.advancedDriving !== null &&
            staff.advancedDriving !== undefined
              ? String(staff.advancedDriving)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
        />
        <SelectField
          label="Inside DS"
          id="insideDs"
          name="insideDs"
          defaultValue={String(staff.insideDs)}
          options={booleanOptions}
          placeholder="Select an option"
          error={errors.insideDs}
        />
        <SelectField
          label="Outside DS"
          id="outsideDs"
          name="outsideDs"
          defaultValue={String(staff.outsideDs)}
          options={booleanOptions}
          placeholder="Select an option"
          error={errors.outsideDs}
        />
      </div>

      <div className="divider my-6 h-[1px] bg-gray-200"></div>
      <FormSectionTitle title="Address Information" />
      <div className="w-full md:col-span-2">
        <MapEditor
          initialLatitude={
            parseCoordinate(staff.address?.latitude)?.toString() || ""
          }
          initialLongitude={
            parseCoordinate(staff.address?.longitude)?.toString() || ""
          }
          initialAddress={{
            neighborhood: staff.address?.neighborhood,
            street: staff.address?.street,
            building: staff.address?.building,
            floor: staff.address?.floor,
            apartment: staff.address?.apartment,
          }}
        />
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <AddEditActions submitTitle="Update" />
      </div>
    </form>
  );
};

export default EditStaffClient;
