const Blog = require("../models/blogModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Blog -- Admin
exports.createBlog = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "blogs",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const blog = await Blog.create(req.body);

  res.status(201).json({
    success: true,
    blog,
  });
});

// Get All Blog
exports.getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 3;
  const blogsCount = await Blog.countDocuments();

  const apiFeature = new ApiFeatures(Blog.find(), req.query).search().filter();

  let blogs = await apiFeature.query;

  let filteredBLogsCount = blogs.length;

  apiFeature.pagination(resultPerPage);

  blogs = await apiFeature.query;

  res.status(200).json({
    success: true,
    blogs,
    blogsCount,
    resultPerPage,
    filteredBLogsCount,
  });
});

// Get All BLog (Admin)
exports.getAdminBlogs = catchAsyncErrors(async (req, res, next) => {
  const blogs = await Blog.find();

  res.status(200).json({
    success: true,
    blogs,
  });
});

// Get Blog Details
exports.getBlogDetails = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHander("Blog not found", 404));
  }

  res.status(200).json({
    success: true,
    blog,
  });
});

// Update BLog -- Admin

exports.updateBlog = catchAsyncErrors(async (req, res, next) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHander("Blog not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < blog.images.length; i++) {
      await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "blogs",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    blog,
  });
});

// Delete Blog

exports.deleteBlog = catchAsyncErrors(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return next(new ErrorHander("Blog not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < blog.images.length; i++) {
    await cloudinary.v2.uploader.destroy(blog.images[i].public_id);
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Blog Delete Successfully",
  });
});
