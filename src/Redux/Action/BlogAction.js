import axios from "axios";
import {
  BLOG_DETAIL_FAIL,
  BLOG_DETAIL_REQUEST,
  BLOG_DETAIL_SUCCESS,
  BLOG_DISLIKE_FAIL,
  BLOG_DISLIKE_REQUEST,
  BLOG_DISLIKE_SUCCESS,
  BLOG_LIKE_FAIL,
  BLOG_LIKE_REQUEST,
  BLOG_LIKE_SUCCESS,
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
} from "../Constants/BlogConstants";
import { BLOG_LIST_FAIL } from "./../Constants/BlogConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

export const listBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });
    const { data } = await api.get(`/api/blogs`);
    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAIL_REQUEST });
    const { data } = await api.get(`/api/blogs/${id}`);
    dispatch({ type: BLOG_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likeBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_LIKE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.put(`/api/blogs/like/${id}`, config);
    dispatch({ type: BLOG_LIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const dislikeBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DISLIKE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await api.put(`/api/blogs/dislike/${id}`, config);
    dispatch({ type: BLOG_DISLIKE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BLOG_DISLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
