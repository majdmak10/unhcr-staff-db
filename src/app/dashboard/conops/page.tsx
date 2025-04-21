import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Table from "@/components/table/Table";
import { getStaff } from "@/lib/data";
import { mapStaffData } from "@/utils/staffDataUtils";
import { getColumnsByKeys } from "@/utils/columnsUtils";

const ConOpsPage = async () => {
  const staff = await getStaff(); // or a filtered one
  const data = mapStaffData(staff);

  const conOpsColumns = getColumnsByKeys([
    "checkbox",
    "profilePicture",
    "fullName",
    "position",
    "mobileSyriatel",
    "mobileMtn",
    "unhcrEmail",
    "bloodType",
  ]);

  return (
    <main className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "ConOps", href: "/dashboard/staff/conops" },
          ]}
        />
      </div>

      <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
        <Table
          columns={conOpsColumns}
          data={data}
          type="staff"
          placeholder="Search staff for ConOps"
        />
      </div>
    </main>
  );
};

export default ConOpsPage;
