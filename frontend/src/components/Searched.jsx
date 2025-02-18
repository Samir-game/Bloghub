import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Searched = () => {
  const { userName } = useParams();
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function searchUser() {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:8000/api/blog/${userName}`);

        const fetchedName = response?.data?.user?.userName;

        if (fetchedName) {
          setName(fetchedName);
        } else {
          throw new Error("User data missing!");
        }
      } catch (err) {
        setError("Failed to load user data. Please try again.");
        toast.error("Failed to load user data.");
        setName(null);
      } finally {
        setLoading(false);
      }
    }

    if (userName) searchUser();
  }, [userName]);

  function handleOnClick() {
    navigate(`/user/${userName}/blogs`);
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br from-yellow-200 to-orange-300">
      <ToastContainer />

      <motion.header
        className="w-full max-w-5xl flex justify-between items-center bg-white shadow-lg rounded-3xl p-8 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <NavLink
          to="/home"
          className="text-4xl font-extrabold text-gray-800 hover:text-gray-600 transition duration-300"
        >
          BlogHub!
        </NavLink>
      </motion.header>

      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-5xl text-center" // Increased padding and width for extra big card
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {loading ? (
          <p className="text-gray-600 text-xl">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-xl font-semibold">{error}</p>
        ) : (
          <div>
            <p className="text-gray-600 text-xl">
              Found user:{" "}
              <span
                className="font-semibold text-indigo-600  hover:underline"
              >
                {name}
              </span>
            </p>
            <button
              onClick={handleOnClick}
              className="mt-6 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all text-xl"
            >
              View Blogs
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Searched;
