const mongoose= require("mongoose")

const blogSchema= new mongoose.Schema({
    blogName:{
        type: String,
        required: true,
    },
    blogContent:{
        type: String,
        required: true,
    },

    blogImage:{
        type: String,
    },

    createdAt:{
        type: Date,
        default: Date.now()

    }
})

const userSchema= new mongoose.Schema({

    userName:{
        type: String,
        required: true,
        unique: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    blogs:{
        type: [blogSchema],
        default: []
    }
})

const User= mongoose.model("User",userSchema)

module.exports= User