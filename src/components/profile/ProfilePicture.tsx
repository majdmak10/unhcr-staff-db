import Image from "next/image";
import clsx from "clsx"; // Optional for better class merging

interface ProfilePictureProps {
  profilePicture?: string;
  fullName: string;
  sex: "Male" | "Female";
  className?: string; // Allow custom classes
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  profilePicture,
  fullName,
  sex,
  className,
}) => {
  return (
    <Image
      src={
        profilePicture ||
        (sex === "Male"
          ? "/avatars/noProfilePicture_m.png"
          : "/avatars/noProfilePicture_f.png")
      }
      alt={`${fullName}'s Profile Picture`}
      width={96}
      height={96}
      className={clsx(
        "rounded-full border border-gray-300 shadow-md object-cover w-28 h-28", // Default styles
        className // Allow custom styles
      )}
    />
  );
};

export default ProfilePicture;
