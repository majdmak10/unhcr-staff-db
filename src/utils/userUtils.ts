export const formatBoolean = (value?: boolean): string =>
  value === true ? "Yes" : value === false ? "No" : "N/A";

export const formatDate = (date?: Date | string): string => {
  if (!date) return "N/A";
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  return parsedDate.toLocaleDateString("en-GB");
};

export const getProfilePicture = (
  profilePicture?: string,
  sex?: string
): string =>
  profilePicture ||
  (sex === "Male"
    ? "/avatars/noProfilePicture_m.png"
    : "/avatars/noProfilePicture_f.png");
