import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import "../ReviewCard/ReviewCard.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
} from "../../../redux/actions/productAction";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReactHtmlParser from "react-html-parser";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import Headers from "../layout/header/Headers.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../layout/footer/Footer.js";
import MetaData from "../layout/MetaData";
import { useState } from "react";
import { addItemsToCart } from "../../../redux/actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { newReview } from "../../../redux/actions/productAction";
import { NEW_REVIEW_RESET } from "../../../redux/constants/productConstants";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Thêm vào giỏ hàng thành công");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Gửi đánh giá sản phẩm thành công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  const option = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Headers />
          <MetaData title={`${product.name}`} />
          <div className="container_product_detail">
            <div class="flex items-center product_detail_header">
              <a class="" href="/">
                Shop
              </a>
              <svg
                enable-background="new 0 0 11 11"
                viewBox="0 0 11 11"
                x="0"
                y="0"
              >
                <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path>
              </svg>
              <span class="">{product.category}</span>
              <svg
                enable-background="new 0 0 11 11"
                viewBox="0 0 11 11"
                x="0"
                y="0"
              >
                <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path>
              </svg>
              <span class="">{product.name}</span>
            </div>
            <div className="ProductDetails">
              <div>
                <Carousel>
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
              <div>
                <div className="detailsBlock-1">
                  <h1>{product.name}</h1>
                  {/* <p>Mã sản phẩm #{product._id}</p> */}
                </div>
                <div className="detailsBlock-2">
                  <Rating {...option} className="ratingStart" />
                  <span className="detailsBlock-2-span">
                    (Xem {product.numOfReviews} đánh giá)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <div className="productPriceDetail">
                    <div className="productPriceDetailCurrent">
                      {product.price === 0 ? "Liên hệ" : `${product.price}đ`}
                    </div>
                  </div>
                  <div className="belowProductPriceDetail">
                    <div>
                      <img src="https://salt.tikicdn.com/ts/upload/2e/da/c9/4b9c0150392c753ccb65b2595500e9d6.png" />
                    </div>
                  </div>
                  <p>
                    Trạng thái: {""}
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "Hết Hàng" : "Còn Hàng"}
                    </b>
                  </p>
                  <div className="detailsBlock-3-1">
                    <div className="detailBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input
                        readOnly
                        value={product.Stock === 0 ? "0" : quantity}
                        type="number"
                      />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      disabled={
                        product.price === 0 || product.Stock < 1 ? true : false
                      }
                      onClick={addToCartHandler}
                    >
                      Thêm sản phẩm
                    </button>
                  </div>
                </div>
                <div className="detailsBlock-5">
                  <div className="benefit-item">
                    <img src="https://salt.tikicdn.com/ts/upload/2c/48/44/720434869e103b03aaaf1a104d91ad25.png" />
                    <span>
                      Hoàn Tiền
                      <br />
                      <b>111%</b>
                      <br />
                      Nếu hàng giả
                    </span>
                  </div>
                  <div className="benefit-item">
                    <img src="https://salt.tikicdn.com/ts/upload/4b/a1/23/1606089d5423e5cba05e3820ad39708e.png" />
                    <span>
                      Mở hộp
                      <br />
                      <b>kiểm tra</b>
                      <br />
                      nhận hàng
                    </span>
                  </div>
                  <div className="benefit-item">
                    <img src="https://salt.tikicdn.com/ts/upload/63/75/6a/144ada409519d72e2978ad2c61bc02a7.png" />
                    <span>
                      Đổi trả trong
                      <br />
                      <b>30 ngày</b>
                      <br />
                      Nếu sp lỗi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="detailsBlock-4">
              <h2>Mô tả sản phẩm</h2>
              <p>{ReactHtmlParser(product.description)}</p>
            </div>
            <h3 className="reviewsHeading">
              Đánh giá - Nhận Xét Từ Khách Hàng
            </h3>
            <button onClick={submitReviewToggle} className="submitReview">
              Gửi đánh giá
            </button>
            <Dialog aria-labelledby="simple-dialog-title" open={open}>
              <DialogTitle>Đánh giá</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={submitReviewToggle}>
                  Hủy
                </Button>
                <Button color="primary" onClick={reviewSubmitHandler}>
                  Gửi
                </Button>
              </DialogActions>
            </Dialog>
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">Chưa có đánh giá nào </p>
            )}
          </div>

          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
