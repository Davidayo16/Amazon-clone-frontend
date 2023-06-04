import React from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Action/CartActions";

const PaymentScreen = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history("/shipping");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history("/placeorder");
  };
  return (
    <div className="py-5">
      <CheckoutWizard activeStep={1} />
      <div className="container">
        <div className="row d-md-flex justify-content-md-center align-items-md-center">
          <form
            className="col-md-8 col-12 payment-wrapper"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h1 className="mb-4 mt-4">Payment Method</h1>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                checked
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label class="form-check-label" for="exampleRadios1">
                PayPal
              </label>
            </div>
            <button className="w-100 p-2 ship-btn">
              Use this payment method
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
