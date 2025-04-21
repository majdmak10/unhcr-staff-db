import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Table from "@/components/table/Table";
import { getStaff } from "@/lib/data"; // or getConOpsStaff if you're filtering
import { mapStaffData } from "@/utils/staffDataUtils";
// import staffColumns from "@/constants/staffColumns";
import { getColumnsByKeys } from "@/utils/columnsUtils";

const ConOpsPage = async () => {
  const staff = await getStaff(); // or a filtered one
  const data = mapStaffData(staff);

  // const conOpsColumns = staffColumns.filter((col) =>
  //   [
  //     "checkbox",
  //     "profilePicture",
  //     "fullName",
  //     "position",
  //     "unhcrEmail",
  //     "mobileSyriatel",
  //     "bloodType",
  //   ].includes(col.key)
  // );

  // const conOpsColumns = [
  //   staffColumns.find((col) => col.key === "checkbox"),
  //   staffColumns.find((col) => col.key === "profilePicture"),
  //   staffColumns.find((col) => col.key === "fullName"),
  //   staffColumns.find((col) => col.key === "position"),
  //   staffColumns.find((col) => col.key === "mobileSyriatel"),
  //   staffColumns.find((col) => col.key === "unhcrEmail"),
  //   staffColumns.find((col) => col.key === "bloodType"),
  // ].filter(Boolean); // Removes undefined in case a column key doesn't exist

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
