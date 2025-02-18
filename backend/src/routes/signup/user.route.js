const express= require("express")
const router= express.Router()

const {handleRegisterUser}= require("../../controllers/signup/signup.controller.js")
const {handleLoginUser}= require("../../controllers/signup/login.controller.js")




router
.route("/register")
.post(handleRegisterUser)

router
.route("/login")
.post(handleLoginUser)

module.exports=router