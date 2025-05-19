import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/http";
import { useRouter, useSearchParams } from "next/navigation";

function Checkout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [cart, setCart] = useState(null);
  const [isDirectBuy, setIsDirectBuy] = useState(false);

  const [fullName, setFullName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const productQuery = searchParams.get("data");
    if (productQuery) {
      const parsed = JSON.parse(productQuery);
      setProductData(parsed);
      setIsDirectBuy(true);
    } else {
      apiGet("/api/cart")
        .then((response) => {
          setCart(response.data.cart);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  const handleSubmit = () => {
    const products = isDirectBuy
      ? [
          {
            product: productData._id,
            quantity: productData.quantity,
            total: productData.total,
            price: productData.price,
          },
        ]
      : cart?.items?.map((item) => ({
          product: item.product?._id,
          quantity: item.quantity,
          total: item.total,
          price: item.price,
        })) || [];

    const shippingDetails = {
      country,
      state,
      line1: shippingAddress,
      city,
      postalCode,
    };

    const payload = {
      products,
      shippingAddress: shippingDetails,
      totalAmount: isDirectBuy ? productData.total : cart?.totalAmount,
      status: "pending",
      paymentStatus: "pending",
      type: isDirectBuy ? "buyNow" : "cart",
    };

    apiPost("api/order/order", payload)
      .then(() => {
        router.push("/thankyou");
      })
      .catch((error) => {
        console.error("Order submission failed:", error);
        alert("Order failed. Try again.");
      });
  };

  const totalAmount = isDirectBuy ? productData?.total : cart?.totalAmount;

  return (
    <div className="flex justify-center mt-12 px-4 mb-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Checkout
        </h2>

        <div className="text-center text-xl mb-6">
          <span className="font-semibold text-gray-700">Total:</span>{" "}
          <span className="text-green-600 font-bold">
            ₹{totalAmount?.toFixed(2)}
          </span>
        </div>

        {/* Billing Details Form */}
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl text-lg font-semibold"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
