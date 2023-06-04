import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { listMyOrders } from '../Redux/Actions/OrderActions';
import Message from "../Loading/Error/Error";
import Loading from "../Loading/Error/Loading";
import moment from "moment";

const Order = () => {
  const dispatch = useDispatch();
  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  console.log(orders);
  return (
    <>
      {/********** ORDERS ******/}
      <div className="table-responsive">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {orders.length === 0 ? (
              <div>
                <Link>Continue Shopping</Link>
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody className="order-body">
                  {orders.map((order) => {
                    return (
                      <tr
                        className={
                          order.isPaid ? "table-success" : "table-danger"
                        }
                      >
                        <td>
                          <Link to={`/order/${order._id}`} className="link">
                            {order._id}
                          </Link>
                        </td>
                        <td>{order.isPaid ? "Paid" : "Not paid"}</td>
                        <td>
                          {order.isPaid
                            ? moment(order.paidAt).calendar()
                            : moment(order.createdAt).calendar()}
                        </td>
                        <td>${order.totalPrice}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Order;
