import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./ProductCard.css";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const clickclick = (e) => {
    // console.log(e);
    return (window.location = `/product/${e}`);
  };
  return (
    <React.Fragment>
      {/* {" "}
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
         <p>{product.name}</p>
        {" "}
        <div>
           <Rating {...options} /> //{" "}
          <span className="productCardSpan">
             ({product.numOfReviews} Reviews) //{" "}
          </span>
          {" "}
        </div>
         <span>{`₹${product.price}`}</span>
        {" "}
      </Link> */}

      {/* <div className="card">
        <div className="card_img">
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className="card_title">{product.name}</div>
        <div className="card_price">{`$${product.price}`}</div>
        <div className="card_review">
          <h3>Reviews:</h3>
          <span>{product.numOfReviews}</span>
        </div>
        <div className="card_rating">
          <h3>Rating:</h3>
          <span>
            <Rating {...options} />
          </span>
        </div>
        <div className="card_action">
          <button class="btn" onClick={() => clickclick(product._id)}>
            <span class="price">{`${product.price}Đ`}</span>
            <span class="shopping-cart">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </span>
            <span className="buy">Check It Out</span>
          </button>
        </div>
      </div> */}

      <div className="product_product">
        <div className="product_info">
          <p className="product_title">{product.name}</p>
          <div className="product_rating">
            <Rating {...options} />
          </div>
          <p className="product_price">
            <small></small>
            <span className="product_price_info">{`${numberWithCommas(
              product.price
            )}đ`}</span>
          </p>
        </div>
        <img src={product.images[0].url} alt={product.name} />
        <button onClick={() => clickclick(product._id)}>Xem chi tiết</button>
      </div>
    </React.Fragment>
  );
};

export default ProductCard;
