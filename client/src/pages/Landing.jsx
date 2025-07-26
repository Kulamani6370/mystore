import React from "react";
import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

export const loader = async () => {
  const response = await customFetch("/products/featured");
  const products = response.data;
  // console.log(products);

  return products;
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
