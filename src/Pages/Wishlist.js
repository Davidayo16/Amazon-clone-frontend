import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { getUserDetails } from "../Redux/Action/UserAction";
import {
  FaEye,
  FaHeart,
  FaLowVision,
  FaRetweet,
  FaShoppingCart,
  FaStar,
  FaStreetView,
} from "react-icons/fa";
import { addToCart } from "../Redux/Action/CartActions";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  console.log(user);
  React.useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  const AddToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="wishlist-wrapper py-5">
        <div className="container">
          <BreadCrumb title="Favourites" />
          <div className="row">
            {user?.wishlist?.map((prod) => {
              return (
                <div className="col-12 col-sm-4 col-md-3 col-xl-3">
                  <div className="productCard">
                    <div className="product-img">
                      <img src={prod?.image[0].img} />
                      <div className="action-bar">
                        <div className="d-flex action-icon-cont">
                          <div className="action-icon">
                            <FaShoppingCart
                              onClick={() => AddToCartHandler(prod?._id)}
                            />
                          </div>
                          <Link
                            className="action-icon"
                            to={`/productDetail/${prod?._id}`}
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="product-content">
                      <h3 className="brand">{prod?.brand}</h3>
                      <h3 className="product-title">{prod?.name}</h3>
                      <div className="d-flex align-items-center ">
                        <ReactStars
                          count={5}
                          size={16}
                          value={prod?.rating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        {prod?.rating === 0 && (
                          <p className="mb-0">(No rating)</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
