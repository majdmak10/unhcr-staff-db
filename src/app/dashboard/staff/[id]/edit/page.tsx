import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import FormSectionTitle from "@/components/form/FormSectionTitle";
import UploadPicture from "@/components/form/UploadPicture";
import MapEditor from "@/components/form/MapEditor";
import Image from "next/image";
import DateInputField from "@/components/form/DateInputFiled";
import AddEditActions from "@/components/form/AddEditActions";
import { getStaffById } from "@/lib/data";
import { updateStaff } from "@/lib/actions";

interface EditStaffProps {
  params: { id: string };
}

const toDateInputValue = (dateString?: string) =>
  dateString ? new Date(dateString).toISOString().split("T")[0] : undefined;

// Constants for dropdown options
const sexOptions = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
];

const employmentTypeOptions = [
  { value: "International", label: "International" },
  { value: "National", label: "National" },
];

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

const bloodTypeOptions = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"].map(
  (type) => ({ value: type, label: type })
);

const contractTypeOptions = [
  { value: "Fixed", label: "Fixed" },
  { value: "Temporary", label: "Temporary" },
];

const wardenTypeOptions = [
  { value: "Warden", label: "Warden" },
  { value: "Deputy", label: "Deputy" },
  { value: "None", label: "None" },
];

const floorMarshalTypeOptions = [
  { value: "Floor Marshal", label: "Floor Marshal" },
  { value: "Deputy Floor Marshal", label: "Deputy Floor Marshal" },
  { value: "None", label: "None" },
];

const booleanOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const EditStaff = async ({ params }: EditStaffProps) => {
  const { id } = params;
  const staffMember = await getStaffById(id);

  if (!staffMember) {
    return <div className="text-red-500 p-4">Staff member not found</div>;
  }

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          {
            label: "Edit Staff",
            href: `/dashboard/staff/${staffMember.id}/edit`,
          },
        ]}
      />

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
            initialDate={toDateInputValue(staffMember.dateOfBirth)}
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
            defaultValue={staffMember.employmentType}
            options={employmentTypeOptions}
            placeholder="Select employment type"
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
            placeholder="Select unit"
          />
          <SelectField
            label="Blood Type"
            id="bloodType"
            name="bloodType"
            defaultValue={staffMember.bloodType}
            options={bloodTypeOptions}
            placeholder="Select blood type"
          />
          <InputField
            label="Dependents"
            id="dependents"
            name="dependents"
            defaultValue={staffMember.dependents}
          />
          <UploadPicture />
          <Image
            src={
              staffMember.profilePicture ||
              (staffMember.sex === "Male"
                ? "/avatars/noProfilePicture_m.png"
                : "/avatars/noProfilePicture_f.png")
            }
            alt={`${staffMember.fullName}'s Profile Picture`}
            width={50}
            height={50}
            className="rounded-full w-[80px] h-[80px] object-fill"
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
            defaultValue={staffMember.contractType}
            options={contractTypeOptions}
            placeholder="Select contract type"
          />
          <DateInputField
            name="contractStartDate"
            label="Contract Start Date"
            initialDate={toDateInputValue(staffMember.contractStartDate)}
          />
          <DateInputField
            name="contractEndDate"
            label="Contract End Date"
            initialDate={toDateInputValue(staffMember.contractEndDate)}
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
            initialDate={toDateInputValue(staffMember.passportExpiryDate)}
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
            initialDate={toDateInputValue(staffMember.unlpExpiryDate)}
          />
        </div>

        <div className="divider my-6 h-[1px] bg-gray-200"></div>
        <FormSectionTitle title="Other Information" />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10 gap-y-5">
          <SelectField
            label="Critical Staff"
            id="criticalStaff"
            name="criticalStaff"
            defaultValue={String(staffMember.criticalStaff)}
            options={booleanOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="Warden"
            id="warden"
            name="warden"
            defaultValue={staffMember.warden}
            options={wardenTypeOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="Floor Marshal"
            id="floorMarshal"
            name="floorMarshal"
            defaultValue={staffMember.floorMarshal}
            options={floorMarshalTypeOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="ETB"
            id="etb"
            name="etb"
            defaultValue={String(staffMember.etb)}
            options={booleanOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="IFAK"
            id="ifak"
            name="ifak"
            defaultValue={String(staffMember.ifak)}
            options={booleanOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="Advanced Driving"
            id="advancedDriving"
            name="advancedDriving"
            defaultValue={String(staffMember.advancedDriving)}
            options={booleanOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="Inside DS"
            id="insideDs"
            name="insideDs"
            defaultValue={String(staffMember.insideDs)}
            options={booleanOptions}
            placeholder="Select an option"
          />
          <SelectField
            label="Outside DS"
            id="outsideDs"
            name="outsideDs"
            defaultValue={String(staffMember.outsideDs)}
            options={booleanOptions}
            placeholder="Select an option"
          />
        </div>

        <div className="divider my-6 h-[1px] bg-gray-200"></div>
        <FormSectionTitle title="Address Information" />
        <div className="w-full md:col-span-2">
          <MapEditor
            initialLatitude={staffMember.address?.latitude || "36.2021"}
            initialLongitude={staffMember.address?.longitude || "37.1343"}
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
          <AddEditActions submitTitle="Add" />
        </div>
      </form>
    </main>
  );
};

export default EditStaff;
