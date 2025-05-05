"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { apiGet, apiPost } from "../../utils/http";
import { toast } from "react-toastify";
import { useCart } from "../CartContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const ProductDetails = () => {
  const router = useRouter();
  const { subcategory } = router.query;

  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiGet(
          `api/product/getproducts?referenceWebsite=${process.env.NEXT_PUBLIC_REFERENCE_WEBSITE}`
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);


  const handleAddToCart = async (productId) => {
    try {
      const res = await apiPost("api/cart/add", { productId, quantity: 1 });
      toast.success("Item added to cart successfully!");
      console.log("Updated cart:", res.data.cart);
    } catch (err) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", err);
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-12 py-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-white mb-2"
        >
          Our Products
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white text-lg"
        >
          Weekly Bestsellers Handpicked for You
        </motion.p>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href={`/products/${product._id}`} className="block p-2">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="w-full h-60 object-cover rounded-t-lg"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-blue-200 mb-2">
                    {product.description.length > 150
                      ? `${product.description.slice(0, 150)}...`
                      : product.description}
                  </p>

                  <p className="text-md text-white mb-1">
                    {product.technologies?.join(", ")}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-semibold text-green-300">
                      ₹{product.actualPrice}/-
                    </span>
                    {product.price > product.actualPrice && (
                      <>
                        <span className="line-through text-gray-400 text-sm">
                          ₹{product.price}/-
                        </span>
                        <span className="text-sm text-red-400">
                          Save ₹{product.price - product.actualPrice}/-
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product._id);
                        addToCart(product);
                      }}
                      className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300 text-lg"
                    >
                      🛒
                    </button>
                    <Link
                      href={`/products/${product._id}`}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetails;
