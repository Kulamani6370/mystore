import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "cart", text: "cart" },
  { id: 5, url: "checkout", text: "checkout" },
  { id: 6, url: "orders", text: "orders" },
  { id: 7, url: "admin/add-product", text: "add product", adminOnly: true },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text, adminOnly } = link;
        // hide checkout/orders for non-logged-in users
        if ((url === "checkout" || url === "orders") && !user) return null;

        // show admin-only links only to admin users
        if (adminOnly && (!user || user.role !== "admin")) return null;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
