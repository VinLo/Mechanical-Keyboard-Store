const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên sản phẩm"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Vui lòng nhập mô tả sản phẩm"],
  },
  price: {
    type: Number,
    required: [true, "Vui lòng nhập giá sản phẩm"],
    maxlength: [8, "Giá sản phẩm không vượt quá 8 số"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Vui lòng chọn danh mục"],
  },
  Stock: {
    type: Number,
    required: [true, "Vui lòng nhập số lượng"],
    maxLength: [4, "Số lượng sản phẩm không được quá 4"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      userJoin: { type: Date, require: true },
      reviewCreatedAt: { type: Date, default: Date.now },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Product", productSchema);
