const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const cloudinary=require("cloudinary")
const fileUpload=require("express-fileupload")
const bodyParser = require('body-parser')
const cookieParser=require("cookie-parser");
const { connection } = require("./config/db");
const { router } = require("./routes/user.route");
const { oemrouter } = require("./routes/oem.route");
const { marketrouter } = require("./routes/market.route");
const { isAuthenticated } = require("./middleware/auth");

env.config();
const app = express();
env.config()
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())

//cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.use("/reg", router);
app.use("/rootoem", oemrouter),
  app.use("/markets", isAuthenticated, marketrouter);

app.listen(process.env.port || 4500, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running at port ${process.env.port}`);
});
