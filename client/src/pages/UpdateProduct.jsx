import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PRODUCT_CATEGORY,
  PRODUCT_STOCK,
  PRODUCT_UNIT,
} from "../utils/constants";
import { customFetch } from "../utils";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    markedprice: "",
    stock: "",
    unit: "",
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await customFetch.get(`/products/${id}`);
        const product = response.data.product;

        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          markedprice: product.markedprice,
          stock: product.stock,
          unit: product.unit,
        });

        setExistingImages(product.images || []);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching product details");
      }
    };

    fetchProduct();
  }, [id]);

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

    try {
      const response = await customFetch.put(`/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(response);

      toast.success("Product updated successfully");
      navigate("/products");
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-lg bg-base-100 rounded-lg shadow-lg p-8 space-y-4"
      >
        <h2 className="text-3xl font-bold text-center">Update Product</h2>

        {/* Existing Images */}
        <div className="flex flex-wrap gap-2">
          {existingImages.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.alt}
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Form Fields */}
        {[
          { label: "Product Name", name: "name", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Marked Price", name: "markedprice", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="label">
              <span className="label-text">{label}</span>
            </label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        ))}

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
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select unit
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
            <span className="label-text">Update Images</span>
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Update Product
        </button>
      </form>
    </section>
  );
};

export default UpdateProduct;
