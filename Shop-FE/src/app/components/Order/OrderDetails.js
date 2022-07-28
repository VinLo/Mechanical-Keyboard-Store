import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
} from "../../../redux/actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
const OrderDetails = ({ match }) => {
  const { loading, error, order } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Chi tiết đơn hàng" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Đơn hàng #{order && order._id}
              </Typography>
              <Typography>Thông tin chuyến hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên: </p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Sô điện thoại: </p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Địa chỉ: </p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, 
                                        ${order.shippingInfo.city}, 
                                        ${order.shippingInfo.state}, 
                                        ${order.shippingInfo.pinCode}, 
                                        ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              {""}
              <Typography>Thanh toán</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </p>
                </div>

                <div>
                  <p>Tổng tiền:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>
              {""}
              <Typography>Tình trạng đơn hàng</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Đã giao"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Giá trị đơn hàng:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X {item.price} ={" "}
                        <b>{item.price * item.quantity}VND</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
