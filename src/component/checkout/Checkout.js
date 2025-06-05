import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../utils/http";
import { useSearchParams } from "next/navigation";

function Checkout() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [cart, setCart] = useState(null);
  const [isDirectBuy, setIsDirectBuy] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const productQuery = searchParams.get("data");
    if (productQuery) {
      try {
        const parsed = JSON.parse(productQuery);
        setProductData(parsed);
        setIsDirectBuy(true);
      } catch (e) {
        console.error("Error parsing product data:", e);
      }
    } else {
      apiGet("/api/cart")
        .then((response) => {
          setCart(response.data.cart);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [searchParams]); // Added searchParams to dependency array

  const handlePaymentInit = async () => {
    const data = isDirectBuy ? productData : cart;

    if (!data?.total && !data?.totalAmount) {
      alert("Amount not available");
      return;
    }

    const payload = {
      trxId: data.trxId || "trx_" + Date.now(),
      price: data.total || data.totalAmount || 0,
      email: data.email || "default@example.com",
      name: data.name || "Unknown",
      service: data.service || "unknown",
      mobileNumber: data.mobileNumber || "0000000000",
    };

    try {
      setLoading(true);
      const res = await apiPost("/api/payment/payuInit", payload); // Fixed URL path
      const responseData = res?.data?.data;

      if (responseData?.status === 200) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Check if we have both UPI link and QR code
        if (responseData.upiLink && responseData.qr) {
          if (isMobile) {
            // Use UPI deep link for mobile apps
            window.location.href = responseData.upiLink;
          } else {
            // Show QR code in new tab for desktop
            window.open(responseData.qr, "_blank", "noopener,noreferrer");
          }
        } else {
          alert("Payment data incomplete");
        }
      } else {
        alert("Failed to initiate payment: " + (responseData?.status_msg || "Unknown error"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + (error.response?.data?.message || "Please try again"));
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = isDirectBuy 
    ? productData?.total 
    : cart?.totalAmount || cart?.total;

  return (
    <div className="flex justify-center mt-12 px-4 mb-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Checkout
        </h2>

        <div className="text-center text-xl mb-6">
          <span className="font-semibold text-gray-700">Total:</span>{" "}
          <span className="text-green-600 font-bold">
            ₹{totalAmount?.toFixed(2) || "0.00"}
          </span>
        </div>

        <button
          onClick={handlePaymentInit}
          disabled={loading || (!productData && !cart)}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold py-3 px-6 rounded-lg transition duration-300`}
        >
          {loading ? "Processing..." : "Pay Now via UPI"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;