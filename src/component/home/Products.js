"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { apiGet, apiPost } from "../../utils/http";
import { toast } from "react-toastify";
import { useCart } from "../CartContext";
import { motion } from "framer-motion";

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
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    minDiscount: "",
    maxDiscount: "",
  });
  const [sortBy, setSortBy] = useState("no");
  const [order, setOrder] = useState("no");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiGet(
          `api/product/getproducts?referenceWebsite=${process.env.NEXT_PUBLIC_REFERENCE_WEBSITE}`
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
      const res = await apiPost("api/cart/add", { productId, quantity: 1 });
      toast.success("Item added to cart successfully!");
      console.log("Updated cart:", res.data.cart);
    } catch (err) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", err);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, order, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let result = [...products];
    if (filters.search) {
      result = result.filter(
        (p) =>
          p.productName.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.minPrice)
      result = result.filter((p) => p.actualPrice >= Number(filters.minPrice));
    if (filters.maxPrice)
      result = result.filter((p) => p.actualPrice <= Number(filters.maxPrice));
    if (filters.minDiscount)
      result = result.filter((p) => p.discount >= Number(filters.minDiscount));
    if (filters.maxDiscount)
      result = result.filter((p) => p.discount <= Number(filters.maxDiscount));
    if (sortBy !== "no") {
      result.sort((a, b) => {
        if (sortBy === "price")
          return order === "asc"
            ? a.actualPrice - b.actualPrice
            : b.actualPrice - a.actualPrice;
        if (sortBy === "discount")
          return order === "asc"
            ? a.discount - b.discount
            : b.discount - a.discount;
        if (sortBy === "name")
          return order === "asc"
            ? a.productName.localeCompare(b.productName)
            : b.productName.localeCompare(a.productName);
        return 0;
      });
    }
    setFilteredProducts(result);
  };

  const resetAllFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      minDiscount: "",
      maxDiscount: "",
    });
    setSortBy("no");
    setOrder("no");
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur-md mb-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
          {["search", "minPrice", "maxPrice", "minDiscount", "maxDiscount"].map(
            (name, idx) => (
              <input
                key={name}
                type={
                  name.includes("Price") || name.includes("Discount")
                    ? "number"
                    : "text"
                }
                name={name}
                placeholder={name
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                value={filters[name]}
                onChange={handleFilterChange}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/60 border border-white/20"
              />
            )
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 text-white border border-white/20"
          >
            <option value="no">Sort By</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
            <option value="name">Name</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 rounded-lg bg-white/10 text-white border border-white/20"
          >
            <option value="no">Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="mt-5 flex justify-center">
          <button
            onClick={resetAllFilters}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Reset All
          </button>
        </div>
      </motion.div>

      <Slider {...settings}>
        {filteredProducts.map((product) => (
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
