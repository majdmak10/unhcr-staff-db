export const getUserRole = async (): Promise<string | null> => {
  try {
    const res = await fetch("/api/auth/verify", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user.role || null;
  } catch (error) {
    console.error("Error verifying user:", error);
    return null;
  }
};
