import Breadcrumbs from "@/components/layout/Breadcrumbs";
import EditStaffForm from "./EditStaffForm";
// import { getStaffById } from "@/lib/data";
import { getStaffBySlug } from "@/lib/data";

interface EditStaffProps {
  params: { id: string };
}

const EditStaff = async (props: EditStaffProps) => {
  const { id: slug } = await props.params; // Await the `params` properly.
  const staff = await getStaffBySlug(slug);

  if (!staff) {
    return <div className="text-red-500 p-4">Staff member not found</div>;
  }

  const staffMember = JSON.parse(JSON.stringify(staff));

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
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
