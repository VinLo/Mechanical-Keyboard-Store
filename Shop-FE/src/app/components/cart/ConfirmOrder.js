import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Headers from "../layout/header/Headers";
const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  function checkBoxConfirmClick(e) {
    if (!window.confirm("Bạn chắc chứ?")) {
      e.preventDefault();
    }
  }
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const shippingCharges = subtotal > 500000 ? 0 : 50000;
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  return (
    <Fragment>
      <Headers />
      <MetaData title="Xác nhận đơn đặt hàng" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Xác nhận đơn hàng</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Tên: </p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại: </p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ: </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Sản phẩm đặt hàng</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    {""}
                    <span>
                      {item.quantity} X {item.price} VND ={" "}
                      <b>{item.price * item.quantity} VND</b>
                    </span>
                  </div>
                ))}
            </div>
            <div className="orderSummary">
              <Typography>Hóa Đơn</Typography>
              <div>
                <div>
                  <p>Tổng giá:</p>
                  <span>{subtotal}VND</span>
                </div>
                <div>
                  <p>Phí giao hàng:</p>
                  <span>{shippingCharges}VND</span>
                </div>
                <div>
                  <p>Thuế:</p>
                  <span>{tax}VND</span>
                </div>
              </div>

              <div className="orderSummaryTotal">
                <p>
                  <b>Tổng cộng:</b>
                </p>
                <span>{`${numberWithCommas(totalPrice)}`}VND</span>
              </div>
              <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="paypal"
                  onChange={checkBoxConfirmClick}
                />
                <label class="custom-control-label" for="paypal">
                  Paypal
                </label>
                <img
                  class="img_paypal"
                  src="https://becexamguide.com/wp-content/uploads/2020/10/logo-stripe.png"
                  alt=""
                />
              </div>
              {/* <div class="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="cash_on_delivery"
                />
                <label class="custom-control-label" for="cash_on_delivery">
                  Thanh toán khi nhận hàng
                  <img class="ml-15" src="img/core-img/paypal.png" alt="" />
                </label>
              </div> */}
              <button onClick={proceedToPayment}>Bắt đầu thanh toán</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
