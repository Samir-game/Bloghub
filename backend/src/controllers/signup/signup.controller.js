const User= require("../../models/user.model.js")
const bcrypt= require("bcryptjs")

async function handleRegisterUser(req, res){
    const {userName, email, password}= req.body;

    if(!userName || !email || !password){
        return res.status(401).json({
            msg: "fill all credentials"
        })
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { userName }]
          });
          

        if(existingUser){
            return res.status(400).json({
                msg:"user already exist with this credentials"
            })
        }
        
        const saltRounds= 10;
        const hashpassword= await bcrypt.hash(password,saltRounds)

        const user= await User.create({
            userName,
            email,
            password: hashpassword,
        })

        
        return res.status(200).json({
            msg:"user created"
        })

    } catch (error) {
        return console.log("error creating the user",error)
    }
}

module.exports={
    handleRegisterUser,
}