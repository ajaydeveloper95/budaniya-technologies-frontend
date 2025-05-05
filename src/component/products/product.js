import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { apiGet, apiPost } from "../../utils/http";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

const API_ENDPOINT = `api/product/getproducts`;
const CATEGORIES_API = "api/categories/";

const Product = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    minDiscount: 0,
    maxDiscount: 100,
  });
  const [pagination, setPagination] = useState({
    totalDocuments: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const router = useRouter();

  const buildQueryParams = () => {
    const params = {
      referenceWebsite: process.env.NEXT_PUBLIC_REFERENCE_WEBSITE,
      page: pagination.currentPage,
      limit: pagination.pageSize,
    };

    if (selectedCategory) params.category = selectedCategory;
    if (selectedSubcategory) params.subcat = selectedSubcategory;
    if (filters.search) params.search = filters.search;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minDiscount !== 0) params.minDiscount = filters.minDiscount;
    if (filters.maxDiscount !== 100) params.maxDiscount = filters.maxDiscount;

    return params;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = buildQueryParams();
      const res = await apiGet(API_ENDPOINT, queryParams);

      const allProducts = res.data.products || [];
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch products", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiGet(CATEGORIES_API);
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pagination.currentPage, selectedCategory, selectedSubcategory, filters]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat._id === selectedCategory);
      if (category && category.subcat) {
        setSubcategories(category.subcat);
        // On mobile, show sidebar when category is selected
        if (window.innerWidth <= 768) {
          setShowMobileSidebar(true);
        }
      } else {
        setSubcategories([]);
      }
      setSelectedSubcategory("");
    }
  }, [selectedCategory, categories]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    // On mobile, hide sidebar after selecting subcategory
    if (window.innerWidth <= 768) {
      setShowMobileSidebar(false);
    }
  };

  const resetAllFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
      minDiscount: 0,
      maxDiscount: 100,
    });
    setSelectedCategory("");
    setSelectedSubcategory("");
    setShowMobileSidebar(false);
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

      {/* Mobile Category Toggle Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileSidebar(!showMobileSidebar)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {showMobileSidebar ? "Hide Categories" : "Show Categories"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar - Hidden on mobile unless showMobileSidebar is true */}
        <div
          className={`w-full md:w-64 bg-white/10 p-4 rounded-lg ${
            showMobileSidebar ? "block" : "hidden md:block"
          }`}
        >
          <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category._id}>
                <button
                  onClick={() => handleCategoryChange(category._id)}
                  className={`w-full text-left p-2 rounded ${
                    selectedCategory === category._id
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {category.name}
                </button>
                {selectedCategory === category._id && subcategories.length > 0 && (
                  <div className="ml-4 mt-2 space-y-1">
                    {subcategories.map((subcat) => (
                      <button
                        key={subcat._id}
                        onClick={() => handleSubcategoryChange(subcat._id)}
                        className={`w-full text-left p-2 rounded ${
                          selectedSubcategory === subcat._id
                            ? "bg-blue-400 text-white"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        {subcat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Filters Section */}
          <div className="bg-white/10 p-4 rounded-lg mb-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
              <input
                type="text"
                name="search"
                placeholder="Search products"
                value={filters.search}
                onChange={handleFilterChange}
                className="w-full p-2 rounded bg-white/10 text-white border border-white/20 col-span-2"
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
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Reset All
              </button>
              <div className="text-white">
                Showing {filteredProducts.length} of {pagination.totalDocuments} products
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}

          {/* Product Grid */}
          {!loading && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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
                      <h2 className="text-lg font-bold text-white mb-1">
                        {product.productName}
                      </h2>
                      <p className="text-sm text-blue-200 mb-2">
                        {product.description.length > 150
                          ? `${product.description.slice(0, 150)}...`
                          : product.description}
                      </p>
                      <p className="text-sm text-white">
                        {product.technologies?.join(", ")}
                      </p>

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
              {pagination.totalPages > 1 && (
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;