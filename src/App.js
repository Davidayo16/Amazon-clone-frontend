import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRouter from "./PrivateRouter";
import ScrollToTop from "./components/GoToTop";
import LazyLoading from "./Loading/Error/LazyLoading";

// Lazy-loaded components
const LazyHome = lazy(() => import("./Pages/Home"));
const LazyContact = lazy(() => import("./Pages/Contact"));
const LazyOurStore = lazy(() => import("./Pages/OurStore"));
const LazyBlog = lazy(() => import("./Pages/Blog"));
const LazyProductDetail = lazy(() => import("./Pages/ProductDetail"));
const LazyLogin = lazy(() => import("./Pages/Login"));
const LazyRegister = lazy(() => import("./Pages/Register"));
const LazyWishlist = lazy(() => import("./Pages/Wishlist"));
const LazyCart = lazy(() => import("./Pages/Cart"));
const LazyShipping = lazy(() => import("./Pages/Shipping"));
const LazyPaymentScreen = lazy(() => import("./Pages/PaymentScreen"));
const LazyPlaceOrder = lazy(() => import("./Pages/PlaceOrder"));
const LazyOrder = lazy(() => import("./Pages/Order"));
const LazyProfileScreen = lazy(() => import("./Pages/ProfileScreen"));
const LazyCheckoutSuccess = lazy(() => import("./Pages/CheckoutSuccess"));
const LazyBlogDetail = lazy(() => import("./Pages/BlogDetail"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyHome />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyContact />
                </Suspense>
              }
            />
            <Route
              path="store"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyOurStore />
                </Suspense>
              }
            />
            <Route
              path="store/:id?"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyOurStore />
                </Suspense>
              }
              exact
            />
            <Route
              path="blog"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyBlog />
                </Suspense>
              }
            />
            <Route
              path="wishlist"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyWishlist />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="cart"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyCart />
                </Suspense>
              }
            />
            <Route
              path="shipping"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyShipping />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="payment"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyPaymentScreen />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="placeorder"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyPlaceOrder />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="/order/:id"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyOrder />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyProfileScreen />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="/checkout-success"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyCheckoutSuccess />
                </Suspense>
              }
            />
            <Route
              path="productDetail/:id"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LazyProductDetail />
                </Suspense>
              }
            />
            <Route
              path="blogDetail/:id"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <LazyBlogDetail />
                  </Suspense>
                </PrivateRouter>
              }
            />
          </Route>
          <Route
            path="login"
            element={
              <Suspense fallback={<LazyLoading />}>
                <LazyLogin />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<LazyLoading />}>
                <LazyRegister />
              </Suspense>
            }
          />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
