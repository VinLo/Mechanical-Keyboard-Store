import React, { Fragment, useEffect } from "react";
import "./Login.css";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const clickShowPass = (e) => {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Đăng nhập thành công");
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p>ACCOUNT LOGIN</p>
                </div>
              </div>
              <form className="loginForm" onSubmit={loginSubmit}>
                <label className="lable">Email</label>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <label className="lable">Password</label>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    value={loginPassword}
                    id="myInput"
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <lable className="lable">
                  <input
                    type="checkbox"
                    className="checkBoxShow"
                    onClick={clickShowPass}
                  />
                  Show Password
                </lable>

                <Link to="/password/forgot">Forgot Password ? </Link>
                <input type="submit" value="Login" className="loginBtn" />
                <span className="nonAccount">
                  Don't have an account? Join us <a href="/register">here</a>
                </span>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  );
};
export default Login;
