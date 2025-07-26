import React, { useState } from "react";
import { Form } from "react-router-dom";

import { toast } from "react-toastify";
import {
  PRODUCT_CATEGORY,
  PRODUCT_STOCK,
  PRODUCT_UNIT,
} from "../utils/constants";
import { customFetch } from "../utils";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    markedprice: "",
    stock: "",
    unit: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    images.forEach((image) => data.append("images", image));
    // console.log([...data.entries()]);

    try {
      const response = await customFetch.post("/products/", data, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success("Product added successfully");
      // Reset form after submission
      setFormData({
        name: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        markedprice: "",
        stock: "",
        unit: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      toast.error("Error creating product");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <Form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-lg bg-base-100 rounded-lg shadow-lg p-8 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">Add New Product</h2>

        {/* Name */}
        <div>
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text">Product Description</span>
          </label>
          <input
            type="text"
            name="description"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        {/* Brand */}
        <div>
          <label className="label">
            <span className="label-text">Product Brand</span>
          </label>
          <input
            type="text"
            name="brand"
            placeholder="Enter product company name"
            value={formData.brand}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {Object.entries(PRODUCT_CATEGORY).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Selling price"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Marked Price</span>
            </label>
            <input
              type="number"
              name="markedprice"
              placeholder="Marked price"
              value={formData.markedprice}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Stock */}
        <div>
          <label className="label">
            <span className="label-text">Stock Status</span>
          </label>
          <select
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select stock status
            </option>
            {Object.entries(PRODUCT_STOCK).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Unit */}
        <div>
          <label className="label">
            <span className="label-text">Unit</span>
          </label>
          {/* <input
            type="text"
            name="unit"
            placeholder="e.g. kg, packet"
            value={formData.unit}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          /> */}
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select the product unit
            </option>
            {Object.entries(PRODUCT_UNIT).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="label">
            <span className="label-text">Product Images</span>
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Create Product
        </button>
      </Form>
    </section>
  );
};

export default AddProduct;
