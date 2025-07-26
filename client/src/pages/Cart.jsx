import React from "react";
import { useSelector } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useSelector((state) => state.userState);
  const { numItemsInCart } = useSelector((state) => state.cartState);

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          <Link
            to={user ? "/checkout" : "/login"}
            className="btn btn-primary btn-block mt-8"
          >
            {user ? "Proceed to checkout" : "Please login"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
