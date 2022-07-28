import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <React.Fragment>
      <input type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="product">
            <span className="ti-unlink"></span>
            <span>Trang quản trị</span>
          </h3>
          <label for="sidebar-toggle" className="fas fa-bars"></label>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <span className="fas fa-home "></span>
                <span>Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users">
                <span className="fas fa-user"></span>
                <span>Quản lý người dùng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/blogs">
                <span className="fa fa-book"></span>
                <span>Bài viết</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <span className="fas fa-dolly-flatbed "></span>
                <span>Quản lý sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <span className="fas fa-shipping-fast "></span>
                <span>Quản lý đơn đặt hàng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/reviews">
                <span className="fas fa-comment "></span>
                <span>Quản lý bình luận</span>
              </Link>
            </li>
            {/* <li>
              <a href="">
                <span className="ti-time"></span>
                <span>Timesheet</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="ti-book"></span>
                <span>Contacts</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
