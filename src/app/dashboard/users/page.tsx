export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/buttons/AddButton";
import Table from "@/components/table/Table";
import userColumns from "@/constants/userColumns";
import { Suspense } from "react";
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import { mapUserData } from "@/utils/usersDataUtils";
import { IUser } from "@/types/user.types";

const UserPage = async () => {
  const users: IUser[] = await getUsers();
  const data = mapUserData(users);

  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <main className="flex flex-col gap-3 w-full">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "All Users", href: "/dashboard/users" },
            ]}
            className="shadow-none"
          />
          <AddButton href="/dashboard/users/add" />
        </div>

        {/* Table Container */}
        <div className="flex flex-col items-center bg-white rounded-lg p-4 shadow">
          <Table
            columns={userColumns}
            data={data}
            deleteAction={deleteUser}
            type="user"
            placeholder="Search for a user"
          />
        </div>
      </main>
    </Suspense>
  );
};

export default UserPage;
