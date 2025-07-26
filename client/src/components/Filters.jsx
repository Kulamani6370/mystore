import React from "react";
import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
import { PRODUCT_CATEGORY } from "../utils/constants";

const Filters = () => {
  const { params } = useLoaderData();
  console.log(params);

  const { search, category, order, price, shipping } = params;
  console.log(search);

  return (
    <Form
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      method="get"
    >
      {/* SEARCH */}
      <FormInput
        type="search"
        label="Search Product"
        name="search"
        size="input-sm"
        defaultValue={search || ""}
      />

      {/* CATEGORIES */}
      <FormSelect
        label="Select Category"
        name="category"
        list={["All", ...Object.values(PRODUCT_CATEGORY)]}
        size="select-sm"
        defaultValue={category || "All"}
      />

      {/* ORDER */}
      <FormSelect
        label="Sort By"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order || "a-z"}
      />

      {/* PRICE */}
      <FormRange
        label="Select Price"
        name="price"
        size="range-sm"
        price={price || ""}
      />

      {/* SHIPPING */}
      <FormCheckbox
        label="Free Shipping"
        name="shipping"
        size="checkbox-sm"
        defaultValue={shipping === "on"}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};

export default Filters;
