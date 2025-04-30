import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function Banner() {
  return (
    <section className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Empowering Your Vision with <br />
          </h1>
          <p className="text-gray-300 text-lg">
            We are a team of tech enthusiasts and creative masterminds committed
            to turning your ideas into impactful digital experiences.
          </p>
          <p className="text-gray-400 text-md">
            At{" "}
            <span className="font-semibold text-blue-400">
              Budaniya Technologies
            </span>
            , we focus on collaboration and innovation to deliver measurable
            results with cutting-edge technology.
          </p>

          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search services (e.g., responsive WordPress)"
              className="w-full px-5 py-3 pr-16 rounded-xl bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm placeholder-gray-500 transition"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-4 py-2 rounded-lg shadow-md transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </button>
          </div>

          <Link href="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl text-white font-medium px-6 py-3 rounded-xl transition shadow-md"
            >
              Explore Services
            </motion.button>
          </Link>
        </motion.div>

        {/* Right Video Section */}
        <motion.div
          className="md:w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-[300px] md:w-[450px] rounded-2xl overflow-hidden shadow-2xl">
            <video
              src="/assets/Heo1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Banner;
