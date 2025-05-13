import Table from "@/components/table/Table";
import staffColumns from "@/constants/staffColumns";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { getOutsideDsStaff } from "@/lib/data";
import { mapStaffData } from "@/utils/staffDataUtils";

const OutsideDsPage = async () => {
  const staff = await getOutsideDsStaff();
  const data = mapStaffData(staff);

  // ✅ Filter out the "actions" column
  const filteredColumns = staffColumns.filter((col) => col.key !== "actions");

  return (
    <main className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between bg-white rounded-lg shadow">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Staff Outside DS",
              href: "/dashboard/staff/outside-ds",
            },
          ]}
          className="shadow-none"
        />
      </div>

      <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
        <Table
          columns={filteredColumns}
          data={data}
          type="staff"
          placeholder="Search staff outside ds"
        />
      </div>
    </main>
  );
};

export default OutsideDsPage;
