import React, { Fragment, useEffect } from "react";
import "./MyOrders.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../../redux/actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";
import Headers from "../layout/header/Headers";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Mã đơn hàng",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Tình trạng đơn hàng",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "redColor"
          : "greenColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Thanh toán",
      type: "number",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Thông tin",
      type: "number",
      minWidth: 140,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <Headers />
      <MetaData title={`${user.name} - Đơn hàng`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">
            Người đặt hàng: {user.name}
          </Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
