const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [25, "Name should less than 25 character"],
    minLength: [4, "Name should more than 5 character"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "password should more than 8 character"],
    select: false,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const UserModel=mongoose.model("User",userSchema);

module.exports={
    UserModel
}