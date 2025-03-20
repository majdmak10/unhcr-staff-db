import Image from "next/image";
import Link from "next/link";
import { getProfilePicture } from "@/utils/userUtils";
import TableActions from "@/components/table/TableActions";
import { deleteUser } from "@/lib/actions";

// Define the type of users if not already done
interface User {
  id: string;
  fullName: string;
  position?: string;
  email: string;
  role: string;
  profilePicture?: string;
  sex?: string;
}

export const mapUserData = (users: User[]) =>
  users.map((user) => ({
    id: user.id,
    checkbox: (
      <input
        type="checkbox"
        aria-label="Select row"
        className="w-4 h-4 accent-mBlue mt-1"
      />
    ),
    profilePicture: (
      <Link href={`/dashboard/users/${user.id}`}>
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
      <Link href={`/dashboard/users/${user.id}`} className="hover:underline">
        {user.fullName}
      </Link>
    ),
    position: user.position || "N/A",
    email: user.email,
    role: user.role,
    actions: (
      <div className="flex gap-2 items-center">
        <TableActions id={user.id} type="users" deleteAction={deleteUser} />
      </div>
    ),
  }));
