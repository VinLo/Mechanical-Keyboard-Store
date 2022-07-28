import React, { Fragment, useEffect } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/loader/Loader";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../redux/actions/userAction";
import { loadUser } from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../../redux/constants/userConstants";
import MetaData from "../layout/MetaData";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  console.log(message);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Quên mật khẩu" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordUpBox">
              <div className="forgotPasswordTitle">
                <p className="forgotPasswordHeading">Quên mật khẩu</p>
              </div>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Gửi"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
