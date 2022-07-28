import "./ResetPassword.css";
import React, { Fragment, useEffect } from "react";
import Loader from "../layout/loader/Loader";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Cập nhật mật khẩu thành công");

      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Thay đổi mật khẩu" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordUpBox">
              <h2 className="resetPasswordHeading">Cập nhật thông tin</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Cập nhật"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
