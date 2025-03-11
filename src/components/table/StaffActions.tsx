import Link from "next/link";
import Image from "next/image";
import DeleteButton from "../buttons/DeleteButton";
import { deleteStaff } from "@/lib/actions";

// Define props type
interface StaffActionsProps {
  id: string;
}

const StaffActions: React.FC<StaffActionsProps> = ({ id }) => {
  return (
    <div className="flex gap-2 justify-start items-center">
      <Link href={`/dashboard/staff/${id}`}>
        <Image
          src="/table_icons/view.png"
          alt="View"
          width={20}
          height={20}
          loading="lazy"
        />
      </Link>
      <Link href={`/dashboard/staff/${id}/edit`}>
        <Image
          src="/table_icons/edit.png"
          alt="Edit"
          width={20}
          height={20}
          loading="lazy"
        />
      </Link>
      <DeleteButton id={id} type="staff" deleteAction={deleteStaff} />
    </div>
  );
};

export default StaffActions;
