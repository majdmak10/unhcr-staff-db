import Breadcrumbs from "@/components/layout/Breadcrumbs";
import InputField from "@/components/form/InputFiled";
import SelectField from "@/components/form/SelectFiled";
import UploadPicture from "@/components/form/UploadPicture";
import { getUserById } from "@/lib/data";
import { updateUser } from "@/lib/actions";
import AddEditActions from "@/components/form/AddEditActions";

interface EditUserProps {
  params: { id: string };
}

const EditUser = async ({ params }: EditUserProps) => {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return <div className="text-center text-red-500">User not found</div>;
  }

  const profilePicture =
    user.profilePicture ||
    (user.sex === "Male"
      ? "/avatars/noProfilePicture_m.png"
      : "/avatars/noProfilePicture_f.png");

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
        <h1 className="font-semibold text-lg">Edit User</h1>
        <input type="hidden" name="id" value={user.id} />

        <div className="flex flex-col items-center justify-center space-y-4 w-full md:w-[80%] mx-auto">
          <UploadPicture
            variant="user"
            name="profilePicture"
            initialImage={profilePicture}
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

          <SelectField
            label="Role"
            id="role"
            name="role"
            defaultValue={user.role}
            placeholder="Select role"
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Editor", label: "Editor" },
              { value: "Guest", label: "Guest" },
            ]}
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
