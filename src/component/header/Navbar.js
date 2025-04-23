import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/assets/logoHeader.png";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiGet } from "../../utils/http";

const API_ENDPOINT = '/api/auth/logOut';

function Navbar() {
  const { cartCount } = useCart();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen to storage changes (cross-tab and programmatic)
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
            <path stroke="currentColor" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${show ? "" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 text-white">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/allProducts">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/cart" className="text-2xl">🛒</Link></li>
            {cartCount > 0 && (
              <span className="cart-badge bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-800 px-3 rounded text-white">
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
