const User= require("../../models/user.model.js")

async function allBlogs(req,res){
    try {
        const user= await User.findById(req.user._id).select("-password -email -name -_id");
        if(!user){
            return res.status(401).json({
                msg:"unauthorized access"
            })
        }
        const allblogs=user.blogs;
        
        return res.status(200).send(
            allblogs
        )
    } catch (error) {
        console.log("error getting all blogs",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }

}

module.exports={
    allBlogs
}