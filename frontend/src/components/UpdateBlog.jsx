import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBlog = () => {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Unauthorized! Please log in.");
    }
    try {
      
      const response = await axios.patch(
        `http://localhost:8000/api/blog/all-blogs/update/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      toast.success(response?.data?.msg || "Blog updated successfully!", { autoClose: 1200 });
      setTimeout(() => navigate("/all-blogs"), 1200);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error.response?.data?.msg || "Failed to update blog.");
    }
  }

  useEffect(() => {
    async function getBlog() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Unauthorized");
          return;
        }

        const response = await axios.get(`http://localhost:8000/api/blog/just-blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200 && response.data.blog) {
          const Blog = response.data.blog;
          setValue("blogName", Blog.blogName);
          setValue("blogContent", Blog.blogContent);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog details.");
      }
    }

    if (id) getBlog();
  }, [id, setValue]);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br from-yellow-200 to-orange-300">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Update Your Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div>
            <label className="block text-lg font-medium text-gray-700">Title</label>
            <input
              {...register("blogName", { required: true })}
              className="p-4 w-full border border-gray-300 rounded-md text-xl"
              placeholder="Blog Title"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              {...register("blogContent", { required: true })}
              className="p-4 w-full border border-gray-300 rounded-md h-60 text-xl"
              placeholder="Write your blog content here"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-md shadow hover:bg-indigo-700 transition-all text-xl"
          >
            Update Blog
          </button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default UpdateBlog;
