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
