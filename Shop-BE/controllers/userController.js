const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const sendToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});
//Login a user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  //Check if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Vui lòng nhập email và mật khẩu", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Email hoặc mật khẩu không hợp lệ", 401));
  }

  const isPassWordMatched = await user.comparePassword(password);

  if (!isPassWordMatched) {
    return next(new ErrorHander("Email hoặc mật khẩu không hợp lệ", 401));
  }
  sendToken(user, 200, res);
  // const token = user.getJWTToken();
  // res.status(200).json({
  //   success: true,
  //   token,
  // });
});
//Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Đã đăng xuất",
  });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("Người dùng không tìm thấy", 404));
  }

  //Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Mã đặt lại mật khẩu của bạn là :- \n\n ${resetPasswordUrl} \n\nNếu bạn không yêu cầu email này, vui lòng bỏ qua nó`;
  try {
    await sendEmail({
      email: user.email,
      subject: `LocphamsociuShop lấy lại mật khẩu`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email đã gửi tới ${user.email} thành công`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Create Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHander("Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Một trong 2 mật khẩu không khớp", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  user.save();
  sendToken(user, 200, res);
});
// Get user detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPassWordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPassWordMatched) {
    return next(new ErrorHander("Mật khẩu cũ không đúng", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("Một trong 2 mật khẩu không khớp", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//Get single  (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`Người dùng không tồn tại với id này: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role (admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

// delete user -- (admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(
        `Người dùng không tồn tại với id này: ${req.params.id}`,
        400
      )
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Xóa người dùng thành công",
  });
});
