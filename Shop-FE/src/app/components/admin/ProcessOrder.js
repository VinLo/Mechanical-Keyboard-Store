import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import SideBar from "./Sidebar";
import { clearErrors, updateOrder } from "../../../redux/actions/orderAction";
import { getOrderDetails } from "../../../redux/actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../../redux/constants/orderConstants";
import "./processOrder.css";
import "../cart/ConfirmOrder.css";
import "./NewProduct.css";
import "../Order/OrderDetails.css";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Trạng thái đơn hàng đã được cập nhật");
      history.push("/admin/orders");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Thông tin đơn hàng - admin" />
      <SideBar />
      <div className="main-content">
        {loading ? (
          <Loader />
        ) : (
          <div className="main-content-dashboard">
            <section className="recent">
              <div className="table-grid">
                <div className="table-card">
                  <h3 id="productListHeading">Thông tin đơn hàng</h3>
                  <div
                    className="confirmOrderPage"
                    style={{
                      display:
                        order.orderStatus === "Đã giao" ? "block" : "grid",
                    }}
                  >
                    <div>
                      <div className="confirmshippingArea">
                        <div className="orderDetailsContainerBox">
                          <div>
                            <p>Tên:</p>
                            <span>{order.user && order.user.name}</span>
                          </div>
                          <div>
                            <p>Email:</p>
                            <span>{order.user && order.user.email}</span>
                          </div>
                          <div>
                            <p>Số điện thoại:</p>
                            <span>
                              {order.shippingInfo && order.shippingInfo.phoneNo}
                            </span>
                          </div>
                          <div>
                            <p>Địa chỉ:</p>
                            <span>
                              {order.shippingInfo &&
                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                            </span>
                          </div>
                        </div>
                        <h3>Thanh toán</h3>
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
                                ? "Đã Thanh Toán"
                                : "NOT PAID"}
                            </p>
                          </div>

                          <div>
                            <p>Phí ship:</p>
                            <span>{order.taxPrice} VND</span>
                            <p>Tổng cộng:</p>
                            <span>
                              {order.totalPrice && order.totalPrice} VND
                            </span>
                          </div>
                        </div>
                        <h3>Tình Trạng Đơn Hàng</h3>
                        <div className="orderDetailsContainerBox">
                          <div>
                            <p
                              className={
                                order.orderStatus &&
                                order.orderStatus === "Đã giao"
                                  ? "greenColor"
                                  : "redColor"
                              }
                            >
                              {order.orderStatus && order.orderStatus}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="confirmCartItems">
                        <h3>Thông tin đơn hàng:</h3>
                        <div className="confirmCartItemsContainer">
                          {order.orderItems &&
                            order.orderItems.map((item) => (
                              <div key={item.product}>
                                <img src={item.image} alt="Product" />
                                <Link to={`/product/${item.product}`}>
                                  {item.name}
                                </Link>{" "}
                                <span>
                                  {item.quantity} X {item.price} =
                                  <b>{item.price * item.quantity}VNĐ</b>
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    {/*  */}
                    <div
                      style={{
                        display:
                          order.orderStatus === "Đã giao" ? "none" : "block",
                      }}
                    >
                      <form
                        className="updateOrderForm"
                        onSubmit={updateOrderSubmitHandler}
                      >
                        <h3>Cập nhật tình trạng đơn hàng</h3>

                        <div>
                          <SettingsOutlinedIcon />
                          <select onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Chọn</option>
                            {order.orderStatus === "Đang xử lý" && (
                              <option value="Đang giao">Đang giao</option>
                            )}

                            {order.orderStatus === "Đang giao" && (
                              <option value="Đã giao">Đã giao</option>
                            )}
                          </select>
                        </div>
                        <div>
                          <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                              loading
                                ? true
                                : false || status === ""
                                ? true
                                : false
                            }
                          >
                            Cập nhật
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
