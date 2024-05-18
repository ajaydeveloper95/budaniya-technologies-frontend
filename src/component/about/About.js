import React from "react";
import digi from "../../../public/assets/digitalSolutions.png";
import Image from "next/image";

function About() {
  return (
    <section className="pt-10 overflow-hidden bg-transprest dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold leading-tight dark:text-white sm:text-4xl lg:text-5xl">
              Hey 👋
              <br className="block sm:hidden" />,
            </h2>
            <p className="max-w-lg mt-3 text-xl leading-relaxed  dark:text-gray-300 md:mt-8">
              We are a team of tech enthusiasts and creative masterminds who
              strive to bring our client's visions to life. <br /><br /> Our mission is to
              help businesses achieve their goals through effective Technology
              Solutions. 
              <br />At Budaniya Technologies, we believe collaboration and
              innovation are the keys to success. That's why we work closely
              with our clients to understand their unique needs and goals and
              tailor our services to deliver measurable results. <br /> <br /> We take pride
              in our ability to think outside the box and come up with
              innovative solutions that set our clients apart from the
              competition.
            </p>
            <p className="mt-4 text-xl  dark:text-gray-300 md:mt-8">
              <span className="relative inline-block">
                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900" />
                <span className="relative"> Have a question? </span>
              </span>
              <br className="block sm:hidden" />
              Ask me on{" "}
              <a
                href="#"
                title=""
                className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"
              >
                Join@budaniyatechnologies.com
              </a>
            </p>
          </div>
          <div className="relative">
            <Image
              className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110"
              src={digi}
              alt="file"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
