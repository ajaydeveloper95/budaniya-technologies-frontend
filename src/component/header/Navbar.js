import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import { apiGet } from "../../utils/http";
import Logo from "../../../public/assets/logoHeader.png";
import "react-toastify/dist/ReactToastify.css";

const API_ENDPOINT = "/api/auth/logOut";
const CATEGORIES_API = "https://api.budaniyatechnologies.com/api/categories/";

function Navbar() {
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem("accessToken");
      setIsLoggedIn(!!updatedToken);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGet(CATEGORIES_API);
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.categories || [];
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "/signIn";
        return;
      }

      await apiGet(API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("accessToken");
      toast.success("Logout successful");
      setTimeout(() => (window.location.href = "/signIn"), 1500);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <nav className="bg-black sticky top-0 z-50 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={Logo} className="h-8" height={40} alt="Logo" />
          <span className="self-center md:text-lg text-base font-semibold whitespace-nowrap dark:text-white">
            Budaniya Technologies
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/allProducts" className="text-gray-300 hover:text-white">
            All Items
          </Link>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-1.5 w-64 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <ul className="flex flex-col md:flex-row md:space-x-8 text-white">
          <li className="hover:text-gray-300">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-gray-300">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-gray-300">
            <Link href="/services">Services</Link>
          </li>
          <li className="hover:text-gray-300">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:text-gray-300">
            <Link href="/order">Order</Link>
          </li>

          <li className="flex items-center hover:text-gray-300">
            <Link href="/cart" className="text-2xl flex items-center">
              🛒
              {cartCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>

          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-800 px-3 py-1 rounded text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/signIn">
                <button className="bg-blue-800 px-3 py-1 rounded text-white hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-800 py-2 px-4" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto">
          <ul className="flex flex-wrap justify-center space-x-6 text-white">
            {loadingCategories ? (
              <li>Loading Categories...</li>
            ) : (
              categories.map((cat) => (
                <li
                  key={cat._id}
                  className="relative"
                >
                  <button 
                    onClick={() => toggleCategory(cat._id)}
                    className="hover:text-gray-300 py-1 px-2 font-medium flex items-center"
                  >
                    {cat.name}
                    {cat.subcat?.length > 0 && (
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Dropdown for subcategories */}
                  {cat.subcat?.length > 0 && openCategory === cat._id && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {cat.subcat.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/allProducts?subcategory=${sub.name}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpenCategory(null)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;