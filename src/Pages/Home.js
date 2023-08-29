import React from "react";
import { Link } from "react-router-dom";
import banner from "../BannerData/BannerData";
import {
  FaAllergies,
  FaAngleLeft,
  FaAngleRight,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";

import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  listFeaturedProduct,
} from "../Redux/Action/ProductAction";
import ReactStars from "react-rating-stars-component";
import {
  listCategory,
  listSingleCategory2,
} from "./../Redux/Action/CategoryActions";

import {
  FaEye,
  FaHeart,
  FaLowVision,
  FaRetweet,
  FaShoppingCart,
  FaStar,
  FaStreetView,
} from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bestSellersProduct } from "./../Redux/Action/ProductAction";
import { addToCart } from "./../Redux/Action/CartActions";
import { ToastContainer, toast } from "react-toastify";
import { getUserDetails } from "../Redux/Action/UserAction";
import Loading from "../Loading/Error/Loading";
import LazyLoading from "./../Loading/Error/LazyLoading";

const Home = () => {
  const dispatch = useDispatch();
  const featurdProducts = useSelector((state) => state.featurdProducts);
  const { products, loading } = featurdProducts;
  console.log(products);

  const bestSeller = useSelector((state) => state.bestSeller);
  const { bestProducts } = bestSeller;

  const singleCategory2 = useSelector((state) => state.singleCategory2);
  const { category2, loading: loadingCatt } = singleCategory2;

  // const[productss, setProductss]=React.useState([products])

  const categoryList = useSelector((state) => state.categoryList);
  const { categoryy, loading: loadingCat } = categoryList;
  const cate = categoryy?.categoryList;

  const blogList = useSelector((state) => state.blogList);
  const { loading: loadingBlog, blogs } = blogList;
  console.log(blogs);

  // ****** GET ALL CATEGORIES
  React.useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  // ****** GET SINGLE CATEGORY
  React.useEffect(() => {
    dispatch(listSingleCategory2());
  }, [dispatch]);

  // ****** GET FEATURED PRODUCTS
  React.useEffect(() => {
    dispatch(listFeaturedProduct());
  }, [dispatch]);

  // **** GET BEST SELLER PRODUCTS
  React.useEffect(() => {
    dispatch(bestSellersProduct());
  }, [dispatch]);

  // ***** ADD TO CART
  const AddToCartHandler = (id) => {
    dispatch(addToCart(id, 1));
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  // console.log(user)
  React.useEffect(() => {
    dispatch(getUserDetails("profile"));
  }, [dispatch]);

  // ****** ADD TO WISHLIST
  const product = products?.map((prod) => prod);

  const addWishlist = (proId) => {
    dispatch(addToWishlist({ proId }));
    setIsLiked(!isLiked);
  };
  const [isLiked, setIsLiked] = React.useState(false);
  const wish = user?.wishlist?.map((prod) => prod?._id);

  React.useEffect(() => {
    setIsLiked(
      products
        ?.filter((pro) => pro?._id === product?._id)
        .some((p) => wish?.includes(p?._id))
    );
  }, []);

  return (
    <>
      {loadingBlog && loadingCat && loadingCatt && loading ? (
        <LazyLoading />
      ) : (
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

          {/********** CAROUSEL ********/}
          {cate?.length && (
            <section className="home-wrapper-1">
              <div className="container-xs">
                <div className="row">
                  <div className="col-md-12 col-sm-12 d-none d-xl-block">
                    <div
                      id="carouselExampleIndicators"
                      class="carousel slide slidee"
                      data-bs-ride="true"
                      data-bs-touch="true"
                    >
                      <div class="carousel-indicators d-none d-md-flex">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          class="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="1"
                          aria-label="Slide 3"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="2"
                          aria-label="Slide 4"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="3"
                          aria-label="Slide 5"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="4"
                          aria-label="Slide 6"
                        ></button>
                      </div>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src="/images/amma3.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ama1.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ama3.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/am4.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ama4.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 d-block d-xl-none">
                    <div
                      id="carouselExampleIndicatorss"
                      class="carousel slide "
                      data-bs-ride="true"
                    >
                      <div class="carousel-indicators d-none d-md-flex">
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to="0"
                          class="active"
                          aria-current="true"
                          aria-label="Slide 1"
                        ></button>

                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicatorss"
                          data-bs-slide-to="1"
                          aria-label="Slide 3"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicatorss"
                          data-bs-slide-to="2"
                          aria-label="Slide 4"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicatorss"
                          data-bs-slide-to="3"
                          aria-label="Slide 5"
                        ></button>
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicatorss"
                          data-bs-slide-to="4"
                          aria-label="Slide 6"
                        ></button>
                      </div>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src="/images/amma3.1.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ama1.1.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ama3.1.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/am4.1.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ama4.1.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicatorss"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicatorss"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/******** CATEGORIES *******/}
          <section className="home-wrapper-3 py-3">
            <div className="container-xxl">
              <div className="row">
                {cate?.map((cat) => {
                  return (
                    <div className="col-12 col-xl-2 col-lg-3 col-sm-4 mb-3 ">
                      <div className="categories mt-3">
                        <Link to={`/store?cat=${cat._id}`}>
                          <h3>{cat.name}</h3>
                        </Link>
                        <div className="product-img">
                          <img src={cat.image} className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/*** FREE SHIPPING ***/}
          <section className="home-wrapper-2 py-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="services d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-15 mt-3 mb-3">
                      <img src="/images/shipping.svg" />
                      <div>
                        <h4>Free Shipping</h4>
                        <span className="dim">From all orders over $100</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15 mt-3 mb-3 meee">
                      <img src="/images/gift.svg" />
                      <div>
                        <h4>Daily Suprise Orders</h4>
                        <span className="dim">Save up to 20% off</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15 mt-3 mb-3">
                      <img src="/images/headphone.svg" />
                      <div>
                        <h4>Support 24/7</h4>
                        <span className="dim">Shop with an expert</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15 mt-3 mb-3">
                      <img src="/images/prices.svg" />
                      <div>
                        <h4>Affordable Prices</h4>
                        <span className="dim">Get factory direct prices</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15 mt-3 mb-3">
                      <img src="/images/payment.svg" />
                      <div>
                        <h4>Secure Payments</h4>
                        <span className="dim">100% protected payments</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/****** FEATURED COLLECTIONS ******/}
          {products?.length && (
            <section className="featured-wrapper home-wrapper py-3 mt-0 px-3 mb-2">
              <div className="container-xxl">
                <div className="row">
                  {products?.length && (
                    <div className="col-12 ">
                      <h2 className="section-heading">Featured Collections</h2>
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
                        items: 1.5,
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
                            <div className="productCardd">
                              <div className="product-img">
                                <img src={prod?.image?.[0].img} />
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

          {/****** BEST SELLERS *******/}
          {products?.length && (
            <section className="best-wrapper  home-wrapper py-3 mt-0 px-3">
              <div className="container-xxl">
                <div className="row">
                  {bestProducts?.length && (
                    <div className="col-12">
                      <h2 className="section-heading">Best Sellers</h2>
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
                        items: 1.5,
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
                    {bestProducts?.map((prod) => {
                      return (
                        <div className=" w-100">
                          <Link to={`/productDetail/${prod?._id}`}>
                            <div className="productCardd">
                              <h3 className="best">Best Sellers</h3>
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

          {/****** SPECIFIC CATEGORIES *****/}
          <section className="home-wrapper-3 py-3 px-3">
            <div className="container-xxl">
              <div className="row">
                {category2?.categories?.map((catt) => {
                  return (
                    <div className=" col-12 col-sm-3 mb-3">
                      <div className="categoriess">
                        <Link to={`/store?cat=${catt._id}`}>
                          <h3>{catt.name}</h3>
                        </Link>
                        <div className="">
                          <img src={catt.image} className="img-fluid" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/******* AMAZON CHOICE ******/}
          {products?.length && (
            <section className="featured-wrapper home-wrapper py-2 mt-0 px-3 amaa">
              <div className="container-xxl">
                <div className="row">
                  {products?.length && (
                    <div className="col-12">
                      <h2 className="section-heading">Amazons choice</h2>
                    </div>
                  )}
                  {products?.map((product) => {
                    console.log(product?.image);
                    return (
                      <ProductCard
                        product={product}
                        products={products}
                        grid={4}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* SECOND BANNER */}
          {products?.length && (
            <section className="home-wrapper-1 py-3">
              <div className="container">
                <div className="row d-flex banner-flex">
                  <div className="col-md-12 w-50 col-sm-12 mb-sm-0 mb-3 banner-flex-items ">
                    <div
                      id="carouselExampleFade"
                      class="carousel slide carousel-fade"
                      data-bs-ride="carousel"
                      data-bs-interval="5000"
                    >
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src="/images/ban11.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ban22.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFade"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-12 w-50 col-sm-12 banner-flex-items ">
                    <div
                      id="carouselExampleFade2"
                      class="carousel slide carousel-fade"
                      data-bs-ride="carousel"
                      data-bs-interval="5000"
                    >
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <img
                            src="/images/ban33.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                        <div class="carousel-item">
                          <img
                            src="/images/ban22.jpg"
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      </div>
                      <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleFade2"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleFade2"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/****** POPULAR ITEMS THIS SEASON *****/}
          {products?.length && (
            <section className="featured-wrapper home-wrapper py-3 mt-0 px-3 mb-2">
              <div className="container-xxl">
                <div className="row">
                  {products?.length && (
                    <div className="col-12">
                      <h2 className="section-heading">
                        Popular items this season
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
                        partialVisibilityGutter: 30,
                      },
                      mobile: {
                        breakpoint: {
                          max: 464,
                          min: 0,
                        },
                        items: 1.5,
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
                            <div className="productCardd">
                              <div className="product-img">
                                <img src={prod?.image?.[0].img} />
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

          {/********** BLOG ****************/}
          {products?.length && (
            <section className="blog-wrapper py-4 ">
              <div className="container-xxl">
                <div className="row">
                  <div className="col-12">
                    <h2 className="section-heading"> Our Latest Blog</h2>
                  </div>
                  <BlogCard />
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Home;
