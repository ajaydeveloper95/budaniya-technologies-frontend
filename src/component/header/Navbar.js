import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import { apiGet } from "../../utils/http";
import Logo from "../../../public/assets/logoHeader.png";
import "react-toastify/dist/ReactToastify.css";
import { ChevronDown, ChevronUp, Menu, X, ShoppingCart } from "lucide-react";

const API_ENDPOINT = "/api/auth/logOut";
const CATEGORIES_API = "api/categories/";

function Navbar() {
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileCategories = () => {
    setMobileCategoriesOpen(!mobileCategoriesOpen);
  };

  return (
    <nav className="bg-black sticky top-0 z-50 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src={Logo} className="h-8" height={40} alt="Logo" />
            <span className="self-center text-lg font-semibold whitespace-nowrap text-white">
              Budaniya Technologies LLP
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link href="/allProducts" className="text-white hover:text-gray-300">
              Products
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300">
              Services
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
            <Link href="/order" className="text-white hover:text-gray-300">
              Order
            </Link>

            <Link href="/cart" className="text-white hover:text-gray-300 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-800 px-3 py-1 rounded text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link href="/signIn">
                <button className="bg-blue-800 px-3 py-1 rounded text-white hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link href="/cart" className="text-white mr-4 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              href="/allProducts"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              Products
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
            <Link
              href="/order"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={toggleMobileMenu}
            >
              Order
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/signIn"
                className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                onClick={toggleMobileMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Categories Bar */}
      <div className="bg-gray-800 py-2" ref={dropdownRef}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Categories Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileCategories}
              className="flex items-center justify-between w-full px-3 py-2 text-white font-medium"
            >
              <span>Categories</span>
              {mobileCategoriesOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Categories Menu */}
          {mobileCategoriesOpen && (
            <div className="md:hidden bg-gray-700 rounded-md mt-1">
              {loadingCategories ? (
                <div className="px-4 py-2 text-white">Loading...</div>
              ) : (
                categories.map((cat) => (
                  <div key={cat._id} className="border-b border-gray-600 last:border-b-0">
                    <button
                      onClick={() => toggleCategory(cat._id)}
                      className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-gray-600"
                    >
                      <span>{cat.name}</span>
                      {cat.subcat?.length > 0 && (
                        openCategory === cat._id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      )}
                    </button>
                    {cat.subcat?.length > 0 && openCategory === cat._id && (
                      <div className="ml-4 bg-gray-800 rounded-md">
                        {cat.subcat.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/allProducts?subcategoryId=${sub._id}`}
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                            onClick={() => {
                              setMobileCategoriesOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Desktop Categories Menu */}
          <div className="hidden md:flex flex-wrap gap-4">
            {loadingCategories ? (
              <div className="text-white">Loading Categories...</div>
            ) : (
              categories.slice(0, 10).map((cat) => (
                <div key={cat._id} className="relative">
                  <button
                    onClick={() => toggleCategory(cat._id)}
                    className="flex items-center text-white hover:text-gray-300 py-1 px-2 font-medium"
                  >
                    {cat.name}
                    {cat.subcat?.length > 0 && (
                      openCategory === cat._id ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )
                    )}
                  </button>
                  {cat.subcat?.length > 0 && openCategory === cat._id && (
                    <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-50">
                      <div className="py-1">
                        {cat.subcat.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/allProducts?subcategoryId=${sub._id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setOpenCategory(null)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;