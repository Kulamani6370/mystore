import { generateAmountOptions } from "../utils";
import { removeItem, editItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { productID, title, price, image, quantity, company } = cartItem;

  const handleRemove = () => {
    dispatch(removeItem({ productID }));
  };

  const handleAmountChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      dispatch(editItem({ productID, amount: newQuantity }));
    }
  };

  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />

      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>
        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: "green" }}
          ></span>
        </p>
      </div>

      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor={`quantity-${productID}`} className="label p-0">
            <span className="label-text">Quantity</span>
          </label>
          <select
            id={`quantity-${productID}`}
            className="mt-2 select select-base select-bordered select-xs"
            value={quantity}
            onChange={handleAmountChange}
          >
            {generateAmountOptions(quantity + 5)}
          </select>
        </div>
        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={handleRemove}
        >
          remove
        </button>
      </div>

      <p className="font-medium sm:ml-auto">{price}</p>
    </article>
  );
};

export default CartItem;
