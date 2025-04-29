import Image from "next/image";
import React from "react";
import BannerImg from "../../../public/assets/homeBanner.png"; // Replace with your tech-style image
import Link from "next/link";

function Banner() {
  return (
    <div className=" py-12 px-4 md:px-20 text-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-6 text-left">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Empowering Your Vision with <br />
            hello hello
            <span className="text-blue-300">Innovative Tech Solutions</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-200">
            We are a team of tech enthusiasts and creative masterminds who
            strive to bring our client&apos;s visions to life. Our mission is to
            help businesses achieve their goals through effective technology
            solutions.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-300">
            At{" "}
            <span className="font-semibold text-blue-400">
              Budaniya Technologies
            </span>
            , we believe collaboration and innovation are the keys to success.
            We tailor our services to deliver measurable results through
            cutting-edge solutions.
          </p>

          {/* Search Bar Styled Like Image */}
          <div className="bg-white rounded-lg shadow-md flex items-center overflow-hidden w-full">
            <input
              type="text"
              placeholder="e.g. responsive WordPress"
              className="flex-grow px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 font-semibold transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              Search
            </button>
          </div>

          <Link href="/services">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition">
              Explore Services
            </button>
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center items-center">
          <Image
            src={BannerImg}
            alt="Budaniya Tech Banner"
            className="rounded-xl shadow-lg"
            width={500}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
