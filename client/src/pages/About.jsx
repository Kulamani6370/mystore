import React from "react";

const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          About
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              MyStore
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Welcome to MyStore, your trusted neighbourhood grocery destination. We
        are committed to bringing you the freshest vegetables, dairy products,
        grains, and daily essentials at affordable prices. Our mission is to
        make your grocery shopping easy, convenient, and satisfying, with a wide
        range of quality products sourced directly from farmers and reputed
        suppliers. Whether you are planning your weekly meals, buying household
        items, or looking for organic and healthy options, we ensure every
        product meets your expectations. At MyStore, your health and happiness
        come first, and we strive to create a seamless shopping experience every
        time you visit us.
      </p>
    </>
  );
};

export default About;
