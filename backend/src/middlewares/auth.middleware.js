const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

async function verifyJWT(req, res, next) {
    try {
       
        const token = req.headers.authorization.split(" ")[1]
       
        
        if (!token) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return res.status(401).json({ msg: "Invalid access token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ msg: "Invalid access token" });
    }
}

module.exports = { verifyJWT };
