import React from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./../Redux/Action/CartActions";
import { addToWishlist } from "../Redux/Action/ProductAction";

const ProductCard = ({ grid, product, products }) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = React.useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const wish = user?.wishlist?.map((prod) => prod?._id);

  React.useEffect(() => {
    setIsLiked(
      products
        ?.filter((pro) => pro?._id === product?._id)
        .some((p) => wish?.includes(p?._id))
    );
  }, [products]);

  // **** ADD TO CART
  const AddToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
  };
  const addWishlist = (proId) => {
    dispatch(addToWishlist({ proId }));
    setIsLiked(!isLiked);
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
            : grid == 4
            ? "col-12 col-md-4 col-sm-6 col-xl-2 col-lg-3"
            : "col-12 col-sm-4 col-md-3"
        }
      >
        <div className="productCard">
          {product.isBest && <h3 className="best">Best Sellers</h3>}
          <div className="product-img">
            {product?.image && product.image[0] && (
              <img src={product.image[0].img} alt={product.name} />
            )}
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
                  <FaHeart className={isLiked ? "heart" : ""} />
                </div>
              </div>
            </div>
          </div>
          <div className="product-content">
            <div
              className="action-iconn"
              onClick={(e) => addWishlist(product?._id)}
            >
              <FaHeart className={isLiked ? "heart" : ""} />
            </div>
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
