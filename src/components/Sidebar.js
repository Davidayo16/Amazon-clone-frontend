import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { NOT_ACTIVE } from "../Redux/Constants/SidebarConstant";
import Loading from "../Loading/Error/Loading";
import { logout } from "../Redux/Action/UserAction";

const Sidebar = () => {
  const setSidebar = useSelector((state) => state.setSidebar);
  const dispatch = useDispatch();
  const { isSidebarActive } = setSidebar;
  const ref = React.useRef();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;
  console.log(userInfo);
  const handleLogout = () => {
    dispatch(logout());
  };

  //***** */ CLOSES THE SIDE-BAR*****/
  const closeSidebar = () => {
    dispatch({ type: NOT_ACTIVE });
  };

  // ******CLOSES THE SIDE-BAR WHEN YOU CLICK OUTSIDE OF ITS CONTAINER******//
  React.useEffect(() => {
    const check = (e) => {
      if (isSidebarActive && ref.current && !ref.current.contains(e.target)) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", check);
    return () => {
      document.removeEventListener("mousedown", check);
    };
  }, [isSidebarActive]);

  return (
    <div
      className={
        isSidebarActive
          ? "showw sidebar-body d-block d-md-none"
          : "sidebar-body"
      }
    >
      <div
        className={
          isSidebarActive
            ? "sidebar-show sidebar-wrapper d-block d-md-none py-4"
            : "sidebar-wrapper"
        }
        ref={ref}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <div className="sidebar-logo">
                  <img src="/images/amazon.png" />
                </div>
                <FaTimes className="faTimes" onClick={closeSidebar} />
              </div>
            </div>
            <div className="sidebar-main mt-4">
              {userInfo && (
                <h4 className="user-text">Welcome {userInfo?.name}</h4>
              )}
              <div className="sidebar-container">
                <ul className="sidebar-list ps-0 ">
                  <li className="p-0">
                    <div
                      className="cart-container w-100 m-auto"
                      onClick={closeSidebar}
                    >
                      <Link
                        to={"/cart"}
                        className="d-flex align-items-center text-white gap-10"
                      >
                        <img src="/images/cart.svg" />
                        <span className="sidebar-badge">
                          {cartItems.length}
                        </span>
                      </Link>
                    </div>
                  </li>
                  <li className="p-0">
                    <div onClick={closeSidebar}>
                      <Link className="" to={"/store"}>
                        Visit Our Store
                      </Link>
                    </div>
                  </li>
                  <li className="p-0">
                    <div onClick={closeSidebar}>
                      <Link className="" to={"/wishlist"}>
                        Favourite Wishlist
                      </Link>
                    </div>
                  </li>
                  <li className="p-0">
                    <div onClick={closeSidebar}>
                      <Link className="" to={"/profile"}>
                        Profile
                      </Link>
                    </div>
                  </li>
                  <li className="p-0">
                    {userInfo ? (
                      <div className="w-100" onClick={closeSidebar}>
                        <FaSignOutAlt />
                        <span onClick={handleLogout} className="mx-1">
                          Logout
                        </span>
                      </div>
                    ) : (
                      <div className="w-100" onClick={closeSidebar}>
                        <FaSignInAlt />
                        <Link to={"/login"}>
                          <span className="mx-1">Sign In</span>
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
