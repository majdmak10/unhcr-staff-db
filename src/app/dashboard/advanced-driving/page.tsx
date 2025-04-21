import Table from "@/components/table/Table";
import staffColumns from "@/constants/staffColumns";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getAdvancedDrivingStaff } from "@/lib/data";
import { mapStaffData } from "@/utils/staffDataUtils";

const AdvancedDrivingPage = async () => {
  const staff = await getAdvancedDrivingStaff();
  const data = mapStaffData(staff);

  // ✅ Filter out the "actions" column
  const filteredColumns = staffColumns.filter((col) => col.key !== "actions");

  return (
    <main className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Staff with Advanced Driving",
              href: "/dashboard/staff/advanced-driving",
            },
          ]}
        />
      </div>

      <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
        <Table
          columns={filteredColumns}
          data={data}
          type="staff"
          placeholder="Search staff with advanced driving"
        />
      </div>
    </main>
  );
};

export default AdvancedDrivingPage;
