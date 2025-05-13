"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Front-end validation for UNHCR domain
    if (!email.endsWith("@unhcr.org")) {
      setError("Please enter a valid @unhcr.org email address.");
      return;
    }

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Failed to send reset link");
      return;
    }

    setMessage(data.message);
    setTimeout(() => router.push("/login"), 3000);
  };

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-8 rounded-lg w-96"
      >
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your UNHCR email"
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </form>
    </main>
  );
};

export default ForgotPassword;
