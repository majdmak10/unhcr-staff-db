// import { getUserById } from "@/lib/data";
import { deleteUser } from "@/lib/actions";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import ProfilePicture from "@/components/profile/ProfilePicture";
import ProfilePageHeader from "@/components/profile/ProfilePageHeader";
import { getUserBySlug } from "@/lib/data";

const UserProfile = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: slug } = await params;
  const user = await getUserBySlug(slug);

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
        <ProfilePageHeader
          id={user.id}
          type="users"
          deleteAction={deleteUser}
        />
        <div className="flex flex-col justify-center items-center gap-4 w-full mx-auto md:w-[30%] bg-white rounded-lg p-4 shadow-lg mb-5 border border-gray-200">
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
