import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./BlogDetails.css";
import "../ReviewCard/ReviewCard.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getBlogDetails } from "../../../redux/actions/blogAction";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReactHtmlParser from "react-html-parser";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import Headers from "../layout/header/Headers.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../layout/footer/Footer.js";
import MetaData from "../layout/MetaData";
import { useState } from "react";

const BlogDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { blog, loading, error } = useSelector((state) => state.blogDetails);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getBlogDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Headers />
          <MetaData title={`${blog.name}`} />
          <section className="page-width">
            <h1 className="title">{blog.name}</h1>
            <span className="small-title">
              Ngày viết bài: {String(blog.createdAt).substr(0, 10)}
            </span>
            <div className="rte">{ReactHtmlParser(blog.description)}</div>
          </section>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogDetails;
