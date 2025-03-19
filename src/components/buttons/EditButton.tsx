import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface EditButtonProps {
  id: string;
  type: "users" | "staff"; // Define type to handle both cases
  className?: string; // Optional for custom styles
}

const EditButton: React.FC<EditButtonProps> = ({ id, type, className }) => {
  return (
    <Link href={`/dashboard/${type}/${id}/edit`} className={className}>
      <PencilSquareIcon className="w-5 h-5 stroke-mGreen" />
    </Link>
  );
};

export default EditButton;
