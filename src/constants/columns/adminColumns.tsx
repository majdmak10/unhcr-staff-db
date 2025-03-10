import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/types/user.types";
import Image from "next/image";
import Link from "next/link";

const adminColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "profilePicture",
    header: "Picture",
    cell: ({ row }) => {
      const profilePicture = row.original.profilePicture;
      return profilePicture ? (
        <Image
          src={profilePicture}
          alt="Profile"
          width={36}
          height={36}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
          N/A
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/admins/${row.original.id}`}
        className="text-blue-500 hover:underline"
      >
        {row.original.fullName}
      </Link>
    ),
    size: 200,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <span>{row.original.position}</span>,
    size: 200,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email}</span>,
    size: 250,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="text-blue-500">{row.original.role}</span>
    ),
    size: 150,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const userId = row.original.id;
      return (
        <div className="space-x-2">
          <button
            onClick={() => console.log(`Editing ${userId}`)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => console.log(`Deleting ${userId}`)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      );
    },
    size: 150,
  },
];

export default adminColumns;
