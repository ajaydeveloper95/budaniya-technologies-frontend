import Image from "next/image";
import React from "react";
import Service01 from "../../../public/assets/webDevelopment.png";
import Service02 from "../../../public/assets/appDevelopment.png";
import Service03 from "../../../public/assets/digitalMarketing.png";
import Service04 from "../../../public/assets/digitalSolutions.png";

function HomePageCard() {
  return (
    <div className="flex justify-evenly flex-wrap mx-4">
      <div className="card border rounded-2xl w-96 bg-base-100 my-4 shadow-xl">
        <figure className="px-10 pt-10">
          <Image
            src={Service01}
            alt="web developer"
            width={100}
            className="rounded-xl m-auto"
          />
        </figure>
        <div className="card-body items-center  text-center">
          <h2 className="card-title my-4">Web Development</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-b-2xl text-center font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="card border rounded-2xl w-96 bg-base-100 my-4 shadow-xl">
        <figure className="px-10 pt-10">
          <Image
            src={Service02}
            alt="web developer"
            width={100}
            className="rounded-xl m-auto"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title my-4">App Development</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-b-2xl text-center font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="card border rounded-2xl w-96 bg-base-100 my-4 shadow-xl">
        <figure className="px-10 pt-10">
          <Image
            src={Service03}
            alt="marketing"
            width={100}
            className="rounded-xl m-auto"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title my-4">Digital Marketing</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-b-2xl text-center font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="card border rounded-2xl w-96 bg-base-100 my-4 shadow-xl">
        <figure className="px-10 pt-10">
          <Image
            src={Service04}
            alt="marketing"
            width={100}
            className="rounded-xl m-auto"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title my-4">Digital Solutions</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="bg-emerald-500 text-white  hover:bg-emerald-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-b-2xl text-center font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePageCard;
