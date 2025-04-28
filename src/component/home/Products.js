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

    useEffect(() => {
      applyFilters();
    }, [filters, sortBy, order, products]);

    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const applyFilters = () => {
      let result = [...products];
      
      // Apply search filter
      if (filters.search) {
        result = result.filter(product => 
          product.productName.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Apply price filters
      if (filters.minPrice) {
        result = result.filter(product => product.actualPrice >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        result = result.filter(product => product.actualPrice <= Number(filters.maxPrice));
      }
      
      // Apply discount filters
      if (filters.minDiscount) {
        result = result.filter(product => product.discount >= Number(filters.minDiscount));
      }
      if (filters.maxDiscount) {
        result = result.filter(product => product.discount <= Number(filters.maxDiscount));
      }
      
      // Apply sorting
      if (sortBy !== "no") {
        result.sort((a, b) => {
          if (sortBy === "price") {
            return order === "asc" ? a.actualPrice - b.actualPrice : b.actualPrice - a.actualPrice;
          } else if (sortBy === "discount") {
            return order === "asc" ? a.discount - b.discount : b.discount - a.discount;
          } else if (sortBy === "name") {
            return order === "asc" 
              ? a.productName.localeCompare(b.productName) 
              : b.productName.localeCompare(a.productName);
          }
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
    <div className="min-h-screen p-12 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Our Products</h1>
        <p className="text-white text-lg">
          Weekly Bestsellers Handpicked for You
        </p>
      </div>

            {/* Filters */}
            <div className="bg-white/10 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
          <div className="col-span-2 md:col-span-1">
            <input
              type="text"
              name="search"
              placeholder="Search products"
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            />
          </div>
          
          <div>
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            />
          </div>
          
          <div>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            />
          </div>
          
          <div>
            <input
              type="number"
              name="minDiscount"
              placeholder="Min %"
              value={filters.minDiscount}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            />
          </div>
          
          <div>
            <input
              type="number"
              name="maxDiscount"
              placeholder="Max %"
              value={filters.maxDiscount}
              onChange={handleFilterChange}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            />
          </div>
          
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            >
              <option value="no" style={{color: 'black'}}>Sort By</option>
              <option value="price" style={{color: 'black'}}>Price</option>
              <option value="discount" style={{color: 'black'}}>Discount</option>
              <option value="name" style={{color: 'black'}}>Name</option>
            </select>
          </div>
          
          <div>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
            >
              <option value="no" style={{color: 'black'}}>Order</option>
              <option value="asc" style={{color: 'black'}}>Ascending</option>
              <option value="desc" style={{color: 'black'}}>Descending</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset All
          </button>
        </div>
      </div>

      <Slider {...settings}>
        {filteredProducts.map((product) => (
                <Link href={`/products/${product._id}`}>

          <div key={product._id}>
            <Link href={`/products/${product._id}`} className="block">
              <div className="size">
                <div className="bg-transparent border border-white/20 rounded-lg shadow-md overflow-hidden hover:shadow-white transition duration-300">
                  <Link href={`/products/${product._id}`}>
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
                  </Link>

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
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default ProductDetails;
