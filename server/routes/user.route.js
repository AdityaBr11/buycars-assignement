const express=require("express");
const { register, login, getProfile } = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");

const router=express.Router();

//register user
router.post("/new",register)

//login
router.post("/login",login);

//get detail
router.get("/me",isAuthenticated ,getProfile)



module.exports={
    router
}