import React, { useState } from "react";
import { apiPost } from "../../utils/http";

const API_ENDPOINT = "api/auth/signUp";

const SignUp = () => {
  const referenceWebsite = process.env.NEXT_PUBLIC_REFERENCE_WEBSITE;
  const [formData, setFormData] = useState({
    referenceWebsite,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    role: "user",
    company: "",
    gstInNumber: "",
    isRequestedForVendor: true,
    commissionRate: 10,
    wallet: 500,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      mobile,
      address,
      company,
      gstInNumber,
    } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile || !address) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await apiPost(API_ENDPOINT, { ...formData });

      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        setSuccess(response?.message || "Registration successful!");
        setTimeout(() => {
          window.location.href = "/signIn";
        }, 1500);
      } else {
        setError(response?.msg || "Signup failed.");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white/20 backdrop-blur-lg text-black">
        
        {/* Left Image (Hidden on small screens) */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://t4.ftcdn.net/jpg/03/86/51/03/360_F_386510351_03Qk3je4FGnVLo4vXRdOpoDWfZjtmajd.jpg"
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
            Create Your Account
          </h2>

          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm text-center">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "firstName", placeholder: "First Name" },
                { name: "lastName", placeholder: "Last Name" },
                { name: "email", placeholder: "Email", type: "email" },
                { name: "mobile", placeholder: "Mobile" },
                { name: "address", placeholder: "Address" },
                { name: "company", placeholder: "Company" },
                { name: "gstInNumber", placeholder: "GSTIN Number" },
                { name: "password", placeholder: "Password", type: "password" },
                { name: "confirmPassword", placeholder: "Confirm Password", type: "password" },
              ].map(({ name, placeholder, type = "text" }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-white mt-4">
            Already have an account?{" "}
            <a href="/signIn" className="text-blue-400 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
