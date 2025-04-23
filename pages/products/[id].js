import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiGet, apiPost } from "../../src/utils/http"; // ✅ Ensure apiPost is imported
import { useCart } from "../../src/component/CartContext";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await apiGet(`api/product/getproduct/${id}`);
          setProduct(res.data.product);
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
      
      // Optionally update frontend cart state:
      addToCart(res.data.cart); // If your context expects the entire updated cart
      
      console.log("Updated cart:", res.data.cart);
    } catch (err) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", err);
    }
  };

  if (!product) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="p-10 text-white">
      <div className="flex items-center justify-between">
        {/* Left: Product Image */}
        <div className="w-1/2 pr-8">
          <img
            src={product.images[0]}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Right: Product Info */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="mb-2 text-blue-300">{product.description}</p>
          <p className="text-green-400 text-2xl font-semibold mb-4">
            ₹ {product.actualPrice}/-
          </p>

          {/* Add to Cart */}
          <div className="mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product._id); // Backend cart update
              }}
              className="bg-yellow-400 text-black px-6 py-2 rounded font-bold hover:bg-yellow-500 mr-4"
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
