import React from "react";
import {
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";
import CheckoutWizard from "./../components/CheckoutWizard";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { createOrder } from "./../Redux/Action/OrderActions";

const PlaceOrder = () => {
  const myRef = React.useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const [show, setShow] = React.useState(false);
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cartItems.reduce((x, y) => x + y.qty * y.price, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  window.addEventListener("scroll", function () {
    const cont = myRef.current;
    const asideHeight = cont.getBoundingClientRect().height;
    console.log(asideHeight * 3);
    const scrollHeight = window.pageYOffset;
    console.log(scrollHeight);
    if (scrollHeight > asideHeight * 4.7) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  React.useEffect(() => {
    if (cart.paymentMethod === undefined) {
      history("/payment");
    }
  }, []);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error, loading } = orderCreate;
  console.log(order);

  React.useEffect(() => {
    if (success) {
      history(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, dispatch, success]);

  const handlePlaceOrder = (e) => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <section className="placeorder-wrapper py-5">
        <CheckoutWizard activeStep={2} />
        <div className="container">
          <div className="row placeorder-section mb-3">
            <div className="col-sm-4 col-12 mb-4  mb-sm-0">
              <div className="d-flex gap-10 flex-sm-row flex-column  align-items-sm-start">
                <div className="customer">
                  <FaUser className="user-icon" />
                </div>
                <div className="ps-0">
                  <strong>Customer</strong>
                  <p>{userInfo.name}</p>
                  <p className="my-0">{userInfo.email}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-12 mb-4 mb-sm-0">
              <div className="d-flex flex-sm-row flex-column gap-10  justify-content-center  align-items-sm-start">
                <div className="customer">
                  <FaMapMarkerAlt className="user-icon" />
                </div>
                <div>
                  <strong>Order Info</strong>
                  <p>
                    Shipping: {shippingAddress.country}, {shippingAddress.city}
                  </p>
                  <p>Payment Method: {cart.paymentMethod}</p>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-12 mb-4 mb-sm-0">
              <div className="d-flex gap-10 flex-sm-row flex-column justify-content-center  align-items-sm-start">
                <div className="customer">
                  <FaTruckMoving className="user-icon" />
                </div>
                <div>
                  <strong>Deliver to</strong>
                  <p>Address: {shippingAddress.address.street}</p>
                  <p>{shippingAddress.address.unit}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-none d-sm-flex">
            <div className="col-8 d-flex flex-column">
              {cartItems?.map((items) => {
                return (
                  <div className="d-flex flex-md-row flex-column gap-5  mb-4 placeorder-details">
                    <div className="d-flex  align-items-center gap-15">
                      <img
                        className="img-fluid placeorder-img"
                        src={items.image?.[0]?.img}
                      />
                      <h6>{items.name}</h6>
                    </div>
                    <div className="d-flex gap-5 justify-content-center align-items-center placeorder-2">
                      <div className="placeorder-quantity d-flex flex-column justify-content-center align-items-center">
                        <p>QUANTITY</p>
                        <span>{items.qty}</span>
                      </div>
                      <div className="placeorder-quantity d-flex flex-column justify-content-center align-items-center">
                        <p>SUBTOTAL</p>
                        <span>${items.qty * items.price}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-4">
              <div className="placeorder-table">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong className="strong">PRODUCTS</strong>
                      </td>
                      <td className="value">${cart.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="strong">SHIPPING</strong>
                      </td>
                      <td className="value">${cart.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="strong">TAX</strong>
                      </td>
                      <td className="value">${cart.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="strong">Total</strong>
                      </td>
                      <td className="value">${cart.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="placeorder-btn my-0"
                  type="button"
                  disabled={loading}
                  onClick={(e) => handlePlaceOrder(e)}
                >
                  {loading && (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
          {/* Small screen */}
          <div className="row d-sm-none d-flex">
            <div className="col-12">
              <div
                className={
                  show ? "aside-stickk placeorder-table " : "placeorder-table"
                }
                ref={myRef}
              >
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <strong className="strong">PRODUCTS</strong>
                      </td>
                      <td className="value">${cart.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="strong">SHIPPING</strong>
                      </td>
                      <td className="value">${cart.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="strong">TAX</strong>
                      </td>
                      <td className="value">${cart.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong className="strong">Total</strong>
                      </td>
                      <td className="value">${cart.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                <button
                  className="placeorder-btn my-0"
                  type="button"
                  disabled={loading}
                  onClick={(e) => handlePlaceOrder(e)}
                >
                  {loading && (
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  PLACE ORDER
                </button>
              </div>
            </div>
            <div className="col-12 d-flex flex-column">
              {cartItems?.map((items) => {
                return (
                  <div className="d-flex flex-md-row flex-column gap-5  mb-4 placeorder-details">
                    <div className="d-flex  align-items-center gap-15">
                      <img
                        className="img-fluid placeorder-img"
                        src={items.image?.[0]?.img}
                      />
                      <h6>{items.name}</h6>
                    </div>
                    <div className="d-flex gap-5 justify-content-center align-items-center placeorder-2">
                      <div className="placeorder-quantity d-flex flex-column justify-content-center align-items-center">
                        <p>QUANTITY</p>
                        <span>{items.qty}</span>
                      </div>
                      <div className="placeorder-quantity d-flex flex-column justify-content-center align-items-center">
                        <p>SUBTOTAL</p>
                        <span>${items.qty * items.price}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceOrder;
