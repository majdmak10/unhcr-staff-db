import { getWardenStaff } from "@/lib/data";
import { mapStaffData } from "@/utils/staffDataUtils";
import Table from "@/components/table/Table";
import staffColumns from "@/constants/staffColumns";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

const WardenStaffPage = async () => {
  const staff = await getWardenStaff();
  const data = mapStaffData(staff);

  const filteredColumns = staffColumns.filter((col) => col.key !== "actions");

  return (
    <main className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Warden Staff", href: "/dashboard/staff/wardens" },
          ]}
        />
      </div>

      <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
        <Table
          columns={filteredColumns}
          data={data}
          type="staff"
          placeholder="Search warden staff"
        />
      </div>
    </main>
  );
};

export default WardenStaffPage;
