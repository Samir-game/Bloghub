import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const [blogName, setBlogName] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!blogName || !blogContent) {
      setError("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("blogName", blogName);
    formData.append("blogContent", blogContent);
    if (blogImage) {
      formData.append("blogImage", blogImage);
    }

    try {
      const token = localStorage.getItem("token");
      console.log("submitting to backend");
      await axios.post("http://localhost:8000/api/blog/create-blog", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Blog Created successfully!",{autoClose:1200})
      setTimeout(()=>navigate("/all-blogs"),1200)
    } catch (err) {
      setError("Error creating blog. Please try again.");
      console.error("Blog creation error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br from-yellow-200 to-orange-300">
      <motion.div 
        className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-4xl" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Create a Blog</h2> 
        {error && <p className="text-red-500 mb-4">{error}</p>} 
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <label className="block text-lg font-medium text-gray-700">Blog Title</label>
            <input 
              type="text"
              placeholder="Blog Title" 
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
              className="p-4 w-full border border-gray-300 rounded-md text-xl" 
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Blog Content</label>
            <textarea 
              placeholder="Write your blog content here"
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="p-4 w-full border border-gray-300 rounded-md h-60 text-xl" 
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Blog Image</label>
            <input 
              type="file"
              accept="image/*"
              onChange={(e) => setBlogImage(e.target.files[0])}
              className="w-full" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-md shadow hover:bg-indigo-700 transition-all text-xl" // Increased padding and font size
          >
            Create Blog
          </button>
        </form>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default CreateBlog;
