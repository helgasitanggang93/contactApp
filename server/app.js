if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
require("./helpers/cache");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT_PRODUCTION || process.env.PORT_DEVELOPMENT;
const contactRoutes = require("./routes");
const mongoose = require("mongoose");
const uri =
  process.env.MONGODB_URI_PRODUCTION ||
  process.env.MONGODB_URI_DEVELOPMENT + process.env.NODE_ENV;
const errHandler = require("./helpers/errhandler");
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(uri, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`${uri} successfully conected`);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", contactRoutes);
app.use((err, req, res, next) => {
  const errorDetail = errHandler(err);
  res.status(errorDetail.status).json(errorDetail.message);
});
app.listen(port, function() {
  console.log(`Listening to Port ${port}`);
});

module.exports = app;
