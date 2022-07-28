const mongoose = require("mongoose");
const conectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    });
  // .catch((err) => {
  //   console.log(err);
  // });
};
module.exports = conectDatabase;
