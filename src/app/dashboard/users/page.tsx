export const dynamic = "force-dynamic";

import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AddButton from "@/components/buttons/AddButton";
import DeleteButton from "@/components/buttons/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import Table from "@/components/table/Table";
import { Suspense } from "react";
import userColumns from "@/constants/userColumns";
import { getProfilePicture } from "@/utils/userUtils";
import { EyeIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const UserPage = async () => {
  const user = await getUsers();

  const data = user.map((user) => ({
    id: user.id,
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ), // Row checkbox
    profilePicture: (
      <Link href={`/dashboard/users/${user.id}`}>
        <Image
          src={getProfilePicture(user.profilePicture, user.sex)}
          alt={`${user.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
        />
      </Link>
    ),
    fullName: <Link href={`/dashboard/users/${user.id}`}>{user.fullName}</Link>,
    position: user.position || "N/A",
    email: user.email,
    role: user.role,
    actions: (
      <div className="flex gap-2 justify-start items-center">
        <Link href={`/dashboard/users/${user.id}`}>
          <EyeIcon className="w-5 h-5 stroke-mBlue" />
        </Link>
        <Link href={`/dashboard/users/${user.id}/edit`}>
          <PencilSquareIcon className="w-5 h-5 stroke-mGreen" />
        </Link>
        <DeleteButton id={user.id} type="user" deleteAction={deleteUser} />
      </div>
    ),
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-3 w-full min-w-full">
        <div className="flex items-center justify-between bg-white rounded-lg p-4">
          <Breadcrumbs
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "All Users", href: "/dashboard/users" },
            ]}
          />
          <AddButton href="/dashboard/users/add" />
        </div>
        <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4">
          <Table
            columns={userColumns}
            data={data}
            deleteAction={deleteUser}
            type="user"
            placeholder="Search for an user"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default UserPage;
