import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Image from "next/image";
import { getStaffById } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import { formatDate } from "@/utils/formatDate";
import ProfileSection from "@/components/profile/ProfileSection";
import AddressSection from "@/components/profile/AddressSection";
import ProfilePageHeader from "@/components/profile/ProfilePageHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";

interface StaffProfileProps {
  params: { id: string };
}

const StaffProfile = async ({ params }: StaffProfileProps) => {
  const { id } = await params;
  const staff = await getStaffById(id);

  if (!staff) {
    return <div>Staff not found</div>;
  }

  return (
    <main className="flex flex-col gap-3">
      {/* Breadcrumbs */}
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          { label: staff.fullName, href: `/dashboard/staff/${staff.id}` },
        ]}
      />

      {/* General Information */}
      <div className="flex flex-col bg-white rounded-lg w-full p-4">
        <ProfilePageHeader
          id={staff.id}
          type="staff"
          deleteAction={deleteStaff}
        />

        <h2 className="text-mBlue font-semibold mt-3">General Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="flex flex-col items-center gap-2 p-4 border-r-[1px] border-[#eaeaea] md:col-span-1">
            <Image
              src={
                staff.profilePicture ||
                (staff.sex === "Male"
                  ? "/avatars/noProfilePicture_m.png"
                  : "/avatars/noProfilePicture_f.png")
              }
              alt={`${staff.fullName}'s Profile Picture`}
              width={140}
              height={140}
              className="rounded-3xl object-fill border-2 border-[#eaeaea]"
            />
            <h3 className="text-md font-bold">{staff.fullName}</h3>
            <span className="font-normal text-sm">
              {staff.position ?? "N/A"}
            </span>
            <span className="font-normal text-sm">{staff.unit ?? "N/A"}</span>
          </div>

          <div className="flex flex-col gap-2 p-4 md:col-span-2">
            {[
              { title: "Date of Birth:", value: formatDate(staff.dateOfBirth) },
              { title: "Sex:", value: staff.sex },
              { title: "Nationality:", value: staff.nationality },
              { title: "Employment Type:", value: staff.employmentType },
              { title: "Position:", value: staff.position },
              { title: "Unit:", value: staff.unit },
              { title: "Blood Type:", value: staff.bloodType },
              { title: "Dependents:", value: staff.dependents },
            ].map((info, index) => (
              <ProfileInfo
                key={index}
                spanTitle={info.title}
                spanInfo={info.value ?? "N/A"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contact, Documents, and Address Sections */}
      <ProfileSection
        title="Contact Information"
        color="text-mRed"
        data={[
          { title: "UNHCR Email:", value: staff.unhcrEmail },
          { title: "Private Email:", value: staff.privateEmail },
          { title: "Mobile (Syriatel):", value: staff.mobileSyriatel },
          { title: "Mobile (MTN):", value: staff.mobileMtn },
          { title: "Home Phone:", value: staff.homePhone },
          { title: "Office Extension:", value: staff.extension },
          { title: "Radio Call:", value: staff.radio },
          {
            title: "Emergency Contact:",
            value: staff.emegencyContact
              ? `${staff.emergencyContact.fullName}, ${staff.emergencyContact.relationship}, ${staff.emergencyContact.mobile}`
              : "N/A",
          },
        ]}
      />

      <ProfileSection
        title="Official Documents Information"
        color="text-mGreen"
        data={[
          { title: "Contract Type:", value: staff.contractType },
          {
            title: "Contract Start Date:",
            value: formatDate(staff.contractStartDate),
          },
          {
            title: "Contract End Date:",
            value: formatDate(staff.contractEndDate),
          },
          { title: "National ID Number:", value: staff.nationalIdNumber },
          {
            title: "National Passport Number:",
            value: staff.nationalPassportNumber,
          },
          {
            title: "National Passport Expiry Date:",
            value: formatDate(staff.passportExpiryDate),
          },
          {
            title: "UNLP Number:",
            value: staff.unlpNumber,
          },
          {
            title: "UNLP Expiry Date:",
            value: formatDate(staff.unlpExpiryDate),
          },
        ]}
      />

      <ProfileSection
        title="Other Information"
        color="text-mOrange"
        data={[
          { title: "Critical Staff:", value: staff.criticalStaff },
          { title: "Warden:", value: staff.warden },
          { title: "Floor Marshal:", value: staff.floorMarshal },
          { title: "ETB:", value: staff.etb },
          { title: "IFAK:", value: staff.ifak },
          { title: "Advanced Driving:", value: staff.advancedDriving },
          { title: "Inside DS:", value: staff.insideDs },
          { title: "Outside DS:", value: staff.outsideDs },
        ]}
      />

      <AddressSection address={staff.address} />
    </main>
  );
};

export default StaffProfile;
