"use client";

import { useState, useMemo } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FormSectionTitle from "@/components/form/FormSectionTitle";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import MapPicker from "@/components/form/MapPicker";
import AddEditActions from "@/components/form/AddEditActions";
import { addStaff } from "@/lib/actions";
import { convertToDMS } from "@/utils/convertToDMS";

// Constants for dropdown options
const unitOptions = [
  "Admin",
  "Communication",
  "Field",
  "Information Management",
  "Livelihood",
  "Management",
  "Programme",
  "Project Control",
  "Protection",
  "Security",
  "Shelter",
  "Supply",
  "Transportation",
].map((unit) => ({ value: unit, label: unit }));

const sexOptions = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
];

const bloodTypeOptions = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"].map(
  (type) => ({ value: type, label: type })
);

const employmentTypeOptions = [
  { value: "International", label: "International" },
  { value: "National", label: "National" },
];

const contractTypeOptions = [
  { value: "Fixed", label: "Fixed" },
  { value: "Temporary", label: "Temporary" },
];

const wardenTypeOptions = [
  { value: "Warden", label: "Warden" },
  { value: "Deputy", label: "Deputy" },
  { value: "None", label: "None" },
];

const booleanOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

// Validation Helper Function
const requiredField = (value: string, fieldName: string): string | null =>
  !value || value.trim() === "" ? `${fieldName} is required` : null;

