// User dropdown options
export const roleOptions = ["Admin", "Editor", "Guest"].map((role) => ({
  value: role,
  label: role,
}));

// Staff dropdown options

export const employmentTypeOptions = [
  { value: "International", label: "International" },
  { value: "National", label: "National" },
];

export const unitOptions = [
  "Admin",
  "Communication",
  "Field",
  "Information Management",
  "Livelihood",
  "Management",
  "Programme",
  "Project Control",
  "Protection",
  "Security",
  "Shelter",
  "Supply",
  "Transportation",
].map((unit) => ({ value: unit, label: unit }));

export const bloodTypeOptions = [
  "A+",
  "B+",
  "AB+",
  "O+",
  "A-",
  "B-",
  "AB-",
  "O-",
].map((type) => ({ value: type, label: type }));

export const contractTypeOptions = [
  { value: "Fixed", label: "Fixed" },
  { value: "Temporary", label: "Temporary" },
];

export const wardenTypeOptions = [
  { value: "Warden", label: "Warden" },
  { value: "Deputy Warden", label: "Deputy Warden" },
  { value: "None", label: "None" },
];

export const floorMarshalTypeOptions = [
  { value: "Floor Marshal", label: "Floor Marshal" },
  { value: "Deputy Floor Marshal", label: "Deputy Floor Marshal" },
  { value: "None", label: "None" },
];

export const booleanOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

// Shared dropdown options
export const sexOptions = [
  { value: "Female", label: "Female" },
  { value: "Male", label: "Male" },
];
