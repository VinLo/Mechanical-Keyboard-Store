import React from "react";
// import ReactStars from 'react-rating-stars-component'
import { Rating } from "@material-ui/lab";
import profilePng from "../../images/User.png";
import "./ReviewCard.css";
const ReviewCard = ({ review }) => {
  const autoReviewTitle = (e) => {
    if (e === 5) {
      return "Cực kỳ hài lòng";
    } else if (e === 4) {
      return "Hài lòng";
    } else if (e === 3) {
      return "Bình thường";
    } else if (e === 2) {
      return "Không hài lòng";
    } else {
      return "Rất không hài lòng";
    }
    return;
  };
  const option = {
    // edit: false,
    // color: "rgba(20,20,20,0.2)",
    // activeColor:"tomato",
    // value:product.ratings,
    // size: window.innerWidth <600 ? 20:25,
    // isHalf: true
    // size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    // <div className="reviewCard">
    //   <img src={review.avatar.url} alt="User" />
    //   <p>{review.name}</p>
    //   <Rating {...option} />
    //   <span className="reviewCardComment">{review.comment}</span>
    // </div>
    <div className="reviewCard">
      <div className="review_comment_user">
        <div className="review_comment_user_inner">
          <img src={review.avatar.url} alt="User" />
          <div>
            <div className="review_comment_user-name">{review.name}</div>
            <div className="review_comment_user-datejoin">
              Tham gia vào {String(review.userJoin).substr(0, 10)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="review_comment_rating-title">
          <Rating {...option} />
          <div className="review_comment-title">
            {autoReviewTitle(review.rating)}
          </div>
        </div>
        <div className="review_comment_content">{review.comment}</div>
        <div className="review_comment_create-date">
          Đánh giá vào {String(review.reviewCreatedAt).substr(0, 10)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
