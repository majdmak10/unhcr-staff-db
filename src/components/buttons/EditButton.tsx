// components/buttons/EditButton.tsx
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface EditButtonProps {
  id: string;
  type: "users" | "staff";
  className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ id, type, className }) => {
  const href =
    type === "users" && id === "me"
      ? "/dashboard/profile/edit"
      : `/dashboard/${type}/${id}/edit`;

  return (
    <Link href={href} className={className}>
      <PencilSquareIcon className="w-5 h-5 stroke-mGreen" />
    </Link>
  );
};

export default EditButton;
