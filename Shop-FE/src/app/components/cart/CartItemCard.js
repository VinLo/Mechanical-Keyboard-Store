import React from "react";
import { ImGift } from "react-icons/im";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price} VND`}</span>

        <p onClick={() => deleteCartItems(item.product)}>
          <svg
            aria-hidden="true"
            focusable="false"
            role="presentation"
            class="feather-x"
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
          Xóa
        </p>
      </div>
    </div>
  );
};

export default CartItemCard;
