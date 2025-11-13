import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-24 h-24 rounded-full border-4 border-t-transparent border-primary animate-spin blur-[1px]"></div>

        <div className="w-16 h-16 bg-gradient-to-tr from-primary to-pink-600 rounded-full animate-pulse shadow-lg shadow-primary/40"></div>
      </div>

      <motion.p
        className="mt-6 text-xl font-semibold tracking-wide text-primary"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Movie Master Pro
      </motion.p>

      <p className="text-sm text-gray-400 mt-2 animate-pulse">
        Loading cinematic experience...
      </p>
    </motion.div>
  );
};

export default LoadingSpinner;
