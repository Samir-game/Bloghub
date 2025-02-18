import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FirstPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-300 px-6">
            <motion.h1
                className="text-5xl font-extrabold text-gray-900 drop-shadow-lg"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                ✍️ BlogHub!
            </motion.h1>

            <motion.div 
                className="mt-10 bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                    Join the Community
                </h2>
                <p className="text-gray-500 text-lg">
                    Share your stories, ideas, and experiences with the world.
                </p>

                <div className="mt-8 flex flex-col space-y-4">
                    <NavLink to="/login" className="py-3 px-6 rounded-full text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md">
                        Log In
                    </NavLink>
                    <NavLink to="/signup" className="py-3 px-6 rounded-full text-lg font-medium text-gray-800 bg-gray-200 hover:bg-gray-300 transition-all shadow-md">
                        Sign Up
                    </NavLink>
                </div>

                <p className="mt-6 text-sm text-gray-400 italic">
                    "Your thoughts matter. Start writing today!"
                </p>
            </motion.div>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
        </div>
    );
};

export default FirstPage;
