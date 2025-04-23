import Image from "next/image";
import React from "react";
import Service01 from "../../../public/assets/webDevelopment.png";
import Service02 from "../../../public/assets/appDevelopment.png";
import Service03 from "../../../public/assets/digitalMarketing.png";
import Service04 from "../../../public/assets/digitalSolutions.png";

const services = [
  {
    image: Service01,
    alt: "web development",
    title: "Web Development",
    description: "Create stunning and functional websites tailored to your business needs. Whether you need a personal blog or a complex business platform, we bring your vision to life with cutting-edge web technologies.",
  },
  {
    image: Service02,
    alt: "app development",
    title: "App Development",
    description: "Transform your business with custom mobile applications designed for iOS and Android. We specialize in creating apps that offer seamless user experiences and powerful functionality.",
  },
  {
    image: Service03,
    alt: "digital marketing",
    title: "Digital Marketing",
    description: "Boost your brand’s online presence with our expert digital marketing strategies. From SEO and social media marketing to paid advertising, we create campaigns that increase visibility, traffic, and sales.",
  },
  {
    image: Service04,
    alt: "digital solutions",
    title: "Digital Solutions",
    description: "Harness the power of technology to solve your business problems with our tailored digital solutions. From custom software to data analytics, we deliver innovative tools that streamline your operations and foster growth.",
  },
];

function HomePageCard() {
  return (
    <div className="flex justify-evenly flex-wrap mx-4">
      {services.map((service, index) => (
        <div key={index} className="card border rounded-2xl w-96 bg-base-100 my-4 shadow-xl">
          <figure className="px-10 pt-10">
            <Image
              src={service.image}
              alt={service.alt}
              width={100}
              className="rounded-xl m-auto"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title my-4">{service.title}</h2>
            <p>{service.description}</p>
            <div className="card-actions">
              <button className="bg-emerald-500 text-white hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-b-2xl text-center font-medium">
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePageCard;
