export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/buttons/AddButton";
import Table from "@/components/table/Table";
import staffColumns from "@/constants/staffColumns";
import { Suspense } from "react";
import { getStaff } from "@/lib/data";
import { deleteStaff } from "@/lib/actions";
import { mapStaffData } from "@/utils/staffDataUtils";

const StaffPage = async () => {
  const staff = await getStaff();
  const data = mapStaffData(staff);

  return (
    <Suspense fallback={<div>Loading staff...</div>}>
      <main className="flex flex-col gap-3 w-full">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "All Staff", href: "/dashboard/staff" },
            ]}
          />
          <AddButton href="/dashboard/staff/add" />
        </div>

        {/* Table Container */}
        <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
          <Table
            columns={staffColumns}
            data={data}
            deleteAction={deleteStaff}
            type="staff"
            placeholder="Search for a staff member"
          />
        </div>
      </main>
    </Suspense>
  );
};

export default StaffPage;
