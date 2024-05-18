import React from "react";
import PlansAndPrice from "./PlansAndPrice";
import WhyChooseUs from "./WhyChooseUs";
import NewsLetter from "../newsletter/NewsLetter";
import WhatWeOffer from "./WhatWeOffer";
import Banner from "./Banner";
import Testimonials from "../testimonials/Testimonials";

function Home() {
  return (
    <div>
      <Banner />
      <PlansAndPrice />
      <WhatWeOffer />
      <WhyChooseUs />
      <Testimonials />
      <NewsLetter />
    </div>
  );
}

export default Home;
