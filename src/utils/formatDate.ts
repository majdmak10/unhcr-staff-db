export const formatDate = (date?: Date) => {
  return date
    ? date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "N/A";
};
