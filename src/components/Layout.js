import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import LazyLoading from "../Loading/Error/LazyLoading";

// Lazy-loaded components
const LazyFooter = lazy(() => import("./Footer"));
const LazyHeader = lazy(() => import("./Header"));
const LazySidebar = lazy(() => import("./Sidebar"));

const Layout = () => {
  return (
    <Suspense fallback={<LazyLoading />}>
      <LazyHeader />
      <LazySidebar />
      <Outlet />
      <LazyFooter />
    </Suspense>
  );
};

export default Layout;
