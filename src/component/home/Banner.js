import React from "react";

function Banner() {
  return (
    <div className="flex flex-col w-full lg:flex-row max-w-fit px-6">
      <div className="grid flex-grow card bg-base-300 w-1/3 rounded-box place-items-center">
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          sequi voluptas laudantium dolorem reprehenderit eos placeat provident
          perferendis iusto impedit quia possimus at, sapiente nihil eveniet ex
          distinctio dolorum officiis maxime voluptatibus, hic accusamus
          dignissimos? Quis mollitia ducimus ut, temporibus maxime odit
          eligendi. In, nisi velit sunt totam saepe maxime.
        </h1>
      </div>
      <div className="grid flex-grow card bg-base-300 w-1/3 rounded-box place-items-center">
        <img
          src="https://uideck.com/_next/image?url=https%3A%2F%2Fapi.uideck.com%2Fpublic%2Fimages%2Fnft-tailwind.jpg&w=1920&q=75"
          alt=""
        />
      </div>
    </div>
  );
}

export default Banner;
