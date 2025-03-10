import Image from "next/image";
import Link from "next/link";

interface AddButtonProps {
  href: string;
}

const AddButton: React.FC<AddButtonProps> = ({ href }) => {
  return (
    <main>
      <Link href={href}>
        <button className="bg-mBlue rounded-full p-2" title="Add">
          <Image
            src="/table_icons/add.png"
            alt="Add"
            width={16}
            height={16}
            title="Add"
            className="cursor-pointer"
          />
        </button>
      </Link>
    </main>
  );
};

export default AddButton;
