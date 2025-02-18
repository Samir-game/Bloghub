import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/user/${searchTerm}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("logout successfully!")
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-orange-300 to-yellow-200 px-4 md:px-8 py-10">
      
      
      <motion.header 
        className="w-full max-w-4xl bg-white shadow-lg rounded-b-2xl py-4 px-6 flex items-center justify-center fixed top-0 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center w-full justify-between">
        
          <NavLink to="/home" className="text-4xl font-extrabold text-gray-800 hover:text-gray-600 transition duration-300">
            BlogHub!
          </NavLink>

         
          <div className="flex gap-3 items-center">
            <form onSubmit={handleSearchSubmit} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="p-3 w-60 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform"
              >
                Search
              </button>
            </form>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-transform"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      {/* 🔹 HERO SECTION */}
      <motion.div 
        className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-3xl text-center mt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to BlogHub!
        </h2>

        <p className="text-gray-600 text-xl leading-relaxed mb-6">
          Share your ideas, connect with other writers, and be a part of an amazing blogging community.
        </p>

        {/* 🔹 BUTTON SECTION */}
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <NavLink to="/create-blog">
            <motion.button 
              className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Create a Blog
            </motion.button>
          </NavLink>

          <NavLink to="/all-blogs">
            <motion.button 
              className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-900 hover:scale-105 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              See All Blogs
            </motion.button>
          </NavLink>
        </div>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default Home;
