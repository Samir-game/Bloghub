const jwt= require("jsonwebtoken")

async function generateAccessToken(user){
    return jwt.sign(
        {
            _id:user._id,
            name:user.userName,
            email:user.email
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY,
        }
    )
}


module.exports={
    generateAccessToken,
}




