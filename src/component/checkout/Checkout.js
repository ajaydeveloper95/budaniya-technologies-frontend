import React, { useEffect, useState } from "react";
import { apiGet } from "../../utils/http";

function Checkout() {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [cart, setCart] = useState(null);

  
    useEffect(() => {
      apiGet('/api/cart')
        .then(response => {
          setCart(response.data.cart);
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }, []);

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="w-full lg:w-1/3 border rounded-lg bg-gray-50 text-black p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Order Summary
        </h2>
        <div className="text-center text-lg mb-6">
          <span className="font-medium">Total:</span> ₹{cart?.totalAmount?.toFixed(2)}
        </div>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg font-medium"
          onClick={() => setShowCheckoutForm(true)}
        >
          Proceed to Checkout
        </button>

        {/* Checkout Form */}
        {showCheckoutForm && (
          <div className="mt-8 border-t pt-6 space-y-4 animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-700 text-center">Checkout Form</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Shipping Address"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded"
            />

            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded">
                Submit Order
              </button>
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
