import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/http";
import Link from "next/link";

const CartDetails = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/api/cart")
      .then((response) => {
        setCart(response.data.cart);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, quantity, actualPrice) => {
    if (quantity < 1) return;

    const totalPrice = quantity * actualPrice;

    console.log({
      productId,
      quantity,
      total: totalPrice,
      actualPrice,
    });

    apiPost("api/cart/update", {
      productId,
      quantity,
      total: totalPrice,
      actualPrice,
    })
      .then(() => {
        apiGet("/api/cart").then((response) => setCart(response.data.cart));
      })
      .catch((error) => console.error("Update quantity error:", error));
  };

  const handleRemove = (productId) => {
    apiPost("api/cart/remove", { productId })
      .then(() => {
        apiGet("/api/cart").then((response) => setCart(response.data.cart));
      })
      .catch((error) => console.error("Remove error:", error));
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!cart || cart.items.length === 0)
    return <div className="p-4 text-center">No items in cart.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8 flex flex-col lg:flex-row justify-between gap-6">
      <div className="w-full lg:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-black font-semibold">
              <tr>
                <th className="p-3">Product Image</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Total</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.productName}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{item.product.productName}</td>
                  <td className="p-3">₹{item.product.price.toFixed(2)}</td>
                  <td className="p-3 flex items-center justify-between">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity - 1,
                          item.product.actualPrice
                        )
                      }
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <span className="mx-2">{item.quantity}</span>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product._id,
                          item.quantity + 1,
                          item.product.actualPrice
                        )
                      }
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-3 font-semibold">
                    ₹{item.total.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full lg:w-1/4 border rounded-lg bg-gray-50 text-black p-4 h-fit mt-12">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Total: ₹{cart.totalAmount.toFixed(2)}
        </h3>
        <Link href="/checkout">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-center">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDetails;
