import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { customFetch, generateAmountOptions } from "../utils";

export const loader = async ({ params }) => {
  const response = await customFetch.get(`/products/${params.id}`);
  // Adjust based on your controller's returned structure
  return { product: response.data.product }; // assuming { product: {...} }
};

const SingleProduct = () => {
  const user = useSelector((state) => state.userState.user);
  const { product } = useLoaderData();
  const dispatch = useDispatch();

  const {
    _id,
    name,
    price,
    markedprice,
    description,
    brand,
    images,
    stock,
    unit,
  } = product;

  const productImage = images[0]?.url || "/default-placeholder.jpg";

  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    productID: _id,
    quantity: amount,
  };

  const addToCartHandler = () => {
    const cartProduct = {
      productID: _id,
      name,
      price,
      markedprice,
      image: productImage,
      brand,
      quantity: amount,
      unit,
    };
    dispatch(addItem(cartProduct));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image */}
        <img
          src={productImage}
          alt={name}
          className="w-96 h-96 object-contain rounded-lg lg:w-full"
        />

        {/* Product Info */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {brand}
          </h4>

          {/* Price & Marked Price */}
          <div className="mt-3 text-xl flex gap-4 items-center">
            <span className="text-secondary font-bold">{price.toFixed(2)}</span>
            <span className="line-through text-neutral-content">
              {markedprice.toFixed(2)}
            </span>
          </div>

          <p className="mt-6 leading-8">{description}</p>

          {/* Unit & Stock */}
          <p className="mt-4">Unit: {unit}</p>
          <p className="mt-1">Stock: {stock}</p>

          {/* Quantity Selector */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                quantity
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(20)}
            </select>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={addToCartHandler}
            >
              Add to bag
            </button>

            {/* Admin Update Product Link */}
            {user?.role === "admin" && (
              <Link
                to={`/products/${_id}/update`}
                className="btn btn-accent btn-md ml-4"
              >
                Update Product
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
