import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";


function PrivateRouter({ children }) {
    const auth = window.localStorage.getItem("userInfo")
    return auth ? children : <Navigate to="/login" />;
  }
  export default PrivateRouter