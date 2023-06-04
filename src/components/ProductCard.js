import React from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../Redux/Action/CartActions";
import { addToWishlist } from "../Redux/Action/ProductAction";

const ProductCard = ({ grid, product }) => {
  let location = useLocation();
  const dispatch = useDispatch();

  // **** ADD TO CART
  const AddToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
  };
  const addWishlist = (proId) => {
    console.log(proId);
    dispatch(addToWishlist({ proId }));
  };
  return (
    <>
      {/******** PRODUCT CARD *********/}
      <div
        className={
          location.pathname == "/store" && grid == 3
            ? "col-12 col-sm-4 col-md-3"
            : grid == 2
            ? "col-12 col-sm-6 col-md-4"
            : grid == 1
            ? "col-12 col-sm-6 col-md-6"
            : "col-12 col-sm-4 col-md-3"
        }
      >
        <div className="productCard">
          {product.isBest && <h3 className="best">Best Sellers</h3>}
          <div className="product-img">
            <img src={product?.image[0].img} />
            <div className="action-bar">
              <div className="d-flex action-icon-cont">
                <div
                  className="action-icon"
                  onClick={(e) => AddToCartHandler(product?._id)}
                >
                  <FaShoppingCart />
                </div>
                <Link
                  className="action-icon"
                  to={`/productDetail/${product?._id}`}
                >
                  <FaEye />
                </Link>
                <div
                  className="action-icon"
                  onClick={(e) => addWishlist(product?._id)}
                >
                  <FaHeart />
                </div>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h3 className="brand">{product?.brand}</h3>
            <h3 className="product-title">{product?.name}</h3>
            <div className="d-flex align-items-center ">
              <ReactStars
                count={5}
                size={16}
                value={product?.rating}
                edit={false}
                activeColor="#ffd700"
              />
              {product?.rating === 0 && <p className="mb-0">(No rating)</p>}
            </div>
            <p className="price">${product?.price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
