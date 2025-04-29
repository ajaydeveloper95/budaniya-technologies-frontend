import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Testimonials() {
  const testimonials = [
    {
      name: "Jane D",
      role: "CEO",
      rating: 4.9,
      content: "Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.",
      avatar: "https://pagedone.io/asset/uploads/1696229969.png"
    },
    {
      name: "Michael S",
      role: "Marketing Director",
      rating: 5.0,
      content: "The platform's intuitive interface has transformed how our team collaborates on projects and tracks progress in real-time.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah L",
      role: "Product Manager",
      rating: 4.8,
      content: "Exceptional customer support and continuous improvements make this service stand out from competitors in the market.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David K",
      role: "CTO",
      rating: 4.7,
      content: "The analytics dashboard provides exactly the insights we need to make data-driven decisions for our business growth.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      partialVisibilityGutter: 20
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 ${i <= rating ? "text-amber-400" : "text-gray-600"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-indigo-300 uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
            What our clients say
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all 0.7s ease-out"
            transitionDuration={700}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="px-4 py-2"
            partialVisible={true}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="h-full p-2">
                <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-indigo-400/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <span className="ml-2 text-sm font-medium text-indigo-200">
                      {testimonial.rating.toFixed(1)}
                    </span>
                  </div>
                  <blockquote className="text-lg text-white/80 mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <img
                      className="h-12 w-12 rounded-full object-cover border-2 border-indigo-400/30"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <div className="text-base font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-indigo-200">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;





// import React, { useState } from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css"; // Make sure to import the required styles

// function Testimonials() {
//   const [device, setDevice] = useState("desktop");

//   const Obj = [
//     {
//       title: "hello",
//       data: "good",
//     },
//     {
//       title: "hello",
//       data: "good",
//     },
//     {
//       title: "hello",
//       data: "good",
//     },
//     {
//       title: "hello",
//       data: "good",
//     },
//   ];

//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 3000 },
//       items: 1,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 1,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 1,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <section className="py-24 relative -z-50">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mb-16">
//           <span className="text-sm text-gray-500 font-medium text-center block mb-2">
//             TESTIMONIAL
//           </span>
//           <h2 className="text-4xl text-center font-bold text-white">
//             What our happy user says!
//           </h2>
//         </div>
//         {/* Slider wrapper */}
//         <div>
//           <Carousel
//             swipeable={true}
//             draggable={false}
//             showDots={false}
//             responsive={responsive}
//             infinite={true}
//             autoPlay={true}
//             autoPlaySpeed={3000} // Adjusted autoPlay speed
//             keyBoardControl={true}
//             customTransition="all .5"
//             transitionDuration={500}
//             containerClass="carousel-container"
//             removeArrowOnDeviceType={["tablet", "mobile"]}
//             deviceType={device}
//             dotListClass="custom-dot-list-style"
//             itemClass="carousel-item-padding-40-px mx-1"
//           >
//             {Obj.map((item, index) => (
//               <div key={index}>
//                 <div className="bg-white border border-solid border-gray-300 rounded-xl p-6 w-full mx-auto hover:border-indigo-600 hover:shadow-sm">
//                   <div>
//                     <div className="flex items-center mb-7 gap-2 text-amber-500">
//                       <svg
//                         className="w-5 h-5"
//                         viewBox="0 0 18 17"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
//                           fill="currentColor"
//                         />
//                       </svg>
//                       <span className="text-base font-semibold text-indigo-600">
//                         4.9
//                       </span>
//                     </div>
//                     <p className="text-base text-gray-600 leading-6 pb-8 group-hover:text-gray-800">
//                       Pagedone has made it possible for me to stay on top of my portfolio and make informed decisions quickly and easily.
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-5 border-t border-solid border-gray-200 pt-5">
//                     <img
//                       className="h-10 w-10"
//                       src="https://pagedone.io/asset/uploads/1696229969.png"
//                       alt="avatar"
//                     />
//                     <div className="block">
//                       <h5 className="text-gray-900 font-medium mb-1">
//                         Jane D
//                       </h5>
//                       <span className="text-sm leading-4 text-gray-500">
//                         CEO
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Testimonials;
