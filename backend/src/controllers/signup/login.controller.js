const User= require("../../models/user.model.js")
const bcrypt= require("bcryptjs")
const {generateAccessToken}= require("../../middlewares/generateJWT.js")


async function handleLoginUser(req,res){

    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({
            msg:"fill all the credentials"
        })
    }

    try {
        const user= await  User.findOne({email})
        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }

        const ispasswordValid= await bcrypt.compare(password,user.password)

        if(!ispasswordValid){
            return res.status(401).json({
                msg:"incorrect passowrd"
            })
        }

        const token= await generateAccessToken(user)
       

        return res.status(200).json({
            msg:"login successful",
            token:token,
            userName: user.userName,
            email: user.email,
        })

    } catch (error) {
        console.log("error login user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleLoginUser,
}