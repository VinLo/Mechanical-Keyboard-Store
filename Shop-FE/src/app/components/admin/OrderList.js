import React, { Fragment, useEffect, useState } from "react";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

// Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, TableSortLabel } from "@mui/material";

import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../../redux/actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../redux/constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Đơn hàng được xóa thành công");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  //Pagenation
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Pagenation and sort
  const getComparator = (orderSort, orderSortBy) => {
    return orderSort === "desc"
      ? (a, b) => descendingComparator(a, b, orderSortBy)
      : (a, b) => -descendingComparator(a, b, orderSortBy);
  };
  const recordsAfterPagingAndSorting = () => {
    return stableSort(orders, getComparator(orderSort, orderSortBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  // Sort
  const [orderSort, setOrderSort] = useState(0);
  const [orderSortBy, setOrderSortBy] = useState();
  const handleSortRequest = (e) => {
    const isAsc = orderSortBy === e && orderSort === "asc";
    setOrderSort(isAsc ? "desc" : "asc");
    setOrderSortBy(e);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const orderSort = comparator(a[0], b[0]);
      if (orderSort !== 0) return orderSort;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderSortBy) => {
    if (b[orderSortBy] < a[orderSortBy]) {
      return -1;
    }
    if (b[orderSortBy] > a[orderSortBy]) {
      return 1;
    }
    return 0;
  };

  const headerCells = [
    {
      id: "_id",
      label: "Mã đơn hàng",
    },
    {
      id: "orderItems",
      label: "Số lượng",
    },
    {
      id: "totalPrice",
      label: "Thành tiền",
    },

    {
      id: "createdAt",
      label: "Ngày tạo",
    },
    {
      id: "orderStatus",
      label: "Trạng thái đơn hàng",
    },
    {
      id: "action",
      label: "Hành động",
    },
  ];

  return (
    <Fragment>
      <MetaData title={`Danh sách đơn hàng - Admin`} />

      <SideBar />

      <div className="main-content">
        <div className="main-content-dashboard">
          <section className="recent">
            <div className="table-grid">
              <div className="table-card">
                <h3 id="productListHeading">Danh sách đơn hàng</h3>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {headerCells.map((headerCell) => (
                          <TableCell
                            key={headerCell.id}
                            sortDirection={
                              orderSortBy === headerCell.id ? orderSort : false
                            }
                          >
                            <TableSortLabel
                              active={orderSortBy === headerCell.id}
                              direction={
                                orderSortBy === headerCell.id
                                  ? orderSort
                                  : "asc"
                              }
                              onClick={() => {
                                handleSortRequest(headerCell.id);
                              }}
                            >
                              {headerCell.label}
                            </TableSortLabel>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recordsAfterPagingAndSorting().map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell>{row.orderItems.length}</TableCell>
                          <TableCell>{`${numberWithCommas(
                            row.totalPrice
                          )}`}</TableCell>
                          <TableCell>
                            {String(row.createdAt).substr(0, 10)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={
                                row.orderStatus !== "Đang xử lý" &&
                                row.orderStatus !== "Đang giao"
                                  ? "badge success"
                                  : "badge warning"
                              }
                            >
                              {row.orderStatus}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              className="action-btn-edit"
                              href={`/admin/order/${row._id}`}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              className="action-btn-delete"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteOrderHandler(row._id);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TablePagination
                      rowsPerPageOptions={pages}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      count={orders.length}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Table>
                </TableContainer>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
