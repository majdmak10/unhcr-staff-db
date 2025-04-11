export const formatDate = (date?: Date): string | undefined =>
  date ? date.toISOString().split("T")[0] : undefined;

export const withPlaceholder = (
  label: string,
  options: { value: string; label: string }[]
) => [{ value: "", label }, ...options];

export const getProfileImage = (
  profilePicture?: string,
  sex?: string
): string => {
  if (profilePicture) return profilePicture;
  return sex === "Male"
    ? "/avatars/noProfilePicture_m.png"
    : "/avatars/noProfilePicture_f.png";
};
