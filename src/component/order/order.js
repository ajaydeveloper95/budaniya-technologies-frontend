import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/http"; // Assuming you have a utility function for GET requests

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders
    apiGet("/api/order/orders") // Update this with the correct endpoint to fetch orders
      .then((response) => {
        setOrders(response.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-6 rounded-lg shadow-md">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">Order ID: {order._id}</h3>8
              <span
                className={`text-sm font-medium ${
                  order.status === "pending"
                    ? "text-yellow-500"
                    : order.status === "delivered"
                    ? "text-green-600"
                    : order.status === "cancelled"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                Status: {order.status}
              </span>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Products:</h4>
              <div className="space-y-4">
                {order.products.map((product) => (
                  <div key={product.product._id} className="flex items-center">
                    <img
                      src={product.product.images[0]} // Displaying the first image
                      alt={product.product.productName}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div>
                      <p className="font-medium">
                        {product.product.productName}
                      </p>
                      <p>Price: ₹{product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Total: ₹{product.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Customer Information:</h4>
              <p>
                Name: {order.customer.firstName} {order.customer.lastName}
              </p>
              <p>Email: {order.customer.email}</p>
              <p>Mobile: {order.customer.mobile}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Shipping Address:</h4>
              <p>
                {order.shippingAddress.state}, {order.shippingAddress.country}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Payment Status:</h4>
              <p>{order.paymentStatus}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Total Amount:</h4>
              <p>₹{order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
