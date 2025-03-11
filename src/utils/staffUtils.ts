interface IAddress {
  neighborhood?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
}

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

export const formatAddress = (address?: IAddress): string => {
  if (!address) return "N/A";
  return `Neighborhood: ${address.neighborhood || "N/A"}, Street: ${
    address.street || "N/A"
  }, Building: ${address.building || "N/A"}, Floor: ${
    address.floor || "N/A"
  }, Apartment: ${address.apartment || "N/A"}`;
};
