const User= require("../../models/user.model.js")


async function updateBlog(req,res){
    const {blogName,blogContent}=req.body
    if(!blogName|| !blogContent){
        return res.status(400).json({
            msg:"fill credentials"
        })
    }
    try {

        const id= req.params.id;
        const user=await User.findById(req.user._id);

        const blogIndex= user.blogs.findIndex((blog)=> blog._id.toString()===id)

        if (blogIndex === -1) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        user.blogs[blogIndex].blogName = blogName;
        user.blogs[blogIndex].blogContent = blogContent;
        await user.save()

        return res.status(200).json({
            msg:"blog updated"

        })

    } catch (error) {
       console.log("could not update blog")
       return res.status(500).json({
        msg:"internal server error"
       }) 
    }
}

module.exports={
    updateBlog
}