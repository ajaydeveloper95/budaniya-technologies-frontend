import React, { useEffect, useState } from "react";
import { navigation } from "react-router-dom";
import { apiGet, apiPost } from "../../utils/http";
import { useRouter } from "next/navigation";

function Checkout() {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [cart, setCart] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    apiGet("/api/cart")
      .then((response) => {
        setCart(response.data.cart);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleSubmit = () => {
    const products = cart?.items?.map(item => ({
      product: item.product?._id,
      quantity: item.quantity,
      total: item.total,
      price: item.price
    })) || [];

    const shippingDetails = {
      country,
      state,
      line1: shippingAddress,
      city,
      postalCode
    };

    const payload = {
      products,
      shippingAddress: shippingDetails,
      totalAmount: cart?.totalAmount,
      status: "pending",
      paymentStatus: "pending",
      type: "cart"
    };

    apiPost("api/order/order", payload)
      .then(() => {
        setShowPopup(true);
        setTimeout(() => setRedirect(true), 2000);
        router.push("/thankyou");
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        alert("Order submission failed. Please try again.");
      });
  };

  const handleConfirmation = () => {
    setShowConfirmation(false);
    handleSubmit();
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (redirect) {
    return <navigation to="" />;
  }

  return (
    <div className="flex justify-center mt-12 px-4 mb-8">
      <div className="w-full max-w-xl bg-white border rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Checkout</h2>

        <div className="text-center text-xl mb-6">
          <span className="font-semibold text-gray-700">Total:</span>{" "}
          <span className="text-green-600 font-bold">₹{cart?.totalAmount?.toFixed(2)}</span>
        </div>

        <button
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
          onClick={() => setShowCheckoutForm(true)}
        >
          Proceed to Checkout
        </button>

        {showCheckoutForm && (
          <div className="mt-8 border-t pt-6 space-y-4 animate-fade-in">
            <h3 className="text-2xl font-semibold text-center text-gray-800">Shipping Details</h3>
            <div className="space-y-3">
              <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-field" />
              <input type="text" placeholder="Shipping Address" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} className="input-field" />
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="input-field" />
              <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} className="input-field" />
              <input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="input-field" />
              <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="input-field" />
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
              <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input-field" />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowConfirmation(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
              >
                Submit Order
              </button>
              <button
                onClick={() => setShowCheckoutForm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl text-center shadow-md">
            ✅ Your order has been submitted successfully!
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Confirm Your Order
            </h3>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to place this order?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmation}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl font-semibold transition"
              >
                Yes, Submit
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-xl font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tailwind component for input style reuse */}
      <style jsx>{`
        .input-field {
          @apply w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
        }
      `}</style>
    </div>
  );
}

export default Checkout;


// import React, { useEffect, useState } from "react";
// import { navigation } from "react-router-dom";
// import { apiGet, apiPost } from "../../utils/http"; // Import apiPost for submitting data
// import { useRouter } from "next/navigation";


// function Checkout() {
//   const [showCheckoutForm, setShowCheckoutForm] = useState(false);
//   const [cart, setCart] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [redirect, setRedirect] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
// const router = useRouter()
//   // Form fields state
//   const [fullName, setFullName] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [country, setCountry] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   useEffect(() => {
//     // Fetch cart data
//     apiGet("/api/cart")
//       .then((response) => {
//         setCart(response.data.cart);
//       })
//       .catch((error) => {
//         console.error("Error fetching cart data:", error);
//       });
//   }, []);

//   const handleSubmit = () => {
//     const products = cart?.items?.map(item => ({
//       product: item.product?._id,
//       quantity: item.quantity,
//       total: item.total,
//       price: item.price
//     })) || [];

//     const shippingDetails = {
//       country: country,
//       state: state,
//       line1: shippingAddress,
//       city: city,
//       postalCode: postalCode
//     };

//     const payload = {
//       products: products,
//       shippingAddress: shippingDetails,
//       totalAmount: cart?.totalAmount,
//       status: "pending", 
//       paymentStatus: "pending", // Assuming the payment is also pending
//       type: "cart" // Assuming this is the type for this order
//     };

//     apiPost("api/order/order", payload)
//       .then(() => {
//         setShowPopup(true);
//         setTimeout(() => setRedirect(true), 2000); // Redirect after successful submission
//         router.push("/thankyou")
//       })
     
//       .catch((error) => {
//         console.error("Error submitting order:", error);
//         alert("Order submission failed. Please try again.");
//       });
//   };

//   const handleConfirmation = () => {
//     setShowConfirmation(false);  // Close the confirmation popup
//     handleSubmit();  // Proceed with the order submission
//   };

//   const handleCancel = () => {
//     setShowConfirmation(false);  // Close the confirmation popup
//   };

//   if (redirect) {
//     return <navigation to="" />;
//   }

//   return (
//     <div className="flex justify-center mt-12 px-4">
//       <div className="w-full lg:w-1/3 border rounded-lg bg-gray-50 text-black p-6 shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Summary</h2>

//         <div className="text-center text-lg mb-6">
//           <span className="font-medium">Total:</span> ₹{cart?.totalAmount?.toFixed(2)}
//         </div>

//         <button
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg font-medium"
//           onClick={() => setShowCheckoutForm(true)}
//         >
//           Proceed to Checkout
//         </button>

//         {/* Checkout Form */}
//         {showCheckoutForm && (
//           <div className="mt-8 border-t pt-6 space-y-4 animate-fade-in">
//             <h3 className="text-xl font-semibold text-gray-700 text-center">Checkout Form</h3>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Shipping Address"
//               value={shippingAddress}
//               onChange={(e) => setShippingAddress(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               placeholder="City"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               placeholder="State"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Postal Code"
//               value={postalCode}
//               onChange={(e) => setPostalCode(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Country"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded"
//             />

//             <div className="flex gap-4">
//               <button
//                 onClick={() => setShowConfirmation(true)}  // Show the confirmation modal
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
//               >
//                 Submit Order
//               </button>
//               <button
//                 onClick={() => setShowCheckoutForm(false)}
//                 className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Success Popup */}
//         {showPopup && (
//           <div className="mt-6 p-4 bg-green-100 text-green-800 rounded shadow text-center">
//             ✅ Your order has been submitted successfully!
//           </div>
//         )}
//       </div>

//       {/* Confirmation Popup */}
//       {showConfirmation && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               Are you sure you want to place this order?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleConfirmation}
//                 className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded"
//               >
//                 Yes, Submit Order
//               </button>
//               <button
//                 onClick={handleCancel}
//                 className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Checkout;
