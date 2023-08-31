import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Action/ProductAction";
import Loading from "../Loading/Error/Loading";
import Message from "./../Loading/Error/Error";
import {
  listCategory,
  listSingleCategory,
} from "./../Redux/Action/CategoryActions";
import Category from "./../components/Category";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaFilter, FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LazyLoading from "../Loading/Error/LazyLoading";

const OurStore = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [grid, setGrid] = React.useState(3);
  const [openCat, setOpenCat] = React.useState(true);
  const [sort, setSort] = React.useState("");
  const [isBest, setIsBest] = React.useState(false);
  const [isFeatured, setIsFeatured] = React.useState();
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState(null);
  const id = location.search && location.search.split("=")[1];
  const keyword = window.location.pathname.split("/")[2];
  const [category, setCategory] = React.useState(id ? id : "");

  console.log(keyword);
  React.useEffect(() => {
    dispatch(listSingleCategory(id));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (sort || isBest || isFeatured || maxPrice || minPrice || keyword) {
      setIsFiltered(true);
    }
    dispatch(
      listProduct({
        category,
        sort,
        isBest,
        isFeatured,
        maxPrice,
        minPrice,
        selectedValue,
        keyword,
      })
    );
  }, [
    dispatch,
    category,
    sort,
    isBest,
    isFeatured,
    maxPrice,
    minPrice,
    selectedValue,
    keyword,
  ]);

  const singleCategory = useSelector((state) => state.singleCategory);
  const { categoryyy } = singleCategory;
  const cate = categoryyy?.categoryList;
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  console.log(products);
  const random1 = Math.floor(Math.random() * products?.products?.length);
  const random2 = Math.floor(Math.random() * products?.products?.length);
  // const categoryList=useSelector((state)=>state.categoryList)
  // const {categoryy}=categoryList
  // const cate=categoryy?.categoryList
  const newPathh = window.location.pathname.split("/")[2];
  console.log(newPathh);

  const pageHandler = (page) => {
    dispatch(
      listProduct({
        category,
        sort,
        isBest,
        isFeatured,
        maxPrice,
        minPrice,
        selectedValue,
        page,
      })
    );
  };
  const handleClear = () => {
    setIsBest(false);
    setMaxPrice("");
    setMinPrice("");
    setSort("");
    setIsFeatured();
    // setCategory('')
    setActiveCategory(null);
    setIsFiltered(false);
    dispatch(listProduct({ category }));
    const newPath = window.location.pathname.split("/").slice(0, -1);
    console.log(newPath);
    const updatedPathname = newPath.join("/");
    if (window.location.pathname.split("/")[2]) {
      navigate(updatedPathname);
    }
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
      <BreadCrumb title="Our Store" />

      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3 none">
              <div className="filter-card">
                <h3 className="filter-title">Shop by Categories</h3>
                <div>
                  {cate?.map((category) => (
                    <Category
                      key={category._id}
                      category={category}
                      activeCategory={activeCategory}
                      setActiveCategory={setActiveCategory}
                      setCategory={setCategory}
                      openCat={openCat}
                      setOpenCat={setOpenCat}
                    />
                  ))}
                </div>
              </div>
              <div className="filter-card">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availabilty</h5>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onChange={(e) => setIsBest(e.target.checked)}
                      checked={isBest}
                      id=""
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      BestSelling
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      checked={isFeatured}
                      id=""
                    />
                    <label class="form-check-label" for="flexCheckChecked">
                      Featured Products
                    </label>
                  </div>
                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div class="form-floating mb-3">
                      <input
                        type="number"
                        min={0}
                        class="form-control"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">From</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="number"
                        min={0}
                        class="form-control"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        id="floatingInput"
                        placeholder="$"
                      />
                      <label for="floatingInput">To</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-card">
                <h3 className="filter-title">Random Product</h3>
                <div>
                  <div className="d-flex flex-column">
                    {products?.products?.length && (
                      <div className="random-products d-flex mt-3 gap-3 mb-3">
                        <div className="w-50">
                          <img
                            src={products?.products?.[random1]?.image[0].img}
                            className="img-fluid"
                          />
                        </div>
                        <div className="w-50">
                          <Link
                            to={`/productDetail/${products?.products?.[random1]?._id}`}
                          >
                            <b>{products?.products?.[random1]?.name}</b>
                          </Link>
                          <ReactStars
                            count={5}
                            size={16}
                            value={products?.products?.[random1]?.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {products?.products?.[random1]?.rating == 0 && (
                            <span>(No rating)</span>
                          )}
                          <p className="price">
                            ${products?.products?.[random1]?.price}
                          </p>
                        </div>
                      </div>
                    )}
                    {products?.products?.length && (
                      <div className="random-products d-flex gap-3 mt-3 mb-3">
                        <div className="w-50">
                          <img
                            src={products?.products?.[random2]?.image[0].img}
                            className="img-fluid"
                          />
                        </div>
                        <div className="w-50">
                          <Link
                            to={`/productDetail/${products?.products?.[random1]?._id}`}
                          >
                            <b>{products?.products?.[random2]?.name}</b>
                          </Link>
                          <ReactStars
                            count={5}
                            size={16}
                            value={products?.products?.[random2]?.rating}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          {products?.products?.[random2]?.rating === 0 && (
                            <span>(No rating)</span>
                          )}
                          <p className="price">
                            ${products?.products?.[random2]?.price}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9 act">
              <div className="filter-sort-grid">
                <div className="grid">
                  <div className="you d-flex align-items-center gap-10 sort">
                    <h4 className="mb-0 " style={{ width: "100px" }}>
                      Sort By
                    </h4>
                    <select
                      class="form-control form-select"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="name">Alphabetical, A-Z</option>
                      <option value="-name">Alphabetical, Z-A</option>
                      <option value="price">Price, low to high</option>
                      <option value="-price">Price, high to low</option>
                    </select>
                  </div>
                  <div className="d-flex gridd d-none d-sm-flex align-items-center gap-10">
                    <div className="store-total">
                      {isFiltered && (
                        <button
                          className="total-products mb-0"
                          onClick={handleClear}
                        >
                          Clear Filters
                        </button>
                      )}
                      <p className="total-products mb-0">
                        {products?.products?.length} Products
                      </p>
                    </div>
                    <div className="d-flex gap-10 alighn-items-center">
                      <img
                        src="/images/grid.svg"
                        className="d-block img-fluid"
                        onClick={() => setGrid(3)}
                      />
                      <img
                        src="/images/grid3.svg"
                        className="d-block img-fluid"
                        onClick={() => setGrid(2)}
                      />
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
              <div className="subsections">
                <div className="sub-sections d-flex gap-10 flex-wrap justify-content-beetwen align-items-center">
                  <div class="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle d-flex gap-55 align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaListAlt />
                      <span>Categories</span>
                    </button>
                    <div class="dropdown-menu">
                      <div className="filter-card">
                        <h3 className="filter-title">Shop by Categories</h3>
                        <div>
                          <ul className="ps-0">
                            <li>
                              {cate?.map((category) => (
                                <Category
                                  key={category._id}
                                  category={category}
                                  activeCategory={activeCategory}
                                  setActiveCategory={setActiveCategory}
                                  setCategory={setCategory}
                                  openCat={openCat}
                                  setOpenCat={setOpenCat}
                                />
                              ))}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle d-flex gap-55 align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaFilter />
                      <span>Filter By</span>
                    </button>
                    <div class="dropdown-menu">
                      <div className="filter-card">
                        <h3 className="filter-title">Filter By</h3>
                        <div>
                          <h5 className="sub-title">Availabilty</h5>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              onChange={(e) => setIsBest(e.target.checked)}
                              checked={isBest}
                              id=""
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              BestSelling
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              onChange={(e) => setIsFeatured(e.target.checked)}
                              checked={isFeatured}
                              id=""
                            />
                            <label
                              class="form-check-label"
                              for="flexCheckChecked"
                            >
                              Featured Products
                            </label>
                          </div>
                          <h5 className="sub-title">Price</h5>
                          <div className="d-flex align-items-center gap-10">
                            <div class="form-floating mb-3">
                              <input
                                type="number"
                                min={0}
                                class="form-control"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                id="floatingInput"
                                placeholder="name@example.com"
                              />
                              <label for="floatingInput">From</label>
                            </div>
                            <div class="form-floating mb-3">
                              <input
                                type="number"
                                min={0}
                                class="form-control"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                id="floatingInput"
                                placeholder="$"
                              />
                              <label for="floatingInput">To</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="store-total">
                    {isFiltered && (
                      <button
                        className="total-products mb-0"
                        onClick={handleClear}
                      >
                        Clear Filters
                      </button>
                    )}
                    <p className="total-products mb-0">
                      {products?.products?.length} Products
                    </p>
                  </div>
                </div>
              </div>
              <div className="products-list-grid pb-1 mt-3">
                <div className="row bb">
                  {loading && <Loading />}
                  {error && <Message variant="danger">{error}</Message>}
                  {products?.products?.length !== 0 ? (
                    products?.products?.map((product) => {
                      return (
                        <ProductCard
                          grid={grid}
                          product={product}
                          products={products?.products}
                        />
                      );
                    })
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        textAlign: "center",
                        // padding: "100px",
                      }}
                    >
                      <h2
                        className="danger"
                        style={{
                          padding: "30px",
                          borderRadius: "5px",
                        }}
                      >
                        Out of Stock
                      </h2>
                    </div>
                  )}
                </div>
              </div>
              {products?.pages > 1 && (
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    {[...Array(products?.pages).keys()].map((x) => {
                      console.log(x + 1 + 1);
                      const isActivePage = x + 1 === products?.page;
                      return (
                        <li className="page-item" key={x + 1}>
                          <a
                            className={`page-link ${
                              x + 1 === products?.page ? "activePage" : ""
                            }`}
                            onClick={(e) => {
                              window.scrollTo(0, 0);
                              if (isActivePage) e.preventDefault();
                              else pageHandler(Number(e.target.innerHTML));
                            }}
                          >
                            {x + 1}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
