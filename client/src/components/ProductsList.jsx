import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductsList = () => {
  const { products } = useLoaderData();

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { _id, name, price, images = [], brand } = product;

        const formattedPrice = formatPrice(price);
        const productImage = images[0]?.url || "/placeholder.jpg";

        return (
          <Link
            key={_id}
            to={`/products/${_id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={productImage}
              alt={name}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="ml-0 sm:ml-16 flex-1">
              <h3 className="capitalize font-medium text-lg">{name}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {brand}
              </h4>
            </div>

            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {formattedPrice}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsList;
