import React from "react";
import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize font-semibold text-xl">
        Total Orders: {orders.length}
      </h4>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th className="hidden md:table-cell">Date</th>
              <th>Status</th>
              <th>Payment Type</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const {
                _id,
                shippingAddress,
                items,
                totalAmount,
                createdAt,
                orderStatus,
                paymentMethod,
              } = order;

              const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");

              return (
                <tr key={_id}>
                  <td>{shippingAddress.fullName}</td>
                  <td>
                    {shippingAddress.house}, {shippingAddress.street},{" "}
                    {shippingAddress.city}, {shippingAddress.mobile}
                  </td>
                  <td>{items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td>₹{totalAmount}</td>
                  <td className="hidden md:table-cell">{date}</td>
                  <td>
                    <span
                      className={`badge ${
                        orderStatus === "Delivered"
                          ? "badge-success"
                          : orderStatus === "Shipped"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {orderStatus}
                    </span>
                  </td>
                  <td>{paymentMethod}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
