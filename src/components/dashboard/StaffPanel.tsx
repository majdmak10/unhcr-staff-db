"use client";

import MiniTable from "@/components/table/MiniTable";
import columns from "@/constants/panelsColumns";

interface StaffPanelProps {
  title: string;
  fetchUrl: string;
  type: "total" | "inside" | "outside";
}

const titleColorMap: { [key: string]: string } = {
  total: "text-mBlue",
  inside: "text-mGreen",
  outside: "text-mRed",
};

const StaffPanel = ({ title, fetchUrl, type }: StaffPanelProps) => {
  const titleColor = titleColorMap[type];

  return (
    <main className="bg-white rounded-lg shadow p-4">
      <h3 className={`text-lg font-semibold mb-4 ${titleColor}`}>{title}</h3>
      <MiniTable columns={columns} fetchUrl={fetchUrl} />
    </main>
  );
};

export default StaffPanel;
