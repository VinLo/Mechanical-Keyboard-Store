import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productReviews.css";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";

import SideBar from "./Sidebar";
import { DELETE_REVIEW_RESET } from "../../../redux/constants/productConstants";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ProductReviews = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa bình luận thành công");
      history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted, productId]);

  // Table header
  const headerCells = [
    {
      id: "_id",
      label: "Mã",
    },
    {
      id: "user",
      label: "Tên người dùng",
    },
    {
      id: "comment",
      label: "Nội dung",
    },
    {
      id: "ratting",
      label: "Đánh giá",
    },
    {
      id: "action",
      label: "Hành động",
    },
  ];

  return (
    <Fragment>
      <MetaData title={`Danh sách đánh giá - Admin`} />
      <SideBar />
      <div className="main-content">
        <div className="main-content-dashboard">
          <section className="recent">
            <div className="table-grid">
              <div className="table-card">
                <form
                  className="productReviewsForm"
                  onSubmit={productReviewsSubmitHandler}
                >
                  <h3>Danh sách bình luận</h3>

                  <div>
                    <Star />
                    <input
                      type="text"
                      placeholder="Product Id"
                      required
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || productId === "" ? true : false
                    }
                  >
                    Tìm kiếm
                  </Button>
                </form>

                {reviews && reviews.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          {headerCells.map((headerCell) => (
                            <TableCell key={headerCell.id}>
                              {headerCell.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reviews.map((row) => (
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
                            <TableCell>{row.comment}</TableCell>
                            <TableCell>{row.rating}</TableCell>
                            <TableCell>
                              <Button
                                className="action-btn-delete"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteReviewHandler(row._id);
                                }}
                              >
                                <DeleteIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <h1 className="productReviewsFormHeading">
                    Không có bình luận hiện tại
                  </h1>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
