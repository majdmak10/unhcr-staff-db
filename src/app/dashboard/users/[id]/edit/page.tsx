import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import { getUserById } from "@/lib/data";
import { updateUser } from "@/lib/actions";
import AddEditActions from "@/components/form/AddEditActions";
import { roleOptions } from "@/utils/dropdownOptions";
import { getProfileImage } from "./userEditUtils";

interface EditUserProps {
  params: { id: string };
}

const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return <div className="text-center text-red-500">User not found</div>;
  }

  return (
    <main className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "All Users", href: "/dashboard/users" },
          { label: "Edit User", href: `/dashboard/users/${user.id}/edit` },
        ]}
      />

      <form
        action={updateUser}
        className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow"
      >
        <h1 className="font-semibold text-lg">Edit User</h1>
        <input type="hidden" name="id" value={user.id} />

        <div className="flex flex-col items-center justify-center space-y-4 w-full md:w-[80%] mx-auto">
          <UploadPicture
            variant="userEdit"
            name="profilePicture"
            initialImage={getProfileImage(user.profilePicture, user.sex)}
          />

          <InputField
            label="Full Name"
            id="fullName"
            name="fullName"
            defaultValue={user.fullName}
            placeholder="Enter full name"
          />

          <InputField
            label="Position"
            id="position"
            name="position"
            defaultValue={user.position}
            placeholder="Enter position"
          />

          <InputField
            label="Email"
            id="email"
            name="email"
            type="email"
            defaultValue={user.email}
            placeholder="Enter email"
          />

          <InputField
            label="Mobile (Syriatel)"
            id="mobileSyriatel"
            name="mobileSyriatel"
            defaultValue={user.mobileSyriatel?.trim() || "N/A"}
          />

          <InputField
            label="Mobile (MTN)"
            id="mobileMtn"
            name="mobileMtn"
            defaultValue={user.mobileMtn?.trim() || "N/A"}
          />

          <SelectField
            label="Role"
            id="role"
            name="role"
            defaultValue={user.role}
            options={roleOptions}
            placeholder="Select role"
          />
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <AddEditActions submitTitle="Update" />
        </div>
      </form>
    </main>
  );
};

export default EditUser;
