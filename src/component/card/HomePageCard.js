import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "Web Development",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgPNcydViHqiIUYRmi2P9drDH6sNcRqlD7AQ&sw=500",
    category: "Tech",
    description: "Create stunning and functional websites tailored to your business needs. Whether you need a personal blog or a complex business platform, we bring your vision to life with cutting-edge web technologies.",
    timeAgo: "6 mins ago",
    comments: 39
  },
  {
    id: 2,
    title: "App Development",
    image: "https://d3l9a8mvoa6cl8.cloudfront.net/wp-content/uploads/sites/3/2023/07/31095328/Banner-%E2%80%93-4-scaled.jpg",
    category: "Tech",
    description: "Transform your business with custom mobile applications designed for iOS and Android. We specialize in creating apps that offer seamless user experiences and powerful functionality.",
    timeAgo: "10 days ago",
    comments: 0
  },
  {
    id: 3,
    title: "Digital Marketing",
    image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/history_and_evolution_of_digital_marketing.jpg",
    category: "Non-Tech",
    description: "Boost your brand’s online presence with our expert digital marketing strategies. From SEO and social media marketing to paid advertising, we create campaigns that increase visibility, traffic, and sales.",
    timeAgo: "16 hours ago",
    comments: 9
  },
  {
    id: 4,
    title: "Digital Solutions",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Usx4yg-77OWShlKz4R106-WKrqqNCH8PRw&s",
    category: "Non-Tech",
    description: "Harness the power of technology to solve your business problems with our tailored digital solutions. From custom software to data analytics, we deliver innovative tools that streamline your operations and foster growth.",
    timeAgo: "16 hours ago",
    comments: 9
  }
];

function HomePageCard() {
  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-white flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase text-xl">
          <a href="#" className="font-semibold inline-block">Our Services</a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 ">
        {blogPosts.map((post) => (
          <div key={post.id} className="rounded overflow-hidden shadow-lg flex flex-col bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <a href="#"></a>
            <div className="relative">
              <a href="#">
                <img className="w-full" src={post.image} alt={post.title} />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
              </a>
              <a href="#!">
                <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out rounded-md font-semibold">
                  {post.category}
                </div>
              </a>
            </div>
            <div className="px-6 py-4 mb-auto">
              <a href="#" className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                {post.title}
              </a>
              <p className="text-gray-500 hover:text-white text-sm">
                {post.description}
              </p>
            </div>
            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-200">
              
              <button className="text-yellow-300 hover:text-blue-400 font-bold">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageCard;