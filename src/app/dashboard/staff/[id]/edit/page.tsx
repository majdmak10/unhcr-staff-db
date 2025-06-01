import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EditStaffForm from "./EditStaffForm";
import { getStaffBySlug } from "@/lib/data";

interface EditStaffProps {
  params: { id: string };
}

const EditStaff = async ({ params }: EditStaffProps) => {
  const { id: slug } = params;

  const staff = await getStaffBySlug(slug);

  if (!staff) {
    return <div className="text-red-500 p-4">Staff member not found</div>;
  }

  const staffMember = JSON.parse(JSON.stringify(staff));

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Staff", href: "/dashboard/staff" },
          {
            label: "Edit Staff",
            href: `/dashboard/staff/${staffMember.slug}/edit`,
          },
        ]}
      />
      <EditStaffForm staffMember={staffMember} />
    </main>
  );
};

export default EditStaff;
