import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import Image from "next/image";
import { getUserById } from "@/lib/data";
import { updateUser } from "@/lib/actions";
import CancelButton from "@/components/buttons/CancelButton";

interface EditUserProps {
  params: { id: string };
}

const EditUser: React.FC<EditUserProps> = async ({ params }) => {
  const { id } = params;
  const user = await getUserById(id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        className="flex items-center justify-between bg-white rounded-lg p-4"
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Users", href: "/dashboard/users" },
          { label: "Edit User", href: `/dashboard/users/${user.id}/edit` },
        ]}
      />
      <form
        action={updateUser}
        className="flex flex-col gap-4 bg-white rounded-lg p-4"
      >
        <h1 className="font-semibold">Edit User</h1>
        <input type="hidden" name="id" value={user.id} />
        <div className="grid grid-cols-10 gap-x-20">
          <div className="col-span-3 flex flex-col items-center">
            <Image
              src={
                user.profilePicture ||
                (user.sex === "Male"
                  ? "/avatars/noProfilePicture_m.png"
                  : "/avatars/noProfilePicture_f.png")
              }
              alt={`${user.fullName}'s Profile Picture`}
              width={50}
              height={50}
              className="rounded-full w-[150px] h-[150px] object-fill"
            />
            <UploadPicture />
          </div>
          <div className="col-span-4 space-y-4">
            <InputField
              label="Full Name"
              id="fullName"
              name="fullName"
              placeholder={user.fullName}
            />
            <InputField
              label="Position"
              id="position"
              name="position"
              placeholder={user.position}
            />
            <InputField
              label="Email"
              id="email"
              name="email"
              placeholder={user.email}
            />
            <SelectField
              label="Role"
              id="role"
              name="role"
              placeholder={user.role}
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Editor", label: "Editor" },
                { value: "Guest", label: "Guest" },
              ]}
            />
          </div>
        </div>

        {/* Submit Buttons Section */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            type="submit"
            className="bg-mBlue text-sm text-white p-2 rounded-md w-16 cursor-pointer"
          >
            Save
          </button>
          <CancelButton />
        </div>
      </form>
    </main>
  );
};

export default EditUser;
