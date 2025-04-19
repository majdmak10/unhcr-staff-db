import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EditStaffForm from "./EditStaffForm";
import { IStaff } from "@/types/staff.types";

interface EditStaffContentProps {
  staffMember: IStaff;
  staffId: string;
}

export default function EditStaffContent({
  staffMember,
  staffId,
}: EditStaffContentProps) {
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
          { label: "Edit Staff", href: `/dashboard/staff/${staffId}/edit` },
        ]}
      />

      <EditStaffForm staffMember={staffMember} />
    </main>
  );
}
