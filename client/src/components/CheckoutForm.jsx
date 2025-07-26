import React, { useState } from "react";
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";

import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

import { customFetch } from "../utils";

/**
 * Action to handle order placement
 */
export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const shippingAddress = Object.fromEntries(formData);

    const user = store.getState().userState.user;
    const { cartItems, orderTotal } = store.getState().cartState;

    const items = cartItems.map((item) => ({
      product: item.productID,
      quantity: item.quantity,
    }));

    try {
      await customFetch.post(
        "/orders/",
        {
          items,
          shippingAddress,
          paymentMethod: "Cash on Delivery", // default here; can extend to dynamic
          totalAmount: orderTotal,
        },
        { withCredentials: true }
      );

      store.dispatch(clearCart());
      toast.success("Order placed successfully!");
      return redirect("/orders");
    } catch (error) {
      console.error("Order placement error:", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";
      toast.error(errorMessage);

      if (error.response?.status === 401 || error.response?.status === 403) {
        return redirect("/login");
      }

      return null;
    }
  };

const CheckoutForm = () => {
  const [paymentMethod] = useState("Cash on Delivery");

  return (
    <Form method="post" className="bg-base-200 p-6 rounded-lg shadow-md w-full">
      <h4 className="font-semibold text-2xl mb-4 border-b border-base-300 pb-2">
        Shipping Information
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Full Name", name: "fullName" },
          { label: "Mobile", name: "mobile" },
          { label: "House", name: "house" },
          { label: "Street", name: "street" },
          { label: "Landmark", name: "landmark" },
          { label: "City", name: "city" },
          { label: "State", name: "state" },
          { label: "Pincode", name: "pincode" },
        ].map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            type="text"
            required
          />
        ))}
      </div>

      {/* Payment Method (currently fixed) */}
      <input type="hidden" name="paymentMethod" value={paymentMethod} />

      <div className="mt-6">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
