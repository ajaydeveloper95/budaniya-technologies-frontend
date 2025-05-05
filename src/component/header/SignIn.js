import React, { useState } from "react";
import { useRouter } from "next/router";
import { apiPost } from "../../utils/http";

const API_ENDPOINT = "api/auth/logIn";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Get the referenceWebsite from the environment variable
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    // Validate all fields are filled
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await apiPost(API_ENDPOINT, {
        email,
        password,
        referenceWebsite,
      });

      if (response?.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setSuccess(response?.message || "Registration successful!");
        router.push("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Left Side (Image) */}
        <div className="w-1/2 h-full">
          <img
            src="https://png.pngtree.com/background/20231013/original/pngtree-login-blue-square-web-glossy-icon-sign-area-website-photo-picture-image_5509241.jpg" // Replace with your image path
            alt="Sign In Image"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Sign In
          </h2>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm text-center mb-4">
              {error}
            </div>
            
          )}
          {success && <div className="text-green-400 text-sm text-center">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border text-gray-700 border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signUp" className="text-blue-600 hover:text-blue-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;