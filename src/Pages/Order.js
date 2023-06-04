import React from "react";
import {
  FaCheckCircle,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaTruckMoving,
  FaUser,
} from "react-icons/fa";
import CheckoutWizard from "./../components/CheckoutWizard";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createOrder,
  getOrderDetails,
  getOrderPay,
} from "./../Redux/Action/OrderActions";
import moment from "moment";
import { PayPalButton } from "react-paypal-button-v2";
import Loading from "./../Loading/Error/Loading";
import { ORDER_PAY_RESET } from "./../Redux/Constants/OrderConstants";
import PayBtn from "../components/PayBtn";

const Order = () => {
  const [show, setShow] = React.useState(false);
  const [showw, setShoww] = React.useState(false);
  const myRef = React.useRef(null);
  const myReff = React.useRef(null);
  const history = useNavigate();
  window.addEventListener("scroll", function () {
    const cont = myRef.current;
    const asideHeight = cont.getBoundingClientRect().height;
    const scrollHeight = window.scrollY;
    const offset = cont.offsetTop;
    console.log(scrollHeight, offset);
    if (scrollHeight > scrollHeight) {
      setShow(true);
    } else {
      setShow(false);
    }
  });
  window.addEventListener("scroll", function () {
    const cont = myReff.current;
    const asideHeight = cont.getBoundingClientRect().height;
    const scrollHeight = window.scrollY;
    const offset = cont.offsetTop;
    console.log(scrollHeight, offset);
    if (scrollHeight > offset) {
      setShoww(true);
    } else {
      setShoww(false);
    }
  });

  const [sdkReady, setSdkReady] = React.useState(false);
  const dispatch = useDispatch();
  const orderId = window.location.pathname.split("/")[2];
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log(order);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  React.useEffect(() => {
    const addToPayPalScript = async () => {
      const { data: clientId } = await api.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order?.isPaid) {
      if (!window.paypal) {
        addToPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(getOrderPay(orderId, paymentResult));
    console.log(order);
  };
  return (
    <>
      <section className="placeorder-wrapper py-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="row placeorder-section mb-3">
              <div className="col-sm-4 col-12 mb-4  mb-sm-0">
                <div className="d-flex gap-10 flex-md-row flex-column  align-items-sm-start">
                  <div className="customer">
                    <FaUser className="user-icon" />
                  </div>
                  <div className="ps-0">
                    <strong>Customer</strong>
                    <p>User Name: {order?.user.name}</p>
                    <p>User Email: {order?.user.email}</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4  col-12 mb-4 mb-sm-0">
                <div className="d-flex flex-md-row flex-column gap-10  justify-content-center  align-items-sm-start">
                  <div className="customer">
                    <FaMapMarkerAlt className="user-icon" />
                  </div>
                  <div>
                    <strong>Order Info</strong>
                    <p>
                      Shipping: {order?.shippingAddress.country},{" "}
                      {order?.shippingAddress.city}
                    </p>
                    <p>Payment Method: {order?.paymentMethod}</p>
                    {order?.isPaid ? (
                      <div className="payment-info pay d-flex align-items-center p-2 success">
                        <h3 className="mb-0">
                          Paid <span>{moment(order?.paidAt).calendar()}</span>
                        </h3>
                        {/* <span><FaCheckCircle/></span> */}
                      </div>
                    ) : (
                      <div className="payment-info not-pay ps-0 bg-danger ">
                        <h3 className="mb-0">Not paid</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-4 col-12 mb-4 mb-sm-0">
                <div className="d-flex gap-10 flex-md-row flex-column justify-content-center  align-items-sm-start">
                  <div className="customer">
                    <FaTruckMoving className="user-icon" />
                  </div>
                  <div>
                    <strong>Deliver to</strong>
                    <p>Address: {order?.shippingAddress.address.street}</p>
                    <p>{order?.shippingAddress.address.unit}</p>
                    {order?.isDelivered ? (
                      <div className="payment-info pay">
                        <h3>{moment(order?.deliveredAt).calendar()}</h3>
                      </div>
                    ) : (
                      <div className="payment-info not-pay d-flex align-items-center danger bg-danger">
                        <h3 className="mb-0">Not Delivered</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-none d-sm-flex">
              <div className="col-md-8 col-7  d-flex flex-column">
                {order?.orderItems?.map((items) => {
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
              <div className="col-md-4 col-5 ">
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
                        <td className="value">${order?.itemsPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="strong">SHIPPING</strong>
                        </td>
                        <td className="value">${order?.shippingPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="strong">TAX</strong>
                        </td>
                        <td className="value">${order?.taxPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="strong">Total</strong>
                        </td>
                        <td className="value">${order?.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                  {!order?.isPaid && (
                    <div className="paypal-cont">
                      {loadingPay && <Loading />}
                      <PayPalButton
                        amount={order?.totalPrice}
                        onSuccess={successPaymentHandler}
                      />

                      {/* <PayBtn orderr={order?.orderItems} user={order?.user} id={order?._id}/> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Small screen */}
            <div className="row d-sm-none d-flex">
              <div className="col-12">
                <div
                  className={
                    showw
                      ? "aside-stickk placeorder-table "
                      : "placeorder-table"
                  }
                  ref={myReff}
                >
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <strong className="strong">PRODUCTS</strong>
                        </td>
                        <td className="value">${order?.itemsPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="strong">SHIPPING</strong>
                        </td>
                        <td className="value">${order?.shippingPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="strong">TAX</strong>
                        </td>
                        <td className="value">${order?.taxPrice}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong className="strong">Total</strong>
                        </td>
                        <td className="value">${order?.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                  {!order?.isPaid && (
                    <div>
                      {loadingPay && <Loading />}
                      {!sdkReady ? (
                        <Loading />
                      ) : (
                        <PayPalButton
                          amount={order?.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12 d-flex flex-column">
                {order?.orderItems?.map((items) => {
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
        )}
      </section>
    </>
  );
};

export default Order;
