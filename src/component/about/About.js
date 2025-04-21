import React from "react";
import digi from "../../../public/assets/digitalSolutions.png";
import Image from "next/image";

function About() {
  return (
    <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 xl:pt-32 xl:pb-28 bg-transparent">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
              Hey 👋
              <br className="block sm:hidden" />,
            </h2>
            <p className="mt-4 text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              We are a team of tech enthusiasts and creative masterminds who
              strive to bring our client's visions to life.
              <br /><br />
              Our mission is to help businesses achieve their goals through effective
              Technology Solutions.
              <br />
              At Budaniya Technologies, we believe collaboration and innovation
              are the keys to success. That's why we work closely with our clients
              to understand their unique needs and tailor our services to deliver
              measurable results.
              <br /><br />
              We take pride in our ability to think outside the box and come up
              with innovative solutions that set our clients apart from the competition.
            </p>

            <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
              <span className="relative inline-block">
                <span className="absolute bottom-0.5 left-0 w-full h-2 bg-yellow-300 dark:bg-gray-900 z-[-1]" />
                <span className="relative font-medium">Have a question?</span>
              </span>
              <br className="block sm:hidden" />
              Ask us at{" "}
              <a
                href="mailto:join@budaniyatechnologies.com"
                className="text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 underline transition duration-200"
              >
                join@budaniyatechnologies.com
              </a>
            </p>
          </div>

          {/* Image Section */}
          <div className="relative">
            <Image
              className="w-full max-w-md md:max-w-lg xl:max-w-xl mx-auto transform 2xl:origin-bottom 2xl:scale-110"
              src={digi}
              alt="Digital Solutions"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
