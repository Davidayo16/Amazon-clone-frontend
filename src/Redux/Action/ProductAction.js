import axios from "axios";
import { logout } from "./UserAction";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_FEATURED_REQUEST,
  PRODUCT_FEATURED_SUCCESS,
  PRODUCT_FEATURED_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_WISHLIST_REQUEST,
  PRODUCT_WISHLIST_SUCCESS,
  PRODUCT_WISHLIST_FAIL,
  PRODUCT_BEST_REQUEST,
  PRODUCT_BEST_SUCCESS,
  PRODUCT_BEST_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_RELATED_REQUEST,
  PRODUCT_RELATED_FAIL,
  PRODUCT_RELATED_SUCCESS,
} from "./../Constants/ProductConstants";
import { PRODUCT_CATEGORY_FAIL } from "./../Constants/CategoryConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});
console.log(api);

export const listProduct =
  ({ category, sort, isBest, maxPrice, minPrice, page, keyword }) =>
  async (dispatch) => {
    console.log(keyword);
    let url = `/api/products`;

    if (category) {
      url += `?category=${category}`;
    }

    if (sort) {
      url += `${category ? "&" : "?"}sort=${sort}`;
    }

    if (isBest) {
      url += `${category || sort ? "&" : "?"}isBest=${isBest}`;
    }
    if (minPrice && maxPrice) {
      url += `${
        category || isBest || sort ? "&" : "?"
      }price[gt]=${minPrice}&price[lt]=${maxPrice}`;
    }
    if (page) {
      url += `${
        category || isBest || sort || (minPrice && maxPrice) ? "&" : "?"
      }page=${page}`;
    }
    if (keyword) {
      url += `${
        category || isBest || sort || (minPrice && maxPrice) || page ? "&" : "?"
      }keyword=${keyword}`;
    }

    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await api.get(url);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listFeaturedProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_FEATURED_REQUEST });
    const { data } = await api.get(`/api/products/featured`);
    dispatch({ type: PRODUCT_FEATURED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_FEATURED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listRelatedProduct = (catId) => async (dispatch) => {
  console.log(catId);
  try {
    dispatch({ type: PRODUCT_RELATED_REQUEST });
    const { data } = await api.get(`/api/products/related?catId=${catId}`);
    dispatch({ type: PRODUCT_RELATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_RELATED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const bestSellersProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_BEST_REQUEST });
    const { data } = await api.get(`/api/products/best`);
    dispatch({ type: PRODUCT_BEST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_BEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await api.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const addToWishlist = (prodId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_WISHLIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.put(`/api/products/wishlist`, prodId, config);
    console.log(data);
    dispatch({ type: PRODUCT_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview =
  (id, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.post(
        `/api/products/${id}/review`,
        review,
        config
      );
      console.log(data);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not Authorized, token failed") {
        dispatch(logout());
      }
      if (message === "Not Authorized, no token") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };
