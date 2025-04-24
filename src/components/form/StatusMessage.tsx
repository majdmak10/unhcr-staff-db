import React from "react";

const StatusMessage = ({
  message,
  type = "default",
}: {
  message: string;
  type?: "error" | "default" | "loading" | "success";
}) => (
  <div
    className={`flex flex-col gap-2 items-center justify-center h-screen ${
      type === "error"
        ? "text-red-500"
        : type === "success"
        ? "text-green-500"
        : "text-gray-700"
    }`}
  >
    {type === "loading" && (
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mBlue" />
    )}
    <div className="text-lg">{message}</div>
  </div>
);

export default StatusMessage;
