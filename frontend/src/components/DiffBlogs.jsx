import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const DiffBlogs = () => {
  const { userName } = useParams();
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchUser() {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/${userName}`);
        setAllBlogs(response?.data?.user?.blogs || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    searchUser();
  }, [userName]);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br  from-yellow-200 to-orange-300">  {/* Matching background gradient */}
      
      <motion.div 
        className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-4xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blogs by {userName}</h1>
      </motion.div>

      <motion.div 
        className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-4xl mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : allBlogs.length === 0 ? (
          <p className="text-gray-600 text-center">No blogs available.</p>
        ) : (
          <motion.div 
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {allBlogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="bg-gray-50 shadow-md rounded-3xl p-6 mb-6 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <img 
                  src={blog.blogImage} 
                  alt="Blog" 
                  className="w-full h-40 object-contain rounded-lg mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">{blog.blogName}</h2>
                <p className="text-gray-600 mt-3 text-lg break-words">{blog.blogContent}</p>
                <p className="text-sm text-gray-500 mt-3">
                  Created on: {new Date(blog.createdAt).toDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DiffBlogs;
