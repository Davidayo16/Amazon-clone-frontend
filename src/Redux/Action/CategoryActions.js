import axios from "axios";
import {
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_DESC_REQUEST,
  PRODUCT_CATEGORY_DESC_SUCCESS,
  PRODUCT_CATEGORY_DESC_FAIL,
  SINGLE_CATEGORY_REQUEST,
  SINGLE_CATEGORY_SUCCESS,
  SINGLE_CATEGORY_FAIL,
  SINGLE2_CATEGORY_REQUEST,
  SINGLE2_CATEGORY_SUCCESS,
  SINGLE2_CATEGORY_FAIL,
} from "./../Constants/CategoryConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

export const listCategory = () => async (dispatch) => {
  console.log();
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST });
    const { data } = await api.get(`/api/category/get`);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listSingleCategory = (id) => async (dispatch) => {
  console.log(id);

  try {
    dispatch({ type: SINGLE_CATEGORY_REQUEST });

    const { data } = await api.get(`/api/category/get/${id}`);
    console.log(data);
    dispatch({ type: SINGLE_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listSingleCategory2 = () => async (dispatch) => {
  try {
    dispatch({ type: SINGLE2_CATEGORY_REQUEST });
    const { data } = await api.get(`/api/category/gett`);
    console.log(data);
    dispatch({ type: SINGLE2_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE2_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
