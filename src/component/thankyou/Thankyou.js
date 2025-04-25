import React from "react";

function ThankYou() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
      <h1 className="text-5xl font-bold text-green-600 mb-4">🎉</h1>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700">Your order has been placed successfully.</p>
      </div>
    </div>
  );
}

export default ThankYou;
