"use client";

import MiniTable from "@/components/table/MiniTable";

interface StaffPanelProps {
  title: string;
  fetchUrl: string;
}

const columns = [
  { key: "profilePicture", label: "Profile Picture" },
  { key: "fullName", label: "Full Name" },
  { key: "position", label: "Position" },
  { key: "unhcrEmail", label: "Email" },
  { key: "mobileSyriatel", label: "Syriatel" },
  { key: "mobileMtn", label: "MTN" },
  { key: "extension", label: "Extension" },
];

const StaffPanel = ({ title, fetchUrl }: StaffPanelProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <MiniTable columns={columns} fetchUrl={fetchUrl} />
    </div>
  );
};

export default StaffPanel;
