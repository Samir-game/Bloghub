const User= require("../../models/user.model.js")


async function deleteBlog(req,res){
    
    try {
        const id=req.params.id;
        
        const user=await User.findById(req.user._id)

        if(!user){
            return res.status(401).json({
                msg:"unauthorized access"
            })
        }

        user.blogs=user.blogs.filter((blog)=>blog._id.toString() !== id)

        /*
            other method

            const blogIndex= user.blogs.findIndex((blog)=>blog._id.tostring()===id)

            if(blogIndex!==-1){
                user.blogs.splice(blogIndex,1) // Remove 1 blog at found index
                await user.save()
            }
        */

        await user.save();

        return res.status(200).json({
            msg:"deleted blog",
            
        })
        
        

    } catch (error) {
        console.log("could not delete the blog ")
        return res.status(500).json({
            msg:"interrnal server error"
        })
    }
}

module.exports={
    deleteBlog
}