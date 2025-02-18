const User = require("../../models/user.model.js");

async function justBlog(req,res){
    try {
        const blogId= req.params.id;
        const user= await User.findById(req.user._id).select("-password -email")
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }

        const blogIndex= user.blogs.findIndex((blog)=>blog._id.toString()===blogId)
        if(blogIndex===-1){
            return res.status(404).json({
                msg:"blog not found"
            })
        }
        const blog= user.blogs[blogIndex]
        return res.status(200).json({
            blog
        })
    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports={
    justBlog,
}