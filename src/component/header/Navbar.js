import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logoHeader.png";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiGet } from "../../utils/http";

const API_ENDPOINT = "/api/auth/logOut";
const CATEGORIES_API = "https://api.budaniyatechnologies.com/api/categories/";

function Navbar() {
  const { cartCount, category, setCategory } = useCart();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showStaticTemplatesDropdown, setShowStaticTemplatesDropdown] = useState(false);
  const [showDynamicTemplatesDropdown, setShowDynamicTemplatesDropdown] = useState(false);

  // Refs for dropdowns
  const productsDropdownRef = useRef(null);
  const staticTemplatesDropdownRef = useRef(null);
  const dynamicTemplatesDropdownRef = useRef(null);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        setShowProductsDropdown(false);
      }
      if (staticTemplatesDropdownRef.current && !staticTemplatesDropdownRef.current.contains(event.target)) {
        setShowStaticTemplatesDropdown(false);
      }
      if (dynamicTemplatesDropdownRef.current && !dynamicTemplatesDropdownRef.current.contains(event.target)) {
        setShowDynamicTemplatesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGet(CATEGORIES_API);
        const categoriesData = Array.isArray(response.data)
          ? response.data
          : response.data.categories || [];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load product categories");
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsLoggedIn(false);
        window.location.href = "/signIn";
        return;
      }

      await apiGet(API_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("accessToken");
      toast.success("Logout successfully");
      setIsLoggedIn(false);
      setTimeout(() => {
        window.location.href = "/signIn";
      }, 1500);
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  const toggleProductsDropdown = (e) => {
    e.preventDefault();
    setShowProductsDropdown(!showProductsDropdown);
    // Close other dropdowns when opening this one
    setShowStaticTemplatesDropdown(false);
    setShowDynamicTemplatesDropdown(false);
  };

  const toggleStaticTemplatesDropdown = (e) => {
    e.preventDefault();
    setShowStaticTemplatesDropdown(!showStaticTemplatesDropdown);
    // Close other dropdowns when opening this one
    setShowProductsDropdown(false);
    setShowDynamicTemplatesDropdown(false);
  };

  const toggleDynamicTemplatesDropdown = (e) => {
    e.preventDefault();
    setShowDynamicTemplatesDropdown(!showDynamicTemplatesDropdown);
    // Close other dropdowns when opening this one
    setShowProductsDropdown(false);
    setShowStaticTemplatesDropdown(false);
  };

  return (
    <nav className="bg-black top-0 sticky z-10 border-gray-200 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={Logo} className="h-8" height={40} alt="Logo" />
          <span className="self-center md:text-lg text-base font-semibold whitespace-nowrap dark:text-white">
            Budaniya Technologies
          </span>
        </Link>

        <button
          onClick={() => setShow(!show)}
          className="inline-flex items-center p-2 w-10 h-10 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center space-x-6">
          <li
            className="relative list-none"
            ref={productsDropdownRef}
          >
            <div className="flex items-center">
              <Link
                href="/allProducts"
                onClick={toggleProductsDropdown}
                className="flex items-center"
              >
                Products
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
            </div>

            {showProductsDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20">
                {loadingCategories ? (
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Loading categories...
                  </div>
                ) : categories.length > 0 ? (
                  <>
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/allProducts`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setShow(false);
                          setShowProductsDropdown(false);
                          setCategory(category?.name);
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 mt-1">
                      <Link
                        href="/allProducts"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                        onClick={() => {
                          setShow(false);
                          setShowProductsDropdown(false);
                          setCategory("all");
                        }}
                      >
                        View All Products
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-700">
                    No categories available
                  </div>
                )}
              </div>
            )}
          </li>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-8 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
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

        <div className={`${show ? "" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 text-white">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/order">Order</Link>
            </li>

            <li className="flex items-center">
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
      </div>
      <div className="flex flex-wrap items-center justify-evenly mx-auto p-4">
        <div className={`${show ? "" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 text-white">
            {/* Static Templates Dropdown */}
            <li
              className="relative"
              ref={staticTemplatesDropdownRef}
            >
              <div className="flex items-center">
                <Link
                  href="/allProducts"
                  onClick={toggleStaticTemplatesDropdown}
                  className="flex items-center"
                >
                  Static Templates
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
              </div>

              {showStaticTemplatesDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    href="/staticTemplates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowStaticTemplatesDropdown(false)}
                  >
                    Template 1
                  </Link>
                  <Link
                    href="/staticTemplates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowStaticTemplatesDropdown(false)}
                  >
                    Template 2
                  </Link>
                  <Link
                    href="/staticTemplates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowStaticTemplatesDropdown(false)}
                  >
                    Template 3
                  </Link>
                </div>
              )}
            </li>

            {/* Dynamic Templates Dropdown */}
            <li
              className="relative"
              ref={dynamicTemplatesDropdownRef}
            >
              <div className="flex items-center">
                <Link
                  href="/allProducts"
                  onClick={toggleDynamicTemplatesDropdown}
                  className="flex items-center"
                >
                  Dynamic Templates
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
              </div>

              {showDynamicTemplatesDropdown && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    href="/dynamicTemplates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDynamicTemplatesDropdown(false)}
                  >
                    Dynamic Template 1
                  </Link>
                  <Link
                    href="/dynamicTemplates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDynamicTemplatesDropdown(false)}
                  >
                    Dynamic Template 2
                  </Link>
                  <Link
                    href="/dynamicTemplates"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowDynamicTemplatesDropdown(false)}
                  >
                    Dynamic Template 3
                  </Link>
                </div>
              )}
            </li>

            {/* Other Menu Items */}
            <li>
              <Link href="/allProducts">Admin Templates</Link>
            </li>
            <li>
              <Link href="/allProducts">React Templates</Link>
            </li>
            <li>
              <Link href="/allProducts">Graphics Templates</Link>
            </li>
            <li>
              <Link href="/allProducts">LMS & CRM Soft</Link>
            </li>
            <li>
              <Link href="/allProducts">Hiring Consideration</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;