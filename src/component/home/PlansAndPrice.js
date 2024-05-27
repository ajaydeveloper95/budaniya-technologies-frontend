import axios from "axios";
import React from "react";

function PlansAndPrice() {
  const onHandle = (e) => {
    const payment = Number(e.target.name);
    const url = "https://api.budaniyatechnologies.com/payment/";
    axios
      .post(url, {
        email: "kumarajay4113@gmail.com",
        name: "Ajay kumar",
        amount: 2,
        phone: "8000623206",
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div className="flex flex-warp mx-1 items-center flex-col">
      <div>
        <h2 className="text-3xl font-bold tracki text-center mt-12 sm:text-5xl ">
          Pricing
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center ">
          Get started on our free plan and upgrade when you are ready.
        </p>
      </div>
      <div className="mt-24 z-0 container space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Basic</h3>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                ₹ 5000
              </span>
              <span className="ml-1 text-xl font-semibold">/Starting</span>
            </p>
            <p className="mt-6 ">You just want to discover</p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Static Website</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Content Update by developer</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">SEO-Friendly </span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Best UI / UX </span>
              </li>
            </ul>
          </div>
          <button
            onClick={onHandle}
            name="5000"
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
          >
            Join Now
          </button>
        </div>
        <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Pro</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
              Most popular
            </p>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                ₹ 18000
              </span>
              <span className="ml-1 text-xl font-semibold">/Starting</span>
            </p>
            <p className="mt-6 ">
              You want to learn and have a personal assistant
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Dynamic website</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Content Update Admin Panel</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">SEO - Friendly</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Best UI/UX </span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Admin Panel</span>
              </li>
            </ul>
          </div>
          <button
            className="bg-emerald-500 cursor-pointer text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={onHandle}
            name="18000"
          >
            Join Now
          </button>
        </div>
        <div className="relative p-8  border border-gray-200 rounded-2xl shadow-sm flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold ">Premium</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide  transform -translate-y-1/2">
              Most popular
            </p>
            <p className="mt-4 flex items-baseline ">
              <span className="text-5xl font-extrabold tracking-tight">
                ₹ 26000
              </span>
              <span className="ml-1 text-xl font-semibold">/Starting</span>
            </p>
            <p className="mt-6 ">
              You want to learn and have a personal assistant
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">All Dynamic Features</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Advanced Custom Fileds</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Database Maintenance</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Enhanced Support</span>
              </li>
              <li className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 w-6 h-6 text-emerald-500"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="ml-3 ">Customized Features</span>
              </li>
            </ul>
          </div>
          <button
            className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
            onClick={onHandle}
            name="26000"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlansAndPrice;
