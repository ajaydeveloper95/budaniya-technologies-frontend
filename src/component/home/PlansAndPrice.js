import axios from "axios";
import React, { useState } from "react";

function PlansAndPrice() {
  const [showModal, setShowModal] = useState(false);
  const [getData, setData] = useState({});
  const onHandle = (e) => {
    const payment = Number(e.target.name);
    setData((value) => ({
      ...value,
      amount: payment,
    }));
    setShowModal(true);
  };

  const onPayment = () => {
    const url = "http://localhost:3010/api/payment/";
    if (
      getData.name !== undefined &&
      getData.email !== undefined &&
      getData.phone !== undefined &&
      getData.amount !== 0
    ) {
      console.log(getData);
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
    } else {
      console.log("some issue on post payment request");
    }
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
            Pay Now
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
            Pay Now
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
            Pay Now
          </button>
        </div>
      </div>

      {/* model start */}
      <div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white text-gray-600 text-blackoutline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Payment Process</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-gray-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <form className="max-w-64  mx-auto">
                      <div className="mb-5">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          id="email"
                          onChange={(e) => {
                            setData((value) => ({
                              ...value,
                              email: e.target.value,
                            }));
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@flowbite.com"
                          required=""
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="nameid"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Name
                        </label>
                        <input
                          type="nameid"
                          id="nameid"
                          onChange={(e) => {
                            setData((value) => ({
                              ...value,
                              name: e.target.value,
                            }));
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="enter your name"
                          required=""
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          htmlFor="nameid"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Your Mobile Number
                        </label>
                        <input
                          type="phone"
                          id="phone"
                          onChange={(e) => {
                            setData((value) => ({
                              ...value,
                              phone: e.target.value,
                            }));
                          }}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="99999*****"
                          required=""
                        />
                      </div>
                    </form>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        onPayment();
                      }}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      {/* model end  */}
    </div>
  );
}

export default PlansAndPrice;
