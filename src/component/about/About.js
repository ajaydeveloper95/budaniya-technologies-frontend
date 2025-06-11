import React from "react";

function About() {
  return (
    <section className="min-h-screen bg-primary text-white py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left Side: Video */}
      <div className="w-full md:w-5/12 flex justify-center h-full md:justify-end">
        <video
          src="/assets/About.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-72 h-96 md:w-80 lg:w-96 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full md:w-7/12 text-center md:text-left relative">
        {/* Vertical Text */}
        <div className="absolute left-[40%] -top-6 md:-left-16 lg:top-0 md:top-6 rotate-0 md:rotate-[-90deg] text-sm tracking-widest">
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-[2px] bg-white "></div>
            <p className="uppercase">ABOUT Us</p>
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 pl-10">
          <span className="text-blue-300 md:text-4xl"> Welcome to</span> <br /> Budaniya Technologies
        </h2>

        {/* Description */}
        <h1 className="md:text-xl font-semibold">Where Innovation Meets Impact</h1>
        <p className="text-gray-100 mb-6 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
          We’re a passionate team of tech enthusiasts and creative minds, dedicated to transforming ideas into powerful digital solutions. At Budaniya Technologies, we don’t just build products — we bring visions to life.
        </p>
        <h1 className="md:text-xl font-semibold">Our Mission</h1>
        <p className="text-gray-100 mb-6 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
          To empower businesses by delivering tailored technology solutions that drive growth, enhance efficiency, and spark innovation.
        </p>
        <h1 className="md:text-xl font-semibold">Why Choose Us?</h1>
        <p className="text-gray-100 mb-6 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
          We believe that collaboration and innovation are the cornerstones of success. That’s why we take the time to deeply understand your goals, challenges, and aspirations — allowing us to craft solutions that are not only effective but also aligned with your unique needs.<br />
          Whether it’s custom software, web development, or digital transformation, we think outside the box to design results-driven strategies that give you a competitive edge.

        </p>
        <p className="text-gray-100 mb-6 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
          Let’s shape the future of your business — together.
        </p>

        <p className="text-gray-100 mb-6 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
        📩 Got a question? We’re here to help. Reach out to us anytime at <span className="font-bold text-blue-400 hover:text-yellow-400 cursor-pointer"> join@budaniyatechnologies.com</span>
        </p>

         <p className="text-gray-100 mb-6 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
          Address - c/o Ram Shawroop Budaniya, balaran, sikar, Rajasthan (332401)
        </p>

        {/* Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="#"
            className="bg-tertiary text-white font-semibold py-2 px-4 rounded-lg hover:bg-tertiary/80 text-center"
          >
            See Projects
          </a>
          <a
            href="#"
            className="border border-tertiary text-white font-semibold py-2 px-4 rounded-lg hover:bg-tertiary/10 text-center"
          >
            More Details
          </a>
        </div> */}
      </div>
    </section>
  );
}

export default About;



// import React from "react";
// import digi from "../../../public/assets/digitalSolutions.png";
// import Image from "next/image";

// function About() {
//   return (
//     <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24 xl:pt-32 xl:pb-28 bg-transparent">
//       <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           {/* Text Content */}
//           <div>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
//               Hey 👋
//               <br className="block sm:hidden" />,
//             </h2>
//             <p className="mt-4 text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
//               We are a team of tech enthusiasts and creative masterminds who
//               strive to bring our client's visions to life.
//               <br /><br />
//               Our mission is to help businesses achieve their goals through effective
//               Technology Solutions.
//               <br />
//               At Budaniya Technologies, we believe collaboration and innovation
//               are the keys to success. That's why we work closely with our clients
//               to understand their unique needs and tailor our services to deliver
//               measurable results.
//               <br /><br />
//               We take pride in our ability to think outside the box and come up
//               with innovative solutions that set our clients apart from the competition.
//             </p>

//             <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
//               <span className="relative inline-block">
//                 <span className="absolute bottom-0.5 left-0 w-full h-2 bg-yellow-300 dark:bg-gray-900 z-[-1]" />
//                 <span className="relative font-medium">Have a question?</span>
//               </span>
//               <br className="block sm:hidden" />
//               Ask us at{" "}
//               <a
//                 href="mailto:join@budaniyatechnologies.com"
//                 className="text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 underline transition duration-200"
//               >
//                 join@budaniyatechnologies.com
//               </a>
//             </p>
//           </div>

//           {/* Image Section */}
//           <div className="relative">
//             <Image
//               className="w-full max-w-md md:max-w-lg xl:max-w-xl mx-auto transform 2xl:origin-bottom 2xl:scale-110"
//               src={digi}
//               alt="Digital Solutions"
//               priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About;