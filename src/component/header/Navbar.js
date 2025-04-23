import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logoHeader.png";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiGet } from "../../utils/http";

const API_ENDPOINT = "/api/auth/logOut";

function Navbar() {
  const { cartCount } = useCart();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  return (
    <nav className="bg-black top-0 sticky z-10 border-gray-200 dark:bg-gray-900">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={Logo} className="h-8" height={40} alt="Logo" />
          <span className="self-center md:text-2xl text-base font-semibold whitespace-nowrap dark:text-white">
            Budaniya Technologies
          </span>
        </Link>
        <button
          onClick={() => setShow(!show)}
          className="inline-flex items-center p-2 w-10 h-10 md:hidden"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
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
            <li 
              className="relative"
              onMouseEnter={() => setShowProductsDropdown(true)}
              onMouseLeave={() => setShowProductsDropdown(false)}
            >
              <div className="flex items-center">
                <Link 
                  href="/allProducts" 
                  onClick={() => setShowProductsDropdown(!showProductsDropdown)}
                >
                  Products
                </Link>
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
              </div>
              {showProductsDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    href="/products/web-development"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShow(false)}
                  >
                    Web Development
                  </Link>
                  <Link
                    href="/products/frontend"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShow(false)}
                  >
                    Frontend Development
                  </Link>
                  <Link
                    href="/products/backend"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShow(false)}
                  >
                    Backend Development
                  </Link>
                  <Link
                    href="/products/fullstack"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShow(false)}
                  >
                    Fullstack Development
                  </Link>
                  <Link
                    href="/products/mobile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShow(false)}
                  >
                    Mobile Development
                  </Link>
                  <Link
                    href="/allProducts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold border-t border-gray-200"
                    onClick={() => setShow(false)}
                  >
                    View All Products
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li className="flex items-center">
              <Link href="/cart" className="text-2xl">
                🛒
              </Link>
              {cartCount > 0 && (
                <span className="cart-badge bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ml-1">
                  {cartCount}
                </span>
              )}
            </li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-800 px-3 rounded text-white"
              >
                Logout
              </button>
            ) : (
              <Link href="/signIn">
                <button className="bg-blue-800 px-3 rounded text-white">
                  Sign In
                </button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;