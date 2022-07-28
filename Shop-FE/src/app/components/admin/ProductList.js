import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../../redux/actions/productAction";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { DELETE_PRODUCT_RESET } from "../../../redux/constants/productConstants";
import { TablePagination, TableSortLabel } from "@mui/material";
const ProductList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);

  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //Search
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

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
  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const recordsAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(products),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  // Sort
  const [order, setOrder] = useState(0);
  const [orderBy, setOrderBy] = useState();
  const handleSortRequest = (e) => {
    const isAsc = orderBy === e && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(e);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  // Table header
  const headerCells = [
    {
      id: "_id",
      label: "Mã sản Phẩm",
    },
    {
      id: "name",
      label: "Tên sản phẩm",
    },
    {
      id: "images",
      label: "Hình sản phẩm",
    },
    {
      id: "Stock",
      label: "Số lượng",
    },
    {
      id: "price",
      label: "Giá",
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
    },
    {
      id: "Stock",
      label: "Trạng thái",
    },
    {
      id: "action",
      label: "Hành động",
    },
  ];

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Xóa sản phẩm thành công");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />
      <SideBar />

      <div className="main-content">
        <div className="main-content-header">
          <div className="search-wrapper">
            <span className="fas fa-search"></span>
            <input type="search" onChange={handleSearch} placeholder="Search" />
          </div>
          <div className="social-icons">
            <span className="far fa-bell"></span>
            <span className="far fa-comment"></span>
            <div></div>
          </div>
        </div>
        <div className="main-content-dashboard">
          <section className="recent">
            <div className="table-grid">
              <div className="table-card">
                <h3 id="productListHeading">Danh sách sản phẩm</h3>
                <Link to="/admin/product" className="link-add">
                  <Button className="action-btn-add">
                    <AddIcon /> Thêm sản phẩm
                  </Button>
                </Link>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {headerCells.map((headerCell) => (
                          <TableCell
                            key={headerCell.id}
                            sortDirection={
                              orderBy === headerCell.id ? order : false
                            }
                          >
                            <TableSortLabel
                              active={orderBy === headerCell.id}
                              direction={
                                orderBy === headerCell.id ? order : "asc"
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
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row._id}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell className="td-img">
                            <img src={row.images[0].url}></img>
                          </TableCell>
                          <TableCell>{row.Stock}</TableCell>
                          <TableCell>{`${numberWithCommas(
                            row.price
                          )}`}</TableCell>
                          <TableCell>
                            {String(row.createdAt).substr(0, 10)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={
                                row.Stock < 1
                                  ? "badge warning"
                                  : "badge success"
                              }
                            >
                              {row.Stock < 1 ? "Hết hàng" : "Còn hàng"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              className="action-btn-edit"
                              href={`/admin/product/${row._id}`}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              className="action-btn-delete"
                              onClick={(e) => {
                                e.preventDefault();
                                deleteProductHandler(row._id);
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
                      count={products.length}
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

export default ProductList;
