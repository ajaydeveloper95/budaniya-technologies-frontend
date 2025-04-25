import Image from "next/image";
import React from "react";
import BannerImg from "../../../public/assets/homeBanner.png";

function Banner() {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full lg:flex-row max-w-fit px-20">
      <div className="grid flex-grow card bg-base-300 md:w-1/2 rounded-box place-items-center">
        <h1>
          We are a team of tech enthusiasts and creative masterminds who strive
          to bring our client's visions to life. Our mission is to help
          businesses achieve their goals through effective Technology Solutions.
          At Budaniya Technologies, we believe collaboration and innovation are
          the keys to success.
          <br /> That's why we work closely with our clients to understand their
          unique needs and goals and tailor our services to deliver measurable
          results. We take pride in our ability to think outside the box and
          come up with innovative solutions that set our clients apart from the
          competition.
        </h1>
      </div>
      <div className="grid flex-grow card m-auto bg-base-300 w-1/2 md:w-1/2 rounded-box place-items-center">
        <Image src={BannerImg} alt="banner" />
      </div>
    </div>
  );
}

export default Banner;
