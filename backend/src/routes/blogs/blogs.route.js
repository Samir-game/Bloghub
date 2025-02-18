const express= require('express')
const router= express.Router()

const {createBlog}= require("../../controllers/blogs/create.controller.js")
const {allBlogs}= require("../../controllers/blogs/allBlogs.controller.js")
const {deleteBlog} = require('../../controllers/blogs/delete.controller.js')
const {updateBlog} = require('../../controllers/blogs/update.controller.js')

const upload= require("../../middlewares/multer.middleware.js")
const {verifyJWT}= require("../../middlewares/auth.middleware.js")
const { handleSearchedUser } = require('../../controllers/blogs/searchUser.controller.js')
const { justBlog } = require('../../controllers/blogs/justBlog.controller.js')

router
.route("/create-blog")
.post(verifyJWT,upload.single("blogImage"),createBlog)

router
.route("/all-blogs")
.get(verifyJWT,allBlogs)

router
.route("/all-blogs/delete/:id")
.delete(verifyJWT,deleteBlog)

router
.route("/all-blogs/update/:id")
.patch(verifyJWT,updateBlog)

router
.route("/:userName")
.get(handleSearchedUser)

router.route("/just-blog/:id")
.get(verifyJWT,justBlog)

module.exports=router