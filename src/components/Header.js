import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaAddressBook, FaBars, FaSearch } from "react-icons/fa";
import { IS_ACTIVE } from "./../Redux/Constants/SidebarConstant";
import { logout } from "../Redux/Action/UserAction";

const Header = () => {
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const setSidebar = useSelector((state) => state.setSidebar);
  const openSidebar = () => {
    dispatch({ type: IS_ACTIVE });
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  console.log(userInfo);
  const handleLogout = () => {
    dispatch(logout());
  };

  const [keyword, setKeyword] = React.useState("");

  const handleSearch = (e, keyword) => {
    e.preventDefault();
    if (keyword) {
      history(`/store/${keyword}`);
      setKeyword("");
    } else {
      history("/");
    }
  };

  return (
    <>
      {/****HEADER FOR LARGE SCREEN *****/}
      <header className="header-upper large px-3 ">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-md-1 col-sm-6 header-logo">
              <img src="/images/amma.png" className="img-fluid " />
            </div>
            <div className="col-md-7 col-sm-12">
              <form
                className="input-group"
                onSubmit={(e) => handleSearch(e, keyword)}
              >
                <input
                  type=""
                  className="form-control"
                  placeholder="Search amazon"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                />
                <button className="input-group-text" id="basic-addon2">
                  <FaSearch />
                </button>
              </form>
            </div>
            <div className="col-md-4 col-sm-12 ">
              <div className="header-upper-links d-flex justify-content-between align-items-center">
                <div className="header-items">
                  <Link
                    to={"/wishlist"}
                    className="d-flex align-items-center text-white gap-10"
                  >
                    <img src="/images/love.svg" />
                    <p className="mb-0 ">
                      Favorite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div className="small-avatar header-items">
                  {userInfo ? (
                    <div class="dropdown">
                      <div
                        className=" dropdown-toggle d-flex align-items-center text-white gap-10"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <p className="mb-0 ">
                          Hello <br />
                          {userInfo.name}
                        </p>
                      </div>
                      <ul class="dropdown-menu">
                        <Link to={"/profile"}>
                          <li>
                            <a class="dropdown-item" href="#">
                              Profile
                            </a>
                          </li>
                        </Link>
                        <li onClick={handleLogout}>
                          <a class="dropdown-item" href="#">
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="d-flex align-items-center text-white gap-10"
                    >
                      <p className="mb-0 ">
                        Login <br /> My Account
                      </p>
                    </Link>
                  )}
                </div>
                <div className="cart-container">
                  <Link
                    to={"/cart"}
                    className="d-flex align-items-center text-white gap-10"
                  >
                    <img src="/images/cart.svg" />
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HEADER FOR MOBILE SCREEN */}
      <header className="header-upper mobile px-y py-3 ">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="d-flex gap-10 col-6 col-md-1 col-sm-4 align-items-center">
              <div className="bar" onClick={openSidebar}>
                {/* <img src='/images/bar.svg'/> */}
                <FaBars />
              </div>
              <div className="header-logo">
                <img src="/images/amma.png" />
              </div>
            </div>
            <div className="col-6 col-md-6 col-sm-8">
              <div className="header-upper-links d-flex justify-content-between align-items-center">
                <div className="d-flex gap-10 me">
                  <div className="small-avatar">
                    {userInfo ? (
                      <div class="dropdown">
                        <div
                          className=" dropdown-toggle d-flex align-items-center text-white gap-10"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <p className="mb-0 ">
                            Hello <br />
                            {userInfo.name}
                          </p>
                        </div>
                        <ul class="dropdown-menu">
                          <Link to={"/profile"}>
                            <li>
                              <a class="dropdown-item" href="#">
                                Profile
                              </a>
                            </li>
                          </Link>
                          <li onClick={handleLogout}>
                            <Link class="dropdown-item" href="#">
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="d-flex align-items-center text-white gap-10"
                      >
                        <p className="mb-0 ">
                          Login <br /> My Account
                        </p>
                      </Link>
                    )}
                  </div>
                  <div className="cart-container">
                    <Link
                      to={"/cart"}
                      className="d-flex align-items-center text-white gap-10"
                    >
                      <img src="/images/cart.svg" />
                      <span className="badge">{cartItems.length}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 ">
              <form
                className="input-group"
                onSubmit={(e) => handleSearch(e, keyword)}
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search Product"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value.trim())}
                />
                <span className="input-group-text" id="basic-addon2">
                  <FaSearch />
                </span>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/******* HEADER STRIP*****/}
      <header className="header-bottom px-3 py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-30">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Store</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/blog">Blogs</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
