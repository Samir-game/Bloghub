const User= require("../../models/user.model.js")
async function handleSearchedUser(req,res){
    try {
        const userName= req.params.userName;
        const user= await User.findOne({userName:userName}).select("-password -email")
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }
        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log("error finding user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleSearchedUser,
}