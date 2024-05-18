import React from "react";
import Service from "../../src/component/services/Service";

function index() {
  return (
    <div>
      <div className="w-1/2 m-auto my-6">
        <div className="text-center my-4 text-3xl">
          <h1>Service</h1>
        </div>
        <p>
          We are a team of tech enthusiasts and creative masterminds who strive
          to bring our client's visions to life. Our mission is to help
          businesses achieve their goals through effective Technology Solutions.{" "}
        </p>
      </div>

      <Service />
    </div>
  );
}

export default index;
