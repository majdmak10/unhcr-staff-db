import Link from "next/link";
import Image from "next/image";

interface EditButtonProps {
  id: string;
  type: "users" | "staff"; // Define type to handle both cases
  className?: string; // Optional for custom styles
}

const EditButton: React.FC<EditButtonProps> = ({ id, type, className }) => {
  return (
    <Link href={`/dashboard/${type}/${id}/edit`} className={className}>
      <Image src="/table_icons/edit.png" alt="Edit" width={20} height={20} />
    </Link>
  );
};

export default EditButton;
