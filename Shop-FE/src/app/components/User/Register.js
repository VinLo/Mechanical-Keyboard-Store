import React, { Fragment, useEffect } from "react";
import "./Register.css";
import Loader from "../layout/loader/Loader";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";

const Register = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, password, email } = user;

  const [avatarPreview, setAvatarPreview] = useState("/User.png");
  const [avatar, setAvatar] = useState("/User.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      alert.success("Đăng ký thành công bạn đã gia nhập với chúng tôi");
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, redirect, isAuthenticated]);
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
                  <p>REGISTER TO START A NEW JOURNEY</p>
                </div>
              </div>
              <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="avatarReview"
                />

                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <input
                    type="file"
                    placeholder="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
                <span className="nonAccount">
                  Already have an account? Sign In <a href="/login">here</a>
                </span>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </Fragment>
  );
};
export default Register;
