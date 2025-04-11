export const getProfileImage = (
  profilePicture?: string,
  sex?: string
): string => {
  if (profilePicture) return profilePicture;
  return sex === "Male"
    ? "/avatars/noProfilePicture_m.png"
    : "/avatars/noProfilePicture_f.png";
};
