import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 25,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart || defaultState;
  } catch (error) {
    console.error("Error parsing cart from localStorage", error);
    return defaultState;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const item = state.cartItems.find(
        (i) => i.productID === product.productID
      );

      if (item) {
        item.quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }

      toast.success(`${product.name} added to cart`);
      cartSlice.caseReducers.calculateTotals(state);
    },

    removeItem: (state, action) => {
      const { productID } = action.payload;
      const product = state.cartItems.find((i) => i.productID === productID);

      if (product) {
        state.cartItems = state.cartItems.filter(
          (i) => i.productID !== productID
        );
        toast.error("Item removed from cart");
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    editItem: (state, action) => {
      const { productID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.productID === productID);

      if (item && amount >= 1) {
        item.quantity = amount;
        toast.success("Cart updated");
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    clearCart: (state) => {
      Object.assign(state, defaultState);
      toast.info("Cart cleared");
      localStorage.setItem("cart", JSON.stringify(defaultState));
    },

    calculateTotals: (state) => {
      state.numItemsInCart = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );

      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
