import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { apiGet, apiPost } from "../../utils/http";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

const API_ENDPOINT =
  `api/product/getproducts?referenceWebsite=${process.env.NEXT_PUBLIC_REFERENCE_WEBSITE}`;

const Product = () => {
  const { addToCart } = useCart();
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
  const [pagination, setPagination] = useState({
    totalDocuments: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const router = useRouter();
  const { categoryId } = router.query;

  const fetchProducts = async () => {
    try {
      const res = await apiGet(API_ENDPOINT, {
        page: pagination.currentPage,
      });
      const allProducts = res.data.products || [];
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.currentPage]);

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy, order, products, categoryId, pagination.currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let result = [...products];

    if (categoryId && categoryId !== "all") {
      result = result.filter(
        (product) => product.category && product.category._id === categoryId
      );
    }

    if (filters.search) {
      result = result.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter(
        (product) => product.actualPrice >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      result = result.filter(
        (product) => product.actualPrice <= Number(filters.maxPrice)
      );
    }

    if (filters.minDiscount) {
      result = result.filter(
        (product) => product.discount >= Number(filters.minDiscount)
      );
    }
    if (filters.maxDiscount) {
      result = result.filter(
        (product) => product.discount <= Number(filters.maxDiscount)
      );
    }

    if (sortBy !== "no") {
      result.sort((a, b) => {
        if (sortBy === "price") {
          return order === "asc"
            ? a.actualPrice - b.actualPrice
            : b.actualPrice - a.actualPrice;
        } else if (sortBy === "discount") {
          return order === "asc"
            ? a.discount - b.discount
            : b.discount - a.discount;
        } else if (sortBy === "name") {
          return order === "asc"
            ? a.productName.localeCompare(b.productName)
            : b.productName.localeCompare(a.productName);
        }
        return 0;
      });
    }

    const start = (pagination.currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;

    setFilteredProducts(result.slice(start, end));
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
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  const handleAddToCart = async (product) => {
    try {
      const res = await apiPost("api/cart/add", {
        productId: product._id,
        quantity: 1,
      });
      addToCart(product);
      toast.success("Item added to cart successfully!");
    } catch (err) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", err);
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <div className="min-h-screen p-4 mt-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">
          FRESH OFF THE RUNWAY
        </h1>
        <p className="text-white text-lg">
          Weekly Bestsellers Handpicked for You
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white/10 p-4 rounded-lg mb-8">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
          <input
            type="text"
            name="search"
            placeholder="Search products"
            value={filters.search}
            onChange={handleFilterChange}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20 col-span-2 md:col-span-1"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          />
          <input
            type="number"
            name="minDiscount"
            placeholder="Min %"
            value={filters.minDiscount}
            onChange={handleFilterChange}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          />
          <input
            type="number"
            name="maxDiscount"
            placeholder="Max %"
            value={filters.maxDiscount}
            onChange={handleFilterChange}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option value="no">Sort By</option>
            <option value="price">Price</option>
            <option value="discount">Discount</option>
            <option value="name">Name</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option value="no">Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-transparent border border-white/20 rounded-lg shadow-md hover:shadow-white transition duration-300"
          >
            <Link href={`/products/${product._id}`} className="block">
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

            <div className="p-2">
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

              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
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
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              pagination.currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white/20 text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product;
