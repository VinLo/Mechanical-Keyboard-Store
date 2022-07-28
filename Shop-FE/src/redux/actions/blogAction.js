import axios from "axios";

import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  ADMIN_BLOG_REQUEST,
  ADMIN_BLOG_SUCCESS,
  ADMIN_BLOG_FAIL,
  NEW_BLOG_REQUEST,
  NEW_BLOG_SUCCESS,
  NEW_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/blogConstants";

// Get All Blogs
export const getBlog =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_BLOG_REQUEST });
      let link = `/api/v1/blogs?page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_BLOG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BLOG_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All BLogs For Admin
export const getAdminBlog = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BLOG_REQUEST });

    const { data } = await axios.get("/api/v1/admin/blogs");

    dispatch({
      type: ADMIN_BLOG_SUCCESS,
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Blog
export const createBlog = (blogData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BLOG_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/blog/new`,
      blogData,
      config
    );

    dispatch({
      type: NEW_BLOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Blog
export const updateBlog = (id, blogData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BLOG_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/blog/${id}`,
      blogData,
      config
    );

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BLOG_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/blog/${id}`);

    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Blogs Details
export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/blog/${id}`);

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
