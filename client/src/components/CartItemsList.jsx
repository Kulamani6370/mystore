import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemsList = () => {
  const { cartItems } = useSelector((state) => state.cartState);

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem key={item.productID} cartItem={item} />
      ))}
    </div>
  );
};

export default CartItemsList;
