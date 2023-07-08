const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { sendError, sendResponseMsg, sendResponse } = require("../utils/responseHandle");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user)
      return sendError(res,401,"User Already exist")
    const hashedpwd = await bcrypt.hash(password, 6);

    user = await UserModel.create({ name, email, password: hashedpwd });
    sendResponseMsg(res,200,"Registration successful")
  } catch (error) {
    console.log(error);
    sendError(res,401,error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user)
      return sendError(res,401,"Invalid email and password");
    const isMAtched = await bcrypt.compare(password, user.password);

    if (!isMAtched)
      return sendError(res,401,"Invalid email and password");
    const token = jwt.sign({ id: user._id }, process.env.sec);
    console.log("token", token);

    res.status(200).send({
      success: true,
      msg: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    sendError(res,401,error)
  }
};

//user detail auth route
exports.getProfile = async (req, res) => {
    try {
      const user = await UserModel.findById(req.user);
      sendResponse(res,201,user)
    } catch (error) {
      sendError(res,401,error)
    }
  };