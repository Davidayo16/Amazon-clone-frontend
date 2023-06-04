import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PayBtn = ({ orderr, user, id }) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `/api/stripe/create-checkout-session/${id}`,
        {
          orderr,
          userId: user?.id,
        }
      );
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <button className="btn" onClick={handleCheckout}>
        Check out
      </button>
    </>
  );
};

export default PayBtn;
