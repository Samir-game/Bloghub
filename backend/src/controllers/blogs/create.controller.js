const User = require("../../models/user.model.js");
const { uploadToCloudinary } = require("../../utils/cloudinary.js");

async function createBlog(req, res) {
  const { blogName, blogContent } = req.body;

  if (!blogName || !blogContent) {
    return res.status(400).json({
      msg: "fill all the credentials",
    });
  }

  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }

    let cloudinaryImageURL = null;
    if (req.file && req.file.path) {
      const result = await uploadToCloudinary(req.file.path);
      if(!result){
        console.log("not uploaded on cloudinary")
      }
      cloudinaryImageURL = result.url;
    }

    const newblog = {
      blogName,
      blogContent,
      blogImage:cloudinaryImageURL,
      createdAt: new Date(),
    };

    user.blogs.push(newblog);
    await user.save();

    return res.status(200).json({
      msg: "blog created",
      newblog,
    });

  } catch (error) {
    console.log("error creating blog",error);
    return res.status(500).json({
        msg:"internal server errorr"
    })
  }
}

module.exports = {
  createBlog,
};
