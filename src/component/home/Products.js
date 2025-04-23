"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { apiGet, apiPost } from "../../utils/http"; 
import { toast } from "react-toastify";
import { useCart } from "../CartContext";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiGet(
          "api/product/getproducts?referenceWebsite=661ed848d4205b13dba74f4b"
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const res = await apiPost("api/cart/add", {
        productId,
        quantity: 1, 
      });

      toast.success("Item added to cart successfully!");
      console.log("Updated cart:", res.data.cart);
    } catch (err) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", err);
    }
  };

  

  return (
    <div className="min-h-screen p-2 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Our Products</h1>
        <p className="text-white text-lg">
          Weekly Bestsellers Handpicked for You
        </p>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product._id}`} className="block">
            <div className="size">
              <div className="bg-transparent border border-white/20 rounded-lg shadow-md overflow-hidden hover:shadow-white transition duration-300 p-4">
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

                <div className="p-4">
                  <p className="text-sm text-white">
                    {product.technologies?.join(", ")}
                  </p>
                  <p className="text-xs text-blue-300 font-semibold mb-2">
                    {product.description}
                  </p>
                  <h2 className="text-lg font-bold text-white mb-1">
                    {product.productName}
                  </h2>

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
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetails;
