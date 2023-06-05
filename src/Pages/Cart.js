import React, { createRef, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "./../Redux/Action/CartActions";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addToWishlist } from "../Redux/Action/ProductAction";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "./../components/BreadCrumb";
import { cartReducer } from "./../Redux/Reducers/CartReducers";
const Cart = () => {
  const [show, setShow] = React.useState(false);
  const [showw, setShoww] = React.useState(false);
  const myRef = useRef(null);
  const myReff = useRef(null);
  const dispatch = useDispatch();
  const history = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, success } = cart;
  // console.log(cartItems)
  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);
  const totalPrice = cartItems.map((i) => i.qty * i.price);
  // console.log(totalPrice, total)

  // ***** SETS POSITION FIXED TO THE CHECKOUT CONTAINER WHEN THE SCROLL-Y CROSSES ITS PAGE-Y OFFSET FOR LARGE SCREEN **//
  React.useEffect(() => {
    const check = () => {
      const cont = myRef.current;
      // const asideHeight=cont.pageYOffset
      const offset = cont.offsetTop;
      // console.log(asideHeight)
      const scrollHeight = window.pageYOffset;
      console.log(scrollHeight);
      if (scrollHeight > offset) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", check);
    return () => {
      window.removeEventListener("scroll", check);
    };
  });

  // ***** SETS POSITION FIXED TO THE CHECKOUT CONTAINER WHEN THE SCROLL-Y CROSSES ITS PAGE-Y OFFSET FOR MOBILE **//
  React.useEffect(() => {
    const check = () => {
      const cont = myReff.current;
      // const asideHeight=cont.pageYOffset
      const offset = cont.offsetTop;
      // console.log(asideHeight)
      const scrollHeight = window.pageYOffset;
      console.log(scrollHeight);
      if (scrollHeight > offset) {
        setShoww(true);
      } else {
        setShoww(false);
      }
    };
    window.addEventListener("scroll", check);
    return () => {
      window.removeEventListener("scroll", check);
    };
  });

  //  *******REMOVE PRODUCT FROM CART ****** //
  const removeFromCart = (id) => {
    dispatch(removeCart(id));
  };

  //  ******** PROCEED TO CHECKOUT ******* //
  const handleCheckout = () => {
    if (cartItems.length !== 0) {
      history("/login?redirect=/shipping");
    }
  };

  // ****** ADD TO WISHLIST ********//
  const addWishlist = (proId) => {
    console.log(proId);
    dispatch(addToWishlist({ proId }));
  };
  return (
    <>
      {/******* CART FOR LARGE SCREEN **********/}
      <section className="cart-wrapper py-3 px-3 d-lg-block d-none">
        <div className="container-xxl">
          <div className="row">
            {cartItems.length ? (
              <>
                <div className="col-lg-9 col-12 cart-section">
                  <div className="d-flex justify-content-between cart-head">
                    <h2 className="mb-3">Shopping Cart</h2>
                    <p>Price</p>
                  </div>
                  <div className="cart-main-wrapper">
                    {cartItems?.map((item) => {
                      return (
                        <div className="d-flex justify-content-between cart-main">
                          <div className="cart-cont d-flex gap-15">
                            <img
                              src={item?.image[0].img}
                              className="img-fluid"
                            />
                            <div className="cart-side">
                              <h3>{item.name}</h3>
                              <h4 className="mt-3 instock">In Stock</h4>
                              <div className="d-flex align-items-center gap-10">
                                <input type="checkbox" />
                                <h4 className="mb-0">this is a gift</h4>
                              </div>
                              <div className="mt-2 mb-">
                                {item?.rating > 0 ? (
                                  <ReactStars
                                    className="mt-4 mb-4"
                                    count={5}
                                    size={16}
                                    value={item?.rating}
                                    edit={false}
                                    activeColor="#ffd700"
                                  />
                                ) : (
                                  <h4>No rating</h4>
                                )}
                              </div>
                              <div className="d-md-flex align-items-center justyfy-content-between gap-15 mb-0">
                                <select
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[
                                    ...Array(
                                      Number(`${item.countInStock}`)
                                    ).keys(),
                                  ].map((x) => (
                                    <option value={x + 1} key={x + 1}>
                                      Qty: {x + 1}
                                    </option>
                                  ))}
                                </select>
                                <div className="mt-2 mt-md-0 cart-func">
                                  <h4
                                    className="mb-0 delete"
                                    onClick={() => removeFromCart(item.product)}
                                  >
                                    Delete
                                  </h4>
                                </div>
                                <div
                                  className="mt-2 mt-md-0 cart-func"
                                  onClick={(e) => addToWishlist(item.id)}
                                >
                                  <h4
                                    className="mb-0"
                                    onClick={() => addWishlist(item.product)}
                                  >
                                    Add to wishlist
                                  </h4>
                                </div>
                                <Link to={`/productDetail/${item.product}`}>
                                  <div className="mt-2 mt-md-0 cart-func">
                                    <h4 className="mb-0 ">View item</h4>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <h2 className="cart-price">${item.price}</h2>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className={
                    show
                      ? "aside-stick col-lg-3 col-sm-12 cart-aside mt-lg-0 mt-2"
                      : "col-lg-3 col-sm-12 cart-aside mt-lg-0 mt-2"
                  }
                  ref={myRef}
                >
                  <div className=" cart-aside-main mt-0">
                    <div className="car-aside-section m-4">
                      <h3>
                        Subtotal ({cartItems.length}): ${total}
                      </h3>
                      <button
                        className="w-100 checkout"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center flex-column ">
                  <h2>Shopping Cart</h2>
                  <BreadCrumb title="Cart" />
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src="/images/empty-cart.png"
                      className="img-fluid w-50"
                    />
                    <div className="cart-empty-content">
                      <h3 className="fs-4">Your Cart is Currently Empty</h3>
                      <p className="mt-4 mb-4">
                        Before you proceed to checkout you must add some
                        products to your shopping cart.
                        <br />
                        you will find a lot of interesting products on our store
                        page
                      </p>
                      <Link to={"/store"}>
                        <button className="go-shopping-btn">
                          Return To Store
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/********  CART FOR MOBILE **********/}
      <section className="cart-wrapper py-3 px-3 d-lg-none d-block">
        <div className="container-xxl">
          <div className="row">
            {cartItems.length ? (
              <>
                <div
                  className={
                    showw
                      ? "aside-stick col-lg-3 col-sm-12 cart-aside mt-lg-0"
                      : "col-lg-3 col-sm-12 cart-aside mt-lg-0 mt-2"
                  }
                  ref={myReff}
                >
                  <div className="cart-aside-main mt-0">
                    <div className="car-aside-section  bg-blue">
                      <h3>
                        Subtotal ({cartItems.length}): ${total}
                      </h3>
                      <button
                        className="w-100 checkout"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-12 cart-section">
                  <div className="d-flex justify-content-between cart-head">
                    <h2 className="mb-3 shopping-cart">Shopping Cart</h2>
                    <p>Price</p>
                  </div>
                  <div className="cart-main-wrapper">
                    {cartItems.map((item) => {
                      return (
                        <div className="d-flex justify-content-between cart-main">
                          <div className="cart-cont d-flex gap-15">
                            <img
                              src={item?.image[0].img}
                              className="img-fluid"
                            />
                            <div className="cart-side">
                              <h3>{item.name}</h3>
                              <h4 className="mt-3 instock">In Stock</h4>
                              <div className="d-flex align-items-center gap-10">
                                <input type="checkbox" />
                                <h4 className="mb-0">this is a gift</h4>
                              </div>
                              <div className="mt-2">
                                {item?.rating > 0 ? (
                                  <ReactStars
                                    count={5}
                                    size={16}
                                    value={item?.rating}
                                    edit={false}
                                    activeColor="#ffd700"
                                  />
                                ) : (
                                  <h4>No rating</h4>
                                )}
                              </div>
                              <div className="d-md-flex align-items-center mt-2 justyfy-content-between gap-15 mb-0">
                                <select
                                  value={item.qty}
                                  onChange={(e) =>
                                    dispatch(
                                      addToCart(
                                        item.product,
                                        Number(e.target.value)
                                      )
                                    )
                                  }
                                >
                                  {[
                                    ...Array(
                                      Number(`${item.countInStock}`)
                                    ).keys(),
                                  ].map((x) => (
                                    <option value={x + 1} key={x + 1}>
                                      Qty: {x + 1}
                                    </option>
                                  ))}
                                </select>
                                <div className="mt-3 mt-md-0 cart-func">
                                  <h4
                                    className="mb-0 delete"
                                    onClick={() => removeFromCart(item.product)}
                                  >
                                    Delete
                                  </h4>
                                </div>
                                <div className="mt-3 mt-md-0 cart-func">
                                  <h4
                                    className="mb-0"
                                    onClick={() => addWishlist(item.product)}
                                  >
                                    Add to wishlist
                                  </h4>
                                </div>
                                <Link to={`/productDetail/${item.product}`}>
                                  <div className="mt-3 mt-md-0 cart-func">
                                    <h4 className="mb-0 ">View item</h4>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <h2 className="cart-price">${item.price}</h2>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center flex-column ">
                  <h2>Shopping Cart</h2>
                  <BreadCrumb title="Cart" />
                  <div className="d-flex justify-content-center align-items-center flex-sm-row flex-column">
                    <img
                      src="/images/empty-cart.png"
                      className="img-fluid w-50 empty-cart-img"
                    />
                    <div className="cart-empty-content">
                      <h3 className="fs-4">Your Cart is Currently Empty</h3>
                      <p className="mt-4 mb-4">
                        Before you proceed to checkout you must add some
                        products to your shopping cart.
                        <br />
                        you will find a lot of interesting products on our store
                        page
                      </p>
                      <Link to={"/store"}>
                        <button className="go-shopping-btn">
                          Return To Store
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;
