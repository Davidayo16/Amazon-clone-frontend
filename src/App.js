import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import OurStore from "./Pages/OurStore";
import Blog from "./Pages/Blog";
import ProductDetail from "./Pages/ProductDetail";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import ScrollToTop from "./components/GoToTop";
import Shipping from "./Pages/Shipping";
import PaymentScreen from "./Pages/PaymentScreen";
import PlaceOrder from "./Pages/PlaceOrder";
import Order from "./Pages/Order";
import ProfileScreen from "./Pages/ProfileScreen";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import BlogDetail from "./Pages/BlogDetail";
import PrivateRouter from "./PrivateRouter";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<Contact />} />
              <Route path="store" element={<OurStore />} />
              <Route path="store/:id?" element={<OurStore />} exact />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
              <Route
                path="wishlist"
                element={
                  <PrivateRouter>
                    <Wishlist />
                  </PrivateRouter>
                }
              />
              <Route path="cart" element={<Cart />} />
              <Route
                path="shipping"
                element={
                  <PrivateRouter>
                    <Shipping />
                  </PrivateRouter>
                }
              />
              <Route
                path="payment"
                element={
                  <PrivateRouter>
                    <PaymentScreen />
                  </PrivateRouter>
                }
              />
              <Route
                path="placeorder"
                element={
                  <PrivateRouter>
                    <PlaceOrder />
                  </PrivateRouter>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <PrivateRouter>
                    <Order />
                  </PrivateRouter>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRouter>
                    <ProfileScreen />
                  </PrivateRouter>
                }
              />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
              <Route path="productDetail/:id" element={<ProductDetail />} />
              <Route
                path="blogDetail/:id"
                element={
                  <PrivateRouter>
                    <BlogDetail />
                  </PrivateRouter>
                }
              />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default App;
