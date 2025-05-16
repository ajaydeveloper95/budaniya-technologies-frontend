import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiGet, apiPost } from "../../src/utils/http";
import { useCart } from "../../src/component/CartContext";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [activeTab, setActiveTab] = useState("support");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await apiGet(`api/product/getproduct/${id}`);
          const fetchedProduct = res.data.product;
          setProduct(fetchedProduct);
          if (fetchedProduct.images && fetchedProduct.images.length > 0) {
            setMainImage(fetchedProduct.images[0]);
          }
        } catch (err) {
          console.error("Failed to fetch product", err);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {
      const res = await apiPost("api/cart/add", {
        productId,
        quantity: 1,
      });
      toast.success("Item added to cart successfully!");
      addToCart(res.data.cart);
    } catch (err) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", err);
    }
  };

  if (!product) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="p-4 md:p-10 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8">
        {/* Left: Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={mainImage || "/placeholder.jpg"}
            alt={product.productName}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="mt-4 mb-8 flex flex-wrap gap-4">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.jpg"}
                alt={`Product Image ${index + 1}`}
                className={`w-16 h-16 object-cover cursor-pointer border-2 rounded ${
                  mainImage === image
                    ? "border-yellow-400"
                    : "border-gray-400"
                }`}
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div className="flex gap-4 mb-4 border-b border-gray-600 overflow-x-auto">
              {["support", "specification", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 font-medium capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div
              className="text-sm text-gray-300"
              dangerouslySetInnerHTML={{
                __html: product[activeTab] || "<p>No content available.</p>",
              }}
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {product.productName}
          </h1>
          <p className="mb-2 text-blue-300">{product.description}</p>

          {/* Technologies */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Technologies:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <p className="text-green-400 text-xl md:text-2xl font-semibold">
              ₹ {product.actualPrice}/-
              {product.price !== product.actualPrice && (
                <span className="line-through text-red-400 text-lg ml-2">
                  ₹ {product.price}/-
                </span>
              )}
            </p>
            {product.discount > 0 && (
              <p className="text-yellow-400 mt-1">
                Discount: {product.discount}%
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mt-6 mb-6">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product._id);
              }}
              className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 w-full md:w-auto"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
