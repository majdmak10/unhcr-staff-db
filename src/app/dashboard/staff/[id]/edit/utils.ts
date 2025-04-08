export const formatDate = (date?: Date): string | undefined =>
  date ? date.toISOString().split("T")[0] : undefined;

export const getProfileImage = (
  previewUrl: string | null,
  picture: string | null,
  sex: string
): string => {
  if (previewUrl) return previewUrl;
  if (picture) return picture;

  return sex === "Male"
    ? "/avatars/noProfilePicture_m.png"
    : "/avatars/noProfilePicture_f.png";
};
