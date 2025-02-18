const cloudinary= require("cloudinary").v2
const fs= require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

async function uploadToCloudinary(localFilePath){
    if(!localFilePath){
        return res.status(500).json({
            msg:"could not find file in local path"
        })
    }
    

    try {
        const result= await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        fs.unlinkSync(localFilePath)
        return result



    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log("file uploading on cloudinary operation failed") 
    }

    
}

module.exports={
    uploadToCloudinary
}