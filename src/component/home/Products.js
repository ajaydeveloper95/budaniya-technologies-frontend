import React from "react";
import Slider from "react-slick";
import { useCart } from "../CartContext";

// Slick Slider Settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Show 4 cards at a time
  slidesToScroll: 1,
  autoplay: true, // Enable auto scroll
  autoplaySpeed: 3000, // Scroll every 3 seconds
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3, // 3 cards on medium screens
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const products = [
  {
    id: 1,
    title: "Metronic | Tailwind, Bootstrap, React, Vue",
    company: "by keenthemes in Admin Templates",
    price: 49,
    originalPrice: 89,
    stars: 5,
    reviews: "8K",
    sales: "117K Sales",
    badge: "64 Demos & Counting",
    trust: "116,000+ TRUST METRONIC",
    since: "#1 DASHBOARD SINCE 2013",
    image:
      "https://images.ctfassets.net/pt9zoi1ijm0e/71fRKTQwYM9IO5zIWhGPJn/1b97624418290864eae3925663ba8039/top_ecommerce_dashboards-min.png",
    previewLink: "#",
  },
  {
    id: 2,
    title: "Vuexy - Vuejs, Nuxt, Next.js, HTML, Laravel",
    company: "by PIXINVENT in Admin Templates",
    price: 39,
    originalPrice: 59,
    stars: 5,
    reviews: "906",
    sales: "28.2K Sales",
    badge: "MEGA UPDATE",
    trust: "Best Selling, Production Ready",
    since: "Carefully Crafted, Extensive",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvBPVM_JOex4UdOBl5crxmCvJr3ba93h8pg&s",
    previewLink: "#",
  },
  {
    id: 3,
    title: "Vuexy - Vuejs, Nuxt, Next.js, HTML, Laravel",
    company: "by PIXINVENT in Admin Templates",
    price: 39,
    originalPrice: 59,
    stars: 5,
    reviews: "906",
    sales: "28.2K Sales",
    badge: "MEGA UPDATE",
    trust: "Best Selling, Production Ready",
    since: "Carefully Crafted, Extensive",
    image: "https://static.dashthis.com/media/4493/slider_theme_2.png",
    previewLink: "#",
  },
  {
    id: 4,
    title: "Vuexy - Vuejs, Nuxt, Next.js, HTML, Laravel",
    company: "by PIXINVENT in Admin Templates",
    price: 39,
    originalPrice: 59,
    stars: 5,
    reviews: "906",
    sales: "28.2K Sales",
    badge: "MEGA UPDATE",
    trust: "Best Selling, Production Ready",
    since: "Carefully Crafted, Extensive",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUvBPVM_JOex4UdOBl5crxmCvJr3ba93h8pg&s",
    previewLink: "#",
  },
  {
    id: 5,
    title: "Vuexy - Vuejs, Nuxt, Next.js, HTML, Laravel",
    company: "by PIXINVENT in Admin Templates",
    price: 39,
    originalPrice: 59,
    stars: 5,
    reviews: "906",
    sales: "28.2K Sales",
    badge: "MEGA UPDATE",
    trust: "Best Selling, Production Ready",
    since: "Carefully Crafted, Extensive",
    image:
      "https://freebies.fluxes.com/wp-content/uploads/2017/08/Free-eCommerce-Dashboard.png",
    previewLink: "#",
  },
  {
    id: 6,
    title: "Vuexy - Vuejs, Nuxt, Next.js, HTML, Laravel",
    company: "by PIXINVENT in Admin Templates",
    price: 39,
    originalPrice: 59,
    stars: 5,
    reviews: "906",
    sales: "28.2K Sales",
    badge: "MEGA UPDATE",
    trust: "Best Selling, Production Ready",
    since: "Carefully Crafted, Extensive",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9V92LGIR8PXXTjUrLB4Bcbisa7p7VuFpWLA&s",
    previewLink: "#",
  },
];

const ProductDetails = () => {
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen p-6 mt-10">
      {/* Main Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white-800 mb-2">Our Products</h1>
        <p className="text-white-600 text-lg">
          Weekly Bestsellers Handpicked for You
        </p>
      </div>

      {/* Product Cards Slider */}
      <Slider {...settings}>
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-transparent border border-white/20 rounded-lg shadow-md overflow-hidden hover:shadow-white transition duration-300 mx-2 p-4 mt-10"
            style={{
              marginRight: "1rem",
              gap: "1rem",
            }}
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-32 object-cover rounded"
              />
              <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-0.5 rounded">
                {product.badge}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <p className="text-sm text-white">{product.trust}</p>
              <p className="text-xs text-blue-300 font-semibold mb-2">
                {product.since}
              </p>

              <h2 className="text-lg font-bold text-white">{product.title}</h2>
              <p className="text-xs text-gray-300 mb-2">{product.company}</p>

              {/* Price Display */}
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xl font-bold text-green-300">
                  {product.price}/-
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="line-through text-gray-400 text-sm">
                      {product.originalPrice}/-
                    </span>
                    <span className="text-sm text-red-400 font-medium">
                      Save {product.originalPrice - product.price}/-
                    </span>
                  </>
                )}
              </div>

              {/* Stars and Reviews */}
              <div className="text-yellow-400 text-sm mb-1">
                {"★".repeat(product.stars)}
                <span className="text-white ml-1">({product.reviews})</span>
              </div>

              {/* Sales */}
              <p className="text-sm text-white mb-4">{product.sales}</p>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={addToCart}
                  className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 text-lg"
                >
                  🛒
                </button>

                <a
                  href={product.previewLink}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Live Preview
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetails;
