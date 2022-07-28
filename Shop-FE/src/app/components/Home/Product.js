import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { Rating } from "@material-ui/lab";

const Product = ({ product }) => {
  const option = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Link className="product__products" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p className="product__name">{product.name}</p>
      <div className="product_products_cardspan">
        <Rating {...option} /> {""}
        <span className="product_products_review">
          {""}({product.numOfReviews} Đánh giá)
        </span>
      </div>
      <span className="product_products_price">{`${numberWithCommas(
        product.price
      )}VND`}</span>
    </Link>
  );
};
export default Product;
