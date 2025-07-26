import { Link } from "react-router-dom";

const ProductsGrid = ({ products = [] }) => {
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { _id, name, price, markedprice, images = [] } = product;

        const productImage = images[0]?.url || "/placeholder.jpg";

        return (
          <Link
            key={_id}
            to={`/products/${_id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={productImage}
                alt={name}
                className="rounded-xl h-64 md:h-48 w-full object-contain"
              />
            </figure>

            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{name}</h2>

              <div className="flex gap-2 items-center">
                <span className="text-gray-500 line-through text-sm">
                  ₹{markedprice.toFixed(2)}
                </span>
                <span className="text-secondary font-semibold">
                  ₹{price.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
