import React from "react";

const StatusMessage = ({
  message,
  type = "default",
}: {
  message: string;
  type?: "error" | "default";
}) => (
  <div
    className={`flex items-center justify-center h-screen ${
      type === "error" ? "text-red-500" : ""
    }`}
  >
    <div className="text-lg">{message}</div>
  </div>
);

export default StatusMessage;
