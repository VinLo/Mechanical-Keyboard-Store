import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../../redux/actions/productAction";
import { getAllOrders } from "../../../redux/actions/orderAction";
import { getAllUsers } from "../../../redux/actions/userAction";
import MetaData from "../layout/MetaData";
const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TỔNG THU NHẬP",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      {/* <div className="dashboardContainers">
        <Typography component="h1">Cập nhật thông</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Tổng thu nhập <br /> {totalAmount} VND
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Sản phẩm</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Đơn hàng</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div> */}
      <div className="main-content">
        <div className="main-content-header">
          <div className="search-wrapper">
            <span className="fas fa-search"></span>
            <input type="search" placeholder="Search" />
          </div>
          <div className="social-icons">
            <span className="far fa-bell"></span>
            <span className="far fa-comment"></span>
            <div></div>
          </div>
        </div>
        <div className="main-content-dashboard">
          <h2 className="dashboard-title">Overview</h2>
          <div className="dashboard-cards">
            <div className="card-single">
              <div className="card-body">
                <span className="fas fa-coins"></span>
                <div>
                  <h5>Lợi nhuận</h5>
                  <h4>
                    {totalAmount
                      .toFixed(3)
                      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")}
                    đ
                  </h4>
                </div>
              </div>
              <div className="card-footer">
                <a href="/admin/chart">Xem tất cả</a>
              </div>
            </div>
            <div className="card-single">
              <div className="card-body">
                <span class="fas fa-shipping-fast"></span>
                <div>
                  <h5>Đơn hàng</h5>
                  <h4>{orders && orders.length}</h4>
                </div>
              </div>
              <div className="card-footer">
                <a href="/admin/orders">Xem tất cả</a>
              </div>
            </div>
            <div className="card-single">
              <div className="card-body">
                <span class="fas fa-user"></span>
                <div>
                  <h5>Xem tất cả</h5>
                  <h4>{users && users.length}</h4>
                </div>
              </div>
              <div className="card-footer">
                <a href="/admin/users">View all</a>
              </div>
            </div>
          </div>
          {/* <div>
            <Line className="lineChart" data={lineState} />
          </div>

          <div style={{ width: "30vmax", margin: "auto" }}>
            <Doughnut className="donutChart" data={doughnutState} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
