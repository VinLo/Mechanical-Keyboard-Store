import React, { Fragment, useState } from "react";
import "./UserOption.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { Backdrop } from "@mui/material";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const UserOptions = ({ user, href }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    {
      icon: <PersonIcon />,
      name: "Profile",
      href: "/account",
    },
    { icon: <ListAltIcon />, name: "Orders", href: "/orders" },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      href: "/cart",
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      href: "/admin/dashboard",
    });
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11", marginTop: "2%" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            href={item.href}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
