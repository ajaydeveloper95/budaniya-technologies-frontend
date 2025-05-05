import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext";
import { apiGet, apiPost } from "../../utils/http";
import { toast } from "react-toastify";
import Link from "next/link";

const API_ENDPOINT = `api/product/getproducts?referenceWebsite=${process.env.NEXT_PUBLIC_REFERENCE_WEBSITE}`;
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
    minDiscount: "",
    maxDiscount: "",
  });
  const [pagination, setPagination] = useState({
    totalDocuments: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiGet(API_ENDPOINT, {
        page: pagination.currentPage,
        category: selectedCategory,
        subcat: selectedSubcategory,
      });
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
    // fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pagination.currentPage]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat._id === selectedCategory);
      if (category && category.subcat) {
        setSubcategories(category.subcat);
      } else {
        setSubcategories([]);
      }
      setSelectedSubcategory("");
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    fetchProducts();
  }, [filters, selectedCategory, selectedSubcategory, pagination.currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
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
    setSelectedCategory("");
    setSelectedSubcategory("");
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

      {/* Filters Section */}
      <div className="bg-white/10 p-4 rounded-lg mb-8">
        {/* <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
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
           <div className="m-4 flex justify-evenly">
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset All
          </button>
        </div>
        </div> */}

        <div className="grid grid-cols-2 gap-4 mt-4">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option value="" className="text-black">All Categories</option>
            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
                className="text-black"
              >
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
            disabled={!selectedCategory}
            className="w-full p-2 rounded bg-white/10 text-white border border-white/20"
          >
            <option value="">All Subcategories</option>
            {subcategories.map((subcat) => (
              <option
                key={subcat._id}
                value={subcat._id}
                className="text-black"
              >
                {subcat.name}
              </option>
            ))}
          </select>
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
  );
};

export default Product;
