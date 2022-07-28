const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter blog name"],
    trim: true,
  },
  info: {
    type: String,
    required: [true, "Please enter blog info"],
  },
  description: {
    type: String,
    required: [true, "Please enter decription"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Blog", blogSchema);
