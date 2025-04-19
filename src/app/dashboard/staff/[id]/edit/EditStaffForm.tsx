"use client";

import { useState, useRef } from "react";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import FormSectionTitle from "@/components/form/FormSectionTitle";
import UploadPicture from "@/components/form/UploadPicture";
import MapEditor from "@/components/form/MapEditor";
import DateInputField from "@/components/form/DateInputFiled";
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
} from "@/utils/dropdownOptions";
import { formatDate, withPlaceholder, getProfileImage } from "./staffEditUtils";
import { IStaff } from "@/types/staff.types";

interface EditStaffFormProps {
  staffMember: IStaff; // You would ideally define a proper type for your staff member
}

const EditStaffForm = ({ staffMember }: EditStaffFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fieldRefs = {
    insideDs: useRef<HTMLSelectElement>(null),
    outsideDs: useRef<HTMLSelectElement>(null),
  };

  const validateForm = (formData: FormData) => {
    const insideDs = formData.get("insideDs") as string;
    const outsideDs = formData.get("outsideDs") as string;

    const newErrors: Record<string, string> = {};

    if (
      (insideDs === "true" && outsideDs === "true") ||
      (insideDs === "false" && outsideDs === "false")
    ) {
      const errorMsg =
        'Inside DS cannot be "Yes" if Outside DS is also "Yes", and vice versa.';
      newErrors.insideDs = errorMsg;
      newErrors.outsideDs = errorMsg;
    }

    return newErrors;
  };

  const handleSubmit = async (formData: FormData) => {
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      // Scroll to the first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const ref = fieldRefs[firstErrorKey as keyof typeof fieldRefs];
      if (ref?.current) {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current.focus();
      }

      return;
    }

    setErrors({});
    try {
      await updateStaff(formData);
    } catch (error: unknown) {
      console.error("Error updating staff:", error);
      setErrors({ submit: "Failed to update staff. Please try again." });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      className="flex flex-col gap-4 bg-white rounded-lg p-4"
    >
      <h1 className="font-semibold">Edit Staff</h1>
      <input type="hidden" name="id" value={staffMember._id} />

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
          placeholder="Select sex"
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
          defaultValue={staffMember.employmentType || ""}
          options={withPlaceholder(
            "Select employment type",
            employmentTypeOptions
          )}
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
          defaultValue={staffMember.unit || ""}
          options={withPlaceholder("Select unit", unitOptions)}
        />
        <SelectField
          label="Blood Type"
          id="bloodType"
          name="bloodType"
          defaultValue={staffMember.bloodType || ""}
          options={withPlaceholder("Select blood type", bloodTypeOptions)}
          placeholder="Select blood type"
        />
        <InputField
          label="Dependents"
          id="dependents"
          name="dependents"
          defaultValue={staffMember.dependents}
        />
      </div>
      <div className="flex w-full">
        <UploadPicture
          name="profilePicture"
          initialImage={getProfileImage(
            staffMember.profilePicture,
            staffMember.sex
          )}
        />
      </div>

      <div className="divider my-6 h-[1px] bg-gray-200"></div>

      <FormSectionTitle title="Contact Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          label="UNHCR Email"
          id="unhcrEmail"
          name="unhcrEmail"
          type="text"
          defaultValue={staffMember.unhcrEmail?.trim() || "N/A"}
        />
        <InputField
          label="Private Email"
          id="privateEmail"
          name="privateEmail"
          type="text"
          defaultValue={staffMember.privateEmail?.trim() || "N/A"}
        />
        <InputField
          label="Mobile Syriatel"
          id="mobileSyriatel"
          name="mobileSyriatel"
          defaultValue={staffMember.mobileSyriatel?.trim() || "N/A"}
        />
        <InputField
          label="Mobile MTN"
          id="mobileMtn"
          name="mobileMtn"
          defaultValue={staffMember.mobileMtn?.trim() || "N/A"}
        />
        <InputField
          label="Home Phone"
          id="homePhone"
          name="homePhone"
          defaultValue={staffMember.homePhone?.trim() || "N/A"}
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

      <label className="text-sm text-gray-500 font-semibold">
        Emergency Contact
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <InputField
          id="emergencyContactName"
          name="emergencyContactName"
          aria-label="Emergency Contact Name"
          defaultValue={staffMember.emergencyContact?.fullName}
          label={""}
        />
        <InputField
          id="emergencyContactRelationship"
          name="emergencyContactRelationship"
          aria-label="Emergency Contact Relationship"
          defaultValue={staffMember.emergencyContact?.relationship}
          label={""}
        />
        <InputField
          id="emergencyContactMobile"
          name="emergencyContactMobile"
          aria-label="Emergency Contact Mobile"
          defaultValue={staffMember.emergencyContact?.mobile}
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
          defaultValue={staffMember.contractType || ""}
          options={withPlaceholder("Select contract type", contractTypeOptions)}
          placeholder="Select contract type"
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

      <div className="divider my-6 h-[1px] bg-gray-200"></div>

      <FormSectionTitle title="Other Information" />
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
        <SelectField
          label="Critical Staff"
          id="criticalStaff"
          name="criticalStaff"
          defaultValue={
            staffMember.criticalStaff !== null &&
            staffMember.criticalStaff !== undefined
              ? String(staffMember.criticalStaff)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
        />
        <SelectField
          label="Warden"
          id="warden"
          name="warden"
          defaultValue={staffMember.warden || ""}
          options={withPlaceholder("Select warden type", wardenTypeOptions)}
          placeholder="Select an option"
        />
        <SelectField
          label="Floor Marshal"
          id="floorMarshal"
          name="floorMarshal"
          defaultValue={staffMember.floorMarshal || ""}
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
            staffMember.etb !== null && staffMember.etb !== undefined
              ? String(staffMember.etb)
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
            staffMember.ifak !== null && staffMember.ifak !== undefined
              ? String(staffMember.ifak)
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
            staffMember.advancedDriving !== null &&
            staffMember.advancedDriving !== undefined
              ? String(staffMember.advancedDriving)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
        />
        <SelectField
          label="Inside DS"
          id="insideDs"
          name="insideDs"
          defaultValue={
            staffMember.insideDs !== null && staffMember.insideDs !== undefined
              ? String(staffMember.insideDs)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
          error={errors.insideDs}
          ref={fieldRefs.insideDs}
        />
        <SelectField
          label="Outside DS"
          id="outsideDs"
          name="outsideDs"
          defaultValue={
            staffMember.outsideDs !== null &&
            staffMember.outsideDs !== undefined
              ? String(staffMember.outsideDs)
              : ""
          }
          options={booleanOptions}
          placeholder="Select an option"
          error={errors.outsideDs}
          ref={fieldRefs.outsideDs}
        />
      </div>

      <div className="divider my-6 h-[1px] bg-gray-200"></div>

      <FormSectionTitle title="Address Information" />
      <div className="w-full md:col-span-2">
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
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <AddEditActions submitTitle="Update" />
      </div>
    </form>
  );
};

export default EditStaffForm;
