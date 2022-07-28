import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromCart,
} from "../../../redux/actions/cartAction";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import Headers from "../layout/header/Headers";
import Footer from "../layout/footer/Footer";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Fragment>
      <Headers />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>
            <WarningAmberIcon />
            Không có sản phẩm trong giỏ hàng
          </Typography>
          <Link to="/products">Quay về trang sản phẩm</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <h3 className="HeaderPage">Giỏ hàng</h3>
            <div className="cartHeader">
              <p>Sản phẩm</p>
              <p>Số lượng</p>
              <p>Tổng cộng</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`${
                    item.price * item.quantity
                  } VND`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div className="cartGrossProfitBox1">
                <strong>Lưu ý:</strong>
                <p>Tiền Ship sẽ thanh toán khi nhận được hàng</p>
              </div>

              <div className="cartGrossProfitBox">
                <div class="rw-contents" style={{ display: "flex" }}>
                  <div class="rw-left">
                    <img
                      class="rw-route-logo"
                      src="https://cdn.routeapp.io/route-widget/images/RoutePlusGray.svg"
                      alt="Route Logo"
                    />
                  </div>
                  <div class="rw-center">
                    <div class="rw-text-top">
                      Shipping Protection<span class="rw-info">i</span>
                    </div>
                    <div class="rw-text-bottom">from Damage, Loss Theft</div>
                  </div>
                </div>
                <div className="total_pay_box">
                  <p>Số tiền thanh toán</p>
                  <p>{`${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )} VND`}</p>
                </div>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Thanh toán</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Cart;
