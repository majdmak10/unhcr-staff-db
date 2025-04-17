const columns = [
  { key: "profilePicture", label: "Photo", widthClass: "w-[50px]" },
  { key: "fullName", label: "Full Name", widthClass: "max-w-[120px]" },
  {
    key: "position",
    label: "Position",
    widthClass: "max-w-[120px]",
  },
  {
    key: "unhcrEmail",
    label: "Email",
    widthClass: "max-w-[120px]",
    responsive: true,
  },
  {
    key: "mobileSyriatel",
    label: "Mobile (Syriatel)",
    widthClass: "max-w-[100px]",
    responsive: true,
  },
  {
    key: "mobileMtn",
    label: "Mobile (MTN)",
    widthClass: "max-w-[100px]",
    responsive: true,
  },
];

export default columns;
