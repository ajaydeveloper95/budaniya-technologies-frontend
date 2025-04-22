import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import axios from "axios";
import { useCart } from "../CartContext";
import { apiGet } from "../../utils/http";

const API_ENDPOINT = 'api/product/getproducts?referenceWebsite=661ed848d4205b13dba74f4b'

// Slick slider settings
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3, slidesToScroll: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
};

const ProductDetails = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiGet(API_ENDPOINT);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-2 mt-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white-800 mb-2">Our Products</h1>
        <p className="text-white-600 text-lg">
          Weekly Bestsellers Handpicked for You
        </p>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id}>
            <div className="size">
            <div className="bg-transparent border border-white/20 rounded-lg shadow-md overflow-hidden hover:shadow-white transition duration-300 p-4">
             
               {/* Image */}
               <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.productName}
                  className="w-full h-60 object-cover rounded"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-400 text-white text-xs font-bold px-2 py-0.5 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm text-white">{product.technologies.join(", ")}</p>
                <p className="text-xs text-blue-300 font-semibold mb-2">
                  {product.description}
                </p>

                <h2 className="text-lg font-bold text-white mb-1">
                  {product.productName}
                </h2>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xl font-bold text-green-300">
                    ₹ {product.actualPrice}/-
                  </span>
                  {product.price > product.actualPrice && (
                    <>
                      <span className="line-through text-gray-400 text-sm">
                        ₹ {product.price}/-
                      </span>
                      <span className="text-sm text-red-400 font-medium">
                        Save ₹ {product.price - product.actualPrice}/-
                      </span>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 text-lg"
                  >
                    🛒
                  </button>

                  <a
                    href="#"
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    Buy Now
                  </a>
                </div>
              </div>
             </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetails;
