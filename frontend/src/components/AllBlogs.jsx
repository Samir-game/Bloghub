import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function gettingBlogs() {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: Please log in first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/blog/all-blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllBlogs(response?.data || []);
        
      } catch (error) {
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    gettingBlogs();
  }, []);

  async function handleDelete(id) {
    const blogId = id;
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in first.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/blog/all-blogs/delete/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting blog.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-orange-300 flex flex-col items-center px-6 py-10">
    
      <motion.header
        className="w-full max-w-5xl flex justify-between items-center bg-white shadow-lg rounded-3xl p-6 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <NavLink to="/home" className="text-3xl font-extrabold text-gray-800 hover:text-gray-600 transition duration-300">
          BlogHub!
        </NavLink>

        <nav className="space-x-4">
          <NavLink 
            to="/create-blog" 
            className="text-lg text-indigo-600 font-semibold hover:text-indigo-800">
            Create Blog
          </NavLink>
          <NavLink 
            to="/all-blogs" 
            className="text-lg text-indigo-600 font-semibold hover:text-indigo-800">
            See All Blogs
          </NavLink>
        </nav>

      </motion.header>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">All Blogs</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : allBlogs.length === 0 ? (
        <p className="text-gray-600">No blogs available.</p>
      ) : (
        <motion.div
          className="flex flex-col items-center w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {allBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-white shadow-lg rounded-3xl p-5 mb-6 w-full"
              style={{ minHeight: `${Math.min(200 + blog.blogContent.length * 0.1, 600)}px` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <img src={blog.blogImage} alt="Blog" className="w-full h-40 object-contain rounded-t-lg"/>
              <h2 className="text-2xl font-bold mt-3">{blog.blogName}</h2>
              <p className="text-gray-600 mt-3 text-lg break-words">{blog.blogContent}</p>
              <p className="text-sm text-gray-500 mt-3">
                Created on: {new Date(blog.createdAt).toDateString()}
              </p>

              {/* Update and Delete Buttons */}
              <div className="mt-3 flex justify-start space-x-4">
                <motion.p 
                  onClick={() => navigate(`/update/${blog._id}`)} 
                  className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-700 transition-all">
                  Update
                </motion.p>

                <motion.p 
                  onClick={() => handleDelete(blog._id)} 
                  className="text-sm text-white bg-red-600 px-4 py-2 rounded-md cursor-pointer hover:bg-red-700 transition-all">
                  Delete
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllBlogs;
