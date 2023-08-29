import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { sideBarReucer } from "./Reducers/SidebarReducer/SidebarReducer";
import {
  productFeaturedReducer,
  productListReducer,
  productDetailsReducer,
  productWishlistReducer,
  productBestReducer,
  productCreateReviewReducer,
  productRelatedReducer,
} from "./Reducers/ProductReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./Reducers/UserReducers";
import {
  CategoryListReducer,
  CategoryDescendantReducer,
  SingleCategoryListReducer,
  SingleCategoryListReducer2,
} from "./Reducers/CategoruReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { orderCreateReducers } from "./Reducers/OrderReducers.js";
import { orderDetailsReducers } from "./Reducers/OrderReducers.js";
import { orderPayReducers } from "./Reducers/OrderReducers.js";
import { orderlistMyReducers } from "./Reducers/OrderReducers.js";
import {
  blogDetailReducer,
  blogDislikeReducer,
  blogLikeReducer,
  blogListReducer,
} from "./Reducers/BlogReducer";

const reducer = combineReducers({
  setSidebar: sideBarReucer,
  productList: productListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryList: CategoryListReducer,
  singleCategory: SingleCategoryListReducer,
  singleCategory2: SingleCategoryListReducer2,
  featurdProducts: productFeaturedReducer,
  bestSeller: productBestReducer,
  productDetails: productDetailsReducer,
  relatedProducts: productRelatedReducer,
  productReviewCreate: productCreateReviewReducer,
  userWishlist: productWishlistReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  ordersList: orderlistMyReducers,
  blogList: blogListReducer,
  blogDislike: blogDislikeReducer,
  blogLike: blogLikeReducer,
  blogDetails: blogDetailReducer,
});
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const cartItemFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const innitialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};
const Middleware = [thunk];
const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