const AddStaff = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const latitudeDMS = useMemo(
    () => (latitude ? convertToDMS(parseFloat(latitude), true) : ""),
    [latitude]
  );
  const longitudeDMS = useMemo(
    () => (longitude ? convertToDMS(parseFloat(longitude), false) : ""),
    [longitude]
  );

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    newErrors.fullName =
      requiredField(formData.get("fullName") as string, "Full Name") || "";
    newErrors.sex = requiredField(formData.get("sex") as string, "Sex") || "";

    return Object.fromEntries(Object.entries(newErrors).filter(([, v]) => v));
  };

  const phoneRegex = /^[0-9]{9}$/;

  const validatePhoneNumber = (phone: string | null) =>
    phone && phoneRegex.test(phone) ? phone : "";

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const validationErrors = validateForm(formData);
    const mobileSyriatel = validatePhoneNumber(
      formData.get("mobileSyriatel") as string
    );
    const mobileMtn = validatePhoneNumber(formData.get("mobileMtn") as string);
    const homePhone = validatePhoneNumber(formData.get("homePhone") as string);

    formData.set("mobileSyriatel", mobileSyriatel);
    formData.set("mobileMtn", mobileMtn);
    formData.set("homePhone", homePhone);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (latitude) formData.append("latitude", latitude);
    if (longitude) formData.append("longitude", longitude);

    setErrors({});

    try {
      await addStaff(formData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorMap: Record<string, string> = {
          "UNHCR email already exists": "unhcrEmail",
          "Private email already exists": "privateEmail",
        };

        setErrors({
          [errorMap[error.message] || "submit"]: errorMap[error.message]
            ? `${error.message}`
            : "Failed to add staff. Please try again.",
        });
      } else {
        setErrors({
          submit: "An unexpected error occurred. Please try again.",
        });
      }
    }
  };

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          { label: "Add New Staff", href: "/dashboard/staff/add" },
        ]}
      />
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 w-full bg-white rounded-lg p-4"
      >
        <h1 className="font-semibold">Add New Staff</h1>

        {errors.submit && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md">
            {errors.submit}
          </div>
        )}

        {/* General Information */}
        <FormSectionTitle title="General Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            error={errors.fullName}
          />
          <InputField
            label="Date of Birth"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
          />
          <SelectField
            label="Sex"
            id="sex"
            name="sex"
            options={sexOptions}
            error={errors.sex}
          />
          <InputField
            label="Nationality"
            id="nationality"
            name="nationality"
            placeholder="Enter nationality"
          />
          <SelectField
            label="Employment Type"
            id="employmentType"
            name="employmentType"
            options={employmentTypeOptions}
          />
          <InputField
            label="Position"
            id="position"
            name="position"
            placeholder="Enter position"
          />
          <SelectField
            label="Unit"
            id="unit"
            name="unit"
            options={unitOptions}
          />
          <SelectField
            label="Blood Type"
            id="bloodType"
            name="bloodType"
            options={bloodTypeOptions}
          />
          <InputField
            label="Dependents"
            id="dependents"
            name="dependents"
            placeholder="Enter dependents"
          />
          <UploadPicture name="profilePicture" />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Contact Information */}
        <FormSectionTitle title="Contact Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <InputField
            label="UNHCR Email"
            id="unhcrEmail"
            name="unhcrEmail"
            type="email"
            error={errors.unhcrEmail}
          />
          <InputField
            label="Private Email"
            id="privateEmail"
            name="privateEmail"
            type="email"
            error={errors.privateEmail}
          />
          <InputField
            label="Mobile Syriatel"
            id="mobileSyriatel"
            name="mobileSyriatel"
            placeholder="Enter Syriatel mobile number"
          />
          <InputField
            label="Mobile MTN"
            id="mobileMtn"
            name="mobileMtn"
            placeholder="Enter MTN mobile number"
          />
          <InputField
            label="Home Phone"
            id="homePhone"
            name="homePhone"
            placeholder="Enter home phone number"
          />
          <InputField
            label="Extension"
            id="extension"
            name="extension"
            placeholder="Enter extension"
          />
          <InputField
            label="Radio Call"
            id="radio"
            name="radio"
            placeholder="Enter radio call"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500 font-semibold">
            Emergency Contact
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
            <InputField
              label={""}
              id="emergencyContactName"
              name="emergencyContactName"
              placeholder="Enter emergency contact name"
            />
            <InputField
              label={""}
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              placeholder="Enter emergency contact relationship"
            />
            <InputField
              label={""}
              name="emergencyContactMobile"
              id="emergencyContactMobile"
              placeholder="Enter emergency contact mobile number"
            />
          </div>
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Official Documents Information */}
        <FormSectionTitle title="Official Documents Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <SelectField
            label="Contract Type"
            id="contractType"
            name="contractType"
            placeholder="Select an option"
            options={contractTypeOptions}
          />
          <InputField
            label="Contract Start Date"
            id="contractStartDate"
            name="contractStartDate"
            type="date"
          />
          <InputField
            label="Contract End Date"
            id="contractEndDate"
            name="contractEndDate"
            type="date"
          />
          <InputField
            label="National ID Number"
            id="nationalIdNumber"
            name="nationalIdNumber"
            placeholder="Enter national ID number"
          />
          <InputField
            label="Passport Number"
            id="passportNumber"
            name="passportNumber"
            placeholder="Enter passport number"
          />
          <InputField
            label="Passport Expiry Date"
            id="passportExpiryDate"
            name="passportExpiryDate"
            type="date"
          />
          <InputField
            label="UNLP Number"
            id="unlpNumber"
            name="unlpNumber"
            placeholder="Enter UNLP number"
          />
          <InputField
            label="UNLP Expiry Date"
            id="unlpExpiryDate"
            name="unlpExpiryDate"
            type="date"
          />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Other Information */}
        <FormSectionTitle title="Other Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <SelectField
            label="Critical Staff"
            id="criticalStaff"
            name="criticalStaff"
            placeholder="Select an option"
            options={booleanOptions}
          />
          <SelectField
            label="Warden"
            id="warden"
            name="warden"
            placeholder="Select an option"
            options={wardenTypeOptions}
          />
          <SelectField
            label="Floor Marshal"
            id="floorMarshal"
            name="floorMarshal"
            placeholder="Select an option"
            options={booleanOptions}
          />
          <SelectField
            label="ETB"
            id="etb"
            name="etb"
            placeholder="Select an option"
            options={booleanOptions}
          />
          <SelectField
            label="IFAK"
            id="ifak"
            name="ifak"
            placeholder="Select an option"
            options={booleanOptions}
          />
          <SelectField
            label="Advanced Driving"
            id="advancedDriving"
            name="advancedDriving"
            placeholder="Select an option"
            options={booleanOptions}
          />
          <SelectField
            label="Inside DS"
            id="insideDs"
            name="insideDs"
            placeholder="Select an option"
            options={booleanOptions}
          />
          <SelectField
            label="Outside DS"
            id="outsideDs"
            name="outsideDs"
            placeholder="Select an option"
            options={booleanOptions}
          />
        </div>

        {/* Tailwind divider */}
        <div className="divider my-6 h-[1px] bg-gray-200"></div>

        {/* Address Information */}
        <FormSectionTitle title="Address Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <div className="flex flex-wrap justify-between gap-4">
            <InputField
              label="Neighborhood"
              id="neighborhood"
              name="addressNeighborhood"
              placeholder="Enter neighborhood"
            />
            <InputField
              label="Street"
              id="street"
              name="addressStreet"
              placeholder="Enter street"
            />
            <InputField
              label="Building"
              id="building"
              name="addressBuilding"
              placeholder="Enter building"
            />
            <InputField
              label="Floor"
              id="floor"
              name="addressFloor"
              placeholder="Enter floor"
            />
            <InputField
              label="Apartment"
              id="apartment"
              name="addressApartment"
              placeholder="Enter apartment"
            />
            <InputField
              label="Latitude (DMS)"
              id="latitudeDisplay"
              name={""}
              value={latitudeDMS}
              readOnly
            />
            <InputField
              label="Longitude (DMS)"
              id="longitudeDisplay"
              name={""}
              value={longitudeDMS}
              readOnly
            />

            {/* Hidden inputs to submit the decimal values */}
            <input type="hidden" name="latitude" value={latitude} />
            <input type="hidden" name="longitude" value={longitude} />
          </div>

          {/* Google Map */}
          <div className="w-full md:col-span-2">
            <MapPicker
              latitude={latitude}
              longitude={longitude}
              onLocationChange={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-4">
          <AddEditActions submitTitle="Add" />
        </div>
      </form>
    </main>
  );
};

export default AddStaff;
