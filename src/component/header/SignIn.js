import React, { useState } from "react";
import { useRouter } from "next/router";
import { apiPost } from "../../utils/http";

const API_ENDPOINT = "api/auth/logIn";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!email || !password) {
      setError("All fields are required");
      setLoading(false);
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
        setSuccess(response?.message || "Login successful!");
        router.push("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Side (Image) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
          <img
            src="https://images.ctfassets.net/23aumh6u8s0i/1MHyeo57ac0lpMJOGIhPwd/76f2cdd335c31ee4edc29c8da5527f54/Introducing_Auth0_Actions01A.png"
            alt="Sign In"
            className="w-full h-full object-contain p-8"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Sign In
          </h2>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm text-center mb-4">{success}</div>
          )}

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
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 mr-2 border-gray-300 rounded"
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
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
