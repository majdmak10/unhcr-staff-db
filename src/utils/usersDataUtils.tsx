import Image from "next/image";
import Link from "next/link";
import { getProfilePicture } from "@/utils/userUtils";
import TableActions from "@/components/table/TableActions";
import { deleteUser } from "@/lib/actions";
import { IUser } from "@/types/user.types";

export const mapUserData = (users: IUser[]) =>
  users.map((user) => ({
    id: String(user.id ?? user._id ?? "unknown-id"), // Convert to string
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ),
    profilePicture: (
      <Link href={`/dashboard/users/${user.id ?? user._id ?? "unknown-id"}`}>
        <Image
          src={getProfilePicture(user.profilePicture, user.sex)}
          alt={`${user.fullName}'s Profile Picture`}
          width={50}
          height={50}
          className="rounded-full w-[50px] h-[50px] object-fill"
          priority={true}
        />
      </Link>
    ),
    fullName: (
      <Link
        href={`/dashboard/users/${user.id ?? user._id ?? "unknown-id"}`}
        className="hover:underline"
      >
        {user.fullName}
      </Link>
    ),
    position: user.position || "N/A",
    email: user.email,
    role: user.role,
    actions: (
      <div className="flex gap-2 items-center">
        <TableActions
          id={String(user.id ?? user._id ?? "unknown-id")} // Ensure it's always a string
          type="users"
          deleteAction={deleteUser}
        />
      </div>
    ),
  }));
