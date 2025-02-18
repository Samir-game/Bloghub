const express= require("express")
const app= express();
const cors= require("cors")

const userRouter= require("./routes/signup/user.route.js")
const blogRouter= require("./routes/blogs/blogs.route.js")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.use("/api/user",userRouter)
app.use("/api/blog",blogRouter)


module.exports=app