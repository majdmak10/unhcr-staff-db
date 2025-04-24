export const fetchCurrentUser = async () => {
  const response = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok || !data.success)
    throw new Error(data.error || "Failed to load profile");
  return data.user;
};
