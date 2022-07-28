import React, { useReducer } from "react";
import { useAlert } from "react-alert";
import logo from "../../../images/logo.png";
import "./Headers.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions/userAction";

const Headers = ({ history, product }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");

  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setKeyword(searchWord);
    const newFilter = product.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setKeyword("");
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/");
    }
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  function logoutUser() {
    dispatch(logout());
  }

  // return <ReactNavbar {...option} />;
  return (
    <div className="header">
      <a href="/">
        <img
          src="https://i.pinimg.com/564x/b7/00/d6/b700d63024b11f11e0aab3f112d36dd5.jpg"
          className="header_logo"
        />
      </a>
      <form className="header_search" onSubmit={searchSubmitHandler}>
        <div className="header_searchInput_wrap">
          <input
            className="header_searchInput"
            type="text"
            placeholder="Tìm kiếm sản phẩm ..."
            value={keyword}
            onChange={handleFilter}
          />
          <div class="header_searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="dataSearch">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a
                  className="dataItem"
                  href={`/product/${value._id}`}
                  target="_blank"
                >
                  <img
                    style={{ width: "20%" }}
                    src={value.images[0].url}
                    alt={product.name}
                  />
                  <p>{value.name}</p>
                </a>
              );
            })}
          </div>
        )}
      </form>
      <div className="header_nav">
        <div className="header_option">
          <span className="header_optionLineOne">Hello</span>
          <a
            href={isAuthenticated != true ? "/login" : "/account"}
            className="header_optionLineTwo"
          >
            {isAuthenticated != true ? (
              "Sign In"
            ) : (
              <div style={{ display: "flex", justifyItems: "center" }}>
                <img
                  style={{ width: "20px", borderRadius: "80%" }}
                  src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                  alt="Profile"
                />
                {user.name}
                <ul className="header_navbar-user-menu">
                  <li className="header_navbar-user-item">
                    <a href="/account">Tài khoản của tôi</a>
                  </li>
                  <li className="header_navbar-user-item">
                    <a
                      href="/cart"
                      style={{ color: "red" }}
                    >{`Giỏ hàng (${cartItems.length})`}</a>
                  </li>
                  {user.role === "admin" ? (
                    <li className="header_navbar-user-item">
                      <a href="/admin/dashboard">Dashboard Adimin</a>
                    </li>
                  ) : null}
                  <li className="header_navbar-user-item">
                    <a href="" onClick={logoutUser}>
                      Đăng Xuất
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </a>
        </div>
        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <a href="/orders" className="header_optionLineTwo">
            & Order
          </a>
        </div>
        {/* <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div> */}
        <div className="header_optionBasket">
          <i class="fas fa-shopping-basket"></i>
          <span className="header_optionLineTwo header_basketCount">
            {cartItems.length}
          </span>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Headers);
