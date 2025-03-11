"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/login/InputFiled";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-stretch shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel - Form */}
        <div className="flex flex-col bg-white p-12 w-[500px] rounded-l-lg">
          <h2 className="mb-8 text-mBlue text-2xl font-bold">
            UNHCR Aleppo SO Staff Database
          </h2>
          <h3 className="text-gray-800 text-xl font-semibold">Welcome back!</h3>
          <p className="mb-6 text-gray-600 text-sm">
            Please enter your credentials to login.
          </p>

          <form onSubmit={handleLogin}>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <InputField
              id="email"
              type="email"
              label="Email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input with Toggle Visibility */}
            <InputField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-4 h-4" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </button>
              }
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mb-5 gap-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>

        {/* Right Panel - Background Image */}
        <div className="bg-[url('/login/unhcr-bg.jpg')] bg-cover bg-center w-[600px] rounded-r-lg"></div>
      </div>
    </div>
  );
};

export default LoginPage;
