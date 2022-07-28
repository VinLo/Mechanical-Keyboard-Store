import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { UPDATE_USER_RESET } from "../../../redux/constants/userConstants";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../../redux/actions/userAction";
import Loader from "../layout/loader/Loader";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật thành công");
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update User" />
      <SideBar />
      <div className="main-content">
        {loading ? (
          <Loader />
        ) : (
          <div className="main-content-dashboard">
            <section className="recent">
              <div className="table-grid">
                <div className="table-card">
                  <h3 id="productListHeading">Sửa người dùng</h3>
                  <form
                    className="createProductForm"
                    style={{ marginTop: "0" }}
                    onSubmit={updateUserSubmitHandler}
                  >
                    <div>
                      <PersonIcon />
                      <input
                        type="text"
                        placeholder="Tên"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <MailOutlineIcon />
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <VerifiedUserIcon />
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">Loại tài khoản</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="submit"
                      disabled={
                        updateLoading
                          ? true
                          : false || role === ""
                          ? true
                          : false
                      }
                    >
                      Cập nhật
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateUser;
