import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

interface ViewButtonProps {
  id: string;
  type: "users" | "staff"; // Define type to handle both cases
  className?: string; // Optional for custom styles
}

const ViewButton: React.FC<ViewButtonProps> = ({ id, type, className }) => {
  return (
    <Link href={`/dashboard/${type}/${id}`} className={className}>
      <EyeIcon className="w-5 h-5 stroke-mBlue" />
    </Link>
  );
};

export default ViewButton;
