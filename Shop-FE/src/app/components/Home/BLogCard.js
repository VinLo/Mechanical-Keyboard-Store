import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";
const BlogCard = ({ blog }) => {
  const clickclick = (e) => {
    // console.log(e);
    return (window.location = `/blog/${e}`);
  };
  return (
    <React.Fragment>
      <div class="card">
        <div class="card-image">
          <img src={blog.images[0].url} alt={blog.name} />
        </div>
        <div class="card-meta">
          <div class="card-top">
            <span class="date">{String(blog.createdAt).substr(0, 10)}</span>
          </div>
          <h2 class="card-title">{blog.name}</h2>
          <div class="card-desc">{blog.info}</div>
          <div class="card-bottom">
            <button onClick={() => clickclick(blog._id)} class="readmore">
              Read more →
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogCard;
