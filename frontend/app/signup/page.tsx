"use client";
import { useState } from "react";

export default function Signup() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;

    if (fullName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "Full name is required",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }

    if (!validatePassword(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }

    if (valid) {
      // Placeholder for form submission logic
      console.log(
        "Full Name:",
        fullName,
        "Email:",
        email,
        "Password:",
        password,
        "Confirm Password:",
        confirmPassword
      );
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      setShowConfirmPassword(true);
    } else {
      setShowConfirmPassword(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('/loginpg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="w-full max-w-lg p-12 space-y-8 bg-black bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-100">
          Sign Up
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`relative block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`relative block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className={`relative block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            {showConfirmPassword && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`relative block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-blue-800 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
