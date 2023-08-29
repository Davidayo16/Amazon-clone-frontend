import React from "react";
import { FaLock } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  ProductDetails,
  listRelatedProduct,
} from "./../Redux/Action/ProductAction";
import { addToCart } from "./../Redux/Action/CartActions";
import Toast from "../Loading/Toast";
import BreadCrumb from "../components/BreadCrumb";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { PRODUCT_CREATE_REVIEW_RESET } from "./../Redux/Constants/ProductConstants";
import Message from "./../Loading/Error/Error";
import Loading from "./../Loading/Error/Loading";
import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import LazyLoading from "./../Loading/Error/LazyLoading";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const id = window.location.pathname.split("/")[2];
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const catId = product?.category?.[0];
  console.log(catId);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const location = useLocation();
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  React.useEffect(() => {
    if (successCreateReview) {
      toast(`Review Added`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      setComment("");
      setRating(0);
    }
    if (errorCreateReview) {
      toast(`Product already reviewed`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setComment("");
      setRating(0);
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(ProductDetails(id));
  }, [dispatch, id, successCreateReview, errorCreateReview, location.key]);

  React.useEffect(() => {
    if (catId) {
      dispatch(listRelatedProduct(catId));
    }
  }, [dispatch, catId, location.key]);

  const relatedProducts = useSelector((state) => state.relatedProducts);

  const { products } = relatedProducts;
  console.log(products);

  const AddToCartHandler = () => {
    dispatch(addToCart(id, Number(qty)));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(createProductReview(id, { rating, comment }));
    }
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems, success } = cart;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthh = new Date().getMonth();
  const date = new Date().getDate();
  const dayy = new Date().getDay();
  const year = new Date().getFullYear();

  const tempDate = new Date(year, monthh, date + 5);
  const newTempDate = new Date(year, monthh, date + 2, dayy);

  const newYear = tempDate.getFullYear();
  const newMonthh = tempDate.getMonth();
  const newDate = tempDate.getDate();

  const fastestDelDayy = newTempDate.getDay();
  const fastestDelMonthh = newTempDate.getMonth();
  const fastestDelDate = newTempDate.getDate();

  const fastestDelDay = days[fastestDelDayy];

  const fastestDelMonth = months[fastestDelMonthh];

  const newMonth = months[newMonthh];
  const month = months[monthh];

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

      {product ? (
        <div className="product-detail-wrapper">
          <div className="container-xxl">
            <BreadCrumb title={product && product?.name} />

            {/* FOR LARGE SCREEN */}
            {loading ? (
              <LazyLoading />
            ) : (
              <div className="row d-none d-lg-flex">
                <div className="col-4">
                  <div className="d-flex align-items-center gap-10">
                    <div className="product-detail-small-img">
                      {product?.image?.map((imgg, index) => {
                        return (
                          <div
                            className="product-detail-small-img-cont "
                            onMouseOver={() => setImageIndex(index)}
                          >
                            <img src={imgg.img} className="img-fluid" />
                          </div>
                        );
                      })}
                    </div>
                    <div>
                      <img
                        src={product?.image?.[imageIndex]?.img}
                        className="img-fluid product-detail-big-img w-100"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div>
                    <div className="detail-title">
                      <h2>{product?.name}</h2>
                      <Link to={"/store"}>Visit the Amazon Basics Store</Link>
                      <div className="d-flex align-items-center gap-10">
                        <div className="d-flex align-items-center ">
                          <ReactStars
                            count={5}
                            size={16}
                            value={product?.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {product?.rating === 0 && (
                            <p className="mb-0">(No rating)</p>
                          )}
                        </div>
                      </div>
                      {product?.numReviews > 0 && (
                        <p>{product?.numReviews} ratings</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 detail-content">
                    <h2 className="past-price">
                      -5% <sup>$</sup> <span>{product?.price}</span>
                    </h2>
                    {product?.properties?.map((prop) => {
                      return Object?.entries(prop).map(([key, value]) => {
                        console.log(key);
                        return (
                          <table
                            key={key}
                            className="table-sm table-borderless"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <b>{key}</b>
                                </td>
                                <td>{value}</td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      });
                    })}
                  </div>
                  <div className="about-detail">
                    <h2>About this item</h2>
                    <ul>
                      <li>{product?.description}</li>
                      <li>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-3">
                  <div className="detail-side py-2 px-5">
                    <h2>
                      <sup>$</sup> <span>{product?.price}</span>
                    </h2>
                    {
                      <h3>
                        No Import Fees Deposit & $19.09 Shipping to Nigeria
                        Details Delivery {month} {date} - {newMonth} {newDate}
                      </h3>
                    }
                    <h3 className="mt-3 mb-3">
                      Or fastest delivery {fastestDelDay},{fastestDelMonth}{" "}
                      {fastestDelDate}. Order within 5 hrs 38 mins
                    </h3>
                    {product?.countInStock > 1 ? (
                      <h3 className="success">Available in stock</h3>
                    ) : (
                      <h4 className="danger">Out of stock</h4>
                    )}
                    <div className="side-select">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product?.countInStock).keys()].map((x) => {
                          return (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                      <div class="d-grid gap-2 col-6 mt-3 mb-3 w-100">
                        <button
                          class="btn btn-warning"
                          type="button"
                          onClick={AddToCartHandler}
                        >
                          Add to cart
                        </button>
                        <button class="btn btn-danger" type="button" disabled>
                          Buy Now
                        </button>
                      </div>
                      <div className="d-flex gap-15 align-items-center">
                        <FaLock className="mb-0" />
                        <h3 className="mb-0">Secure transaction</h3>
                      </div>
                      <table class="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <b>Ships from </b>
                            </td>
                            <td>Amazon.com</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Sold by</b>
                            </td>
                            <td>Amazon.com</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Gift options</b>
                            </td>
                            <td>Add at checkout</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="review-section row py-4 mt-3 mb-3">
                  <div className="col-8">
                    <p>REVIEWS</p>
                    {product?.reviews.length === 0 && (
                      <div className="please-login alert-danger">
                        <p className="mb-0">No reviews</p>
                      </div>
                    )}
                    {product?.reviews.map((review) => {
                      return (
                        <div className="reviewss">
                          <b className="user-text">{review.name}</b>
                          <ReactStars
                            count={5}
                            size={16}
                            value={review?.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {moment(review?.createdAt).calendar()}
                          {/* <p>{moment(review.createdAt).calender()}</p> */}
                          <div className="commented">{review?.comment}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-4">
                    <p>WRITE A CUSTOMER REVIEW</p>
                    <div className="">
                      {loadingCreateReview && <Loading />}
                      {errorCreateReview && (
                        <Message variant="alert-danger">
                          {errorCreateReview}
                        </Message>
                      )}
                    </div>
                    {userInfo ? (
                      <form onSubmit={(e) => submitHandler(e)}>
                        <div className="review-rating-comment">
                          <strong>Rating</strong>
                          <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">select...</option>
                            <option value="1">Poor</option>
                            <option value="2">Fair</option>
                            <option value="3">Good</option>
                            <option value="4">Very good</option>
                            <option value="5">Excellent</option>
                          </select>
                        </div>
                        <div className="review-rating-comment">
                          <strong>Comment</strong>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="submit-review-btn">
                          <button
                            className="submit-review-btnn"
                            disabled={loadingCreateReview}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="please-login alert-danger">
                        <p className="mb-0">
                          Please <Link to={"/login"}>"Login"</Link> to write a
                          review
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {products?.length && (
                  <section className="featured-wrapper home-wrapper py-3 mt-0 px-3 mb-2 mt-2">
                    <div className="container-xxl">
                      <div className="row">
                        {products?.length && (
                          <div className="col-12">
                            <h2 className="section-heading text-center">
                              YOU MAY ALSO LIKE
                            </h2>
                          </div>
                        )}
                        <Carousel
                          additionalTransfrom={0}
                          arrows
                          autoPlaySpeed={3000}
                          centerMode={false}
                          className=""
                          containerClass="container"
                          dotListClass=""
                          draggable
                          focusOnSelect={false}
                          infinite={false}
                          itemClass=""
                          keyBoardControl
                          minimumTouchDrag={80}
                          pauseOnHover
                          renderArrowsWhenDisabled={false}
                          renderButtonGroupOutside={false}
                          renderDotsOutside={false}
                          responsive={{
                            desktop: {
                              breakpoint: {
                                max: 3000,
                                min: 1024,
                              },
                              items: 5,
                              partialVisibilityGutter: 40,
                            },
                            mobile: {
                              breakpoint: {
                                max: 464,
                                min: 0,
                              },
                              items: 3,
                              partialVisibilityGutter: 30,
                              slidesToSlide: 1,
                            },
                            tablet: {
                              breakpoint: {
                                max: 1024,
                                min: 464,
                              },
                              items: 4,
                              partialVisibilityGutter: 30,
                              slidesToSlide: 4,
                            },
                          }}
                          rewind={false}
                          rewindWithAnimation={false}
                          rtl={false}
                          shouldResetAutoplay
                          showDots={false}
                          sliderClass=""
                          slidesToSlide={5}
                          swipeable
                        >
                          {products?.map((prod) => {
                            return (
                              <div className=" w-100">
                                <Link to={`/productDetail/${prod?._id}`}>
                                  <div className="productCard">
                                    <div className="product-img">
                                      <img src={prod?.image[0].img} />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            );
                          })}
                        </Carousel>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* FOR MOBILE SCREEN */}
            {loading ? (
              <LazyLoading />
            ) : (
              <div className="row d-lg-none d-flex">
                <div className="col-sm-6 col-12">
                  <div>
                    <div className="detail-title">
                      <h2>{product?.name}</h2>
                      <Link to={"/store"}>Visit the Amazon Basics Store</Link>
                      {product?.rating > 0 ? (
                        <h3 className="mb-0">
                          {" "}
                          <ReactStars
                            count={5}
                            size={16}
                            value={product?.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {product?.numReviews}{" "}
                          {product?.numReviews > 1 ? "ratings" : "rating"}
                        </h3>
                      ) : (
                        <h3>No ratings</h3>
                      )}
                    </div>
                    <div className="d-flex align-items-center  gap-10">
                      <div className="product-detail-small-img gap-10 w-20">
                        {product?.image?.map((imgg, index) => {
                          return (
                            <div
                              className="product-detail-small-img-cont "
                              onMouseOver={() => setImageIndex(index)}
                            >
                              <img src={imgg.img} className="img-fluid" />
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <img
                          src={product?.image?.[imageIndex]?.img}
                          className="img-fluid product-detail-big-img w-100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 detail-content">
                    <h2 className="past-price">
                      -5% <sup>$</sup> <span>{product?.price}</span>{" "}
                      <sup>$</sup>
                    </h2>
                    {/* <h3>Style: <b>Alarm Clock</b></h3> */}
                    {product?.properties?.map((prop) => {
                      return Object?.entries(prop).map(([key, value]) => {
                        console.log(key);
                        return (
                          <table
                            key={key}
                            className="table-sm table-borderless"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <b>{key}</b>
                                </td>
                                <td>{value}</td>
                              </tr>
                            </tbody>
                          </table>
                        );
                      });
                    })}
                  </div>
                </div>
                <div className="col-sm-6 col-12">
                  <div className="detail-side py-2 px-5">
                    <h2>
                      <sup>$</sup> <span>{product?.price}</span>
                    </h2>
                    {
                      <h3>
                        No Import Fees Deposit & $19.09 Shipping to Nigeria
                        Details Delivery {month} {date} - {newMonth} {newDate}
                      </h3>
                    }
                    <h3 className="mt-3 mb-3">
                      Or fastest delivery {fastestDelDay}, {fastestDelMonth}{" "}
                      {fastestDelDate}. Order within 5 hrs 38 mins
                    </h3>
                    {product?.countInStock > 1 ? (
                      <h3 className="success">Available in stock</h3>
                    ) : (
                      <h4 className="danger">Out of Stock</h4>
                    )}
                    <div className="side-select">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product?.countInStock).keys()].map((x) => {
                          return (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                      <div class="d-grid gap-2 col-6 mt-3 mb-3 w-100">
                        <button
                          class="btn btn-warning"
                          type="button"
                          onClick={AddToCartHandler}
                        >
                          Add to cart
                        </button>
                        <button class="btn btn-danger" type="button" disabled>
                          Buy Now
                        </button>
                      </div>
                      <div className="d-flex gap-15 align-items-center">
                        <FaLock className="mb-0" />
                        <h3 className="mb-0">Secure transaction</h3>
                      </div>
                      <table class="table-sm table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <b>Ships from </b>
                            </td>
                            <td>Amazon.com</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Sold by</b>
                            </td>
                            <td>Amazon.com</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Gift options</b>
                            </td>
                            <td>Add at checkout</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-12">
                  <div className="about-detail">
                    <h2>About this item</h2>
                    <ul>
                      <li>{product?.description}</li>
                    </ul>
                  </div>
                </div>
                <div className="review-section row py-4 mt-3 mb-3">
                  <div className="col-sm-4 col-12 mb-5">
                    <p>WRITE A CUSTOMER REVIEW</p>
                    <div className="">
                      {loadingCreateReview && <Loading />}
                      {errorCreateReview && (
                        <Message variant="alert-danger">
                          {errorCreateReview}
                        </Message>
                      )}
                    </div>
                    {userInfo ? (
                      <form onSubmit={(e) => submitHandler(e)}>
                        <div className="review-rating-comment">
                          <strong>Rating</strong>
                          <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">select...</option>
                            <option value="1">Poor</option>
                            <option value="2">Fair</option>
                            <option value="3">Good</option>
                            <option value="4">Very good</option>
                            <option value="5">Excellent</option>
                          </select>
                        </div>
                        <div className="review-rating-comment">
                          <strong>Comment</strong>
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <div className="submit-review-btn">
                          <button
                            className="submit-review-btnn"
                            disabled={loadingCreateReview}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="please-login alert-danger">
                        <p className="mb-0">
                          Please <Link to={"/login"}>"Login"</Link> to write a
                          review
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-sm-8 col-12">
                    <p>REVIEWS</p>
                    {product?.reviews.length === 0 && (
                      <div className="please-login alert-danger">
                        <p className="mb-0">No reviews</p>
                      </div>
                    )}
                    {product?.reviews.map((review) => {
                      return (
                        <div className="reviewss">
                          <b className="user-text">{review?.name}</b>
                          <ReactStars
                            count={5}
                            size={16}
                            value={review?.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {moment(review.createdAt).calendar()}
                          {/* <p>{moment(review.createdAt).calender()}</p> */}
                          <div className="commented">{review?.comment}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {products?.length && (
                  <section className="featured-wrapper home-wrapper py-3 px-3 mb-2 mt-2">
                    <div className="container-xxl">
                      <div className="row">
                        {products?.length && (
                          <div className="col-12">
                            <h2 className="section-heading text-center">
                              YOU MAY ALSO LIKE
                            </h2>
                          </div>
                        )}
                        <Carousel
                          additionalTransfrom={0}
                          arrows
                          autoPlaySpeed={3000}
                          centerMode={false}
                          className=""
                          containerClass="container"
                          dotListClass=""
                          draggable
                          focusOnSelect={false}
                          infinite={false}
                          itemClass=""
                          keyBoardControl
                          minimumTouchDrag={80}
                          pauseOnHover
                          renderArrowsWhenDisabled={false}
                          renderButtonGroupOutside={false}
                          renderDotsOutside={false}
                          responsive={{
                            desktop: {
                              breakpoint: {
                                max: 3000,
                                min: 1024,
                              },
                              items: 5,
                              partialVisibilityGutter: 40,
                            },
                            mobile: {
                              breakpoint: {
                                max: 464,
                                min: 0,
                              },
                              items: 3,
                              partialVisibilityGutter: 30,
                              slidesToSlide: 1,
                            },
                            tablet: {
                              breakpoint: {
                                max: 1024,
                                min: 464,
                              },
                              items: 4,
                              partialVisibilityGutter: 30,
                              slidesToSlide: 4,
                            },
                          }}
                          rewind={false}
                          rewindWithAnimation={false}
                          rtl={false}
                          shouldResetAutoplay
                          showDots={false}
                          sliderClass=""
                          slidesToSlide={5}
                          swipeable
                        >
                          {products?.map((prod) => {
                            return (
                              <div className=" w-100">
                                <Link to={`/productDetail/${prod?._id}`}>
                                  <div className="productCard">
                                    <div className="product-img">
                                      <img src={prod?.image[0].img} />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            );
                          })}
                        </Carousel>
                      </div>
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <LazyLoading />
      )}
    </>
  );
};

export default ProductDetail;
