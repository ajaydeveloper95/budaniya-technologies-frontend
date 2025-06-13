import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiGet, apiPost } from "../../utils/http";
import QRCode from "qrcode";

function Checkout() {
  const searchParams = useSearchParams();
  const [productData, setProductData] = useState(null);
  const [cart, setCart] = useState(null);
  const [isDirectBuy, setIsDirectBuy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

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
          const products = response.data.cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            total: item.total,
            price: item.price,
          }));
          setProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [searchParams]);

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.mobileNumber) {
      alert("Please fill in all user details");
      return;
    }

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      alert("Please fill in all shipping address fields");
      return;
    }

    const orderPayload = {
      products: isDirectBuy ? productData.products : products,
      shippingAddress,
      userInfo,
      type: isDirectBuy ? "direct" : "cart",
    };

    try {
      setLoading(true);
      const res = await apiPost("/api/order/order", orderPayload);

      if (res.data.message === "Order created successfully") {
        const orderId = res.data.orderId || res.data.data?._id;
        await handlePaymentInit(orderId);
      } else {
        alert("Order creation failed.");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Failed to create order.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentInit = async (orderId) => {
    const data = isDirectBuy ? productData : cart;
    const amount = data?.total || data?.totalAmount;

    if (!amount) {
      alert("Amount not available");
      return;
    }

    const payload = {
      trxId: data.trxId || "trx_" + Date.now(),
      price: amount,
      orderId,
      email: userInfo.email,
      name: userInfo.name,
      mobileNumber: userInfo.mobileNumber,
      service: data.service || "Product Purchase",
    };

    try {
      setLoading(true);
      const res = await apiPost("/api/payment/payuInit", payload);
      const responseData = res?.data?.data;

      if (responseData?.status === 200 && responseData.qr) {
        const isMobile =
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
          window.innerWidth < 768;

        if (isMobile) {
          window.location.href = responseData.qr;
        } else {
          const qrImage = await QRCode.toDataURL(responseData.qr);
          const html = `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <title>Scan QR to Pay</title>
                <style>
                  body {
                    font-family: sans-serif;
                    background: #f9fafb;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                  }
                  h2 {
                    margin-bottom: 20px;
                    color: #333;
                  }
                  img {
                    width: 256px;
                    height: 256px;
                    border: 1px solid #ccc;
                  }
                </style>
              </head>
              <body>
                <h2>Scan to Pay</h2>
                <img src="${qrImage}" alt="QR Code" />
              </body>
            </html>
          `;

          const newTab = window.open();
          if (newTab) {
            newTab.document.write(html);
            newTab.document.close();
          }
        }

        // Optional: Redirect to success page after payment
        // setTimeout(() => window.location.href = "/order-success", 10000);
      } else {
        alert("Payment failed: " + (responseData?.status_msg || "Unknown error"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(
        "Payment failed: " +
          (error.response?.data?.message || "Please try again")
      );
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = isDirectBuy
    ? productData?.total
    : cart?.totalAmount || cart?.total;

  const productList = productData?.products || cart?.products || [];

  return (
    <div className="flex justify-center mt-12 px-4 mb-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Checkout
        </h2>

        {/* Product IDs */}
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Product ID(s):</h4>
          {productList.map((item, index) => (
            <p key={index} className="text-sm text-gray-700">
              {item.product}
            </p>
          ))}
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Details</h3>
          <div className="grid grid-cols-1 gap-3">
            <input
              name="name"
              placeholder="Full Name"
              value={userInfo.name}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              className="border rounded px-4 py-2"
            />
            <input
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              className="border rounded px-4 py-2"
            />
            <input
              name="mobileNumber"
              placeholder="Mobile Number"
              value={userInfo.mobileNumber}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              className="border rounded px-4 py-2"
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="grid grid-cols-1 gap-3">
            {["line1", "city", "state", "postalCode", "country"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={shippingAddress[field]}
                onChange={(e) => handleInputChange(e, setShippingAddress)}
                className="border rounded px-4 py-2"
              />
            ))}
          </div>
        </div>

        {/* Total Amount */}
        <div className="text-center text-xl mb-6">
          <span className="font-semibold text-gray-700">Total:</span>{" "}
          <span className="text-green-600 font-bold">
            ₹{totalAmount?.toFixed(2) || "0.00"}
          </span>
        </div>

        {/* Pay Button */}
        <button
          onClick={handleSubmitOrder}
          disabled={loading || (!productData && !cart)}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white font-semibold py-3 px-6 rounded-lg transition duration-300`}
        >
          {loading ? "Processing..." : "Submit & Pay Now via UPI"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
