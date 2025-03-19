import { getUserById } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import DeleteButton from "@/components/buttons/DeleteButton";
import BackButton from "@/components/buttons/BackButton";
import ProfilePicture from "@/components/profile/ProfilePicture";
import EditButton from "@/components/buttons/EditButton";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
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
          { label: `${user.fullName}`, href: `/dashboard/users/${user.id}` },
        ]}
      />
      <div className="flex flex-col gap-3 bg-white rounded-lg w-full p-4">
        <div className="flex justify-between">
          <BackButton />
          <div className="flex justify-end p-4 gap-3">
            <EditButton id={user.id} type="users" />
            <DeleteButton id={user.id} type="user" deleteAction={deleteUser} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 w-full mx-auto md:w-[30%] bg-white rounded-lg p-4 shadow-lg mb-5">
          <ProfilePicture
            profilePicture={user.profilePicture}
            fullName={user.fullName}
            sex={user.sex}
          />
          <h1 className="text-2xl font-semibold mt-3">{user.fullName}</h1>
          <p className="font-semibold">
            Position: <span className="font-normal">{user.position}</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-normal">{user.email}</span>
          </p>
          <p className="font-semibold">
            Role: <span className="font-normal">{user.role}</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
